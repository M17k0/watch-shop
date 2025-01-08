package controllers

import (
	"net/http"
	"strconv"
	"strings"
	"watch-shop-server/internal/mappers"
	"watch-shop-server/internal/services"
	"watch-shop-server/internal/types"

	"github.com/gin-gonic/gin"
)

type ProductController struct {
	ProductService *services.ProductService
}

func NewProductController(productService *services.ProductService) *ProductController {
	return &ProductController{ProductService: productService}
}

func (pc *ProductController) CreateProduct(ctx *gin.Context) {
	var input types.CreateProductInput
	if err := ctx.ShouldBindJSON(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	product, err := pc.ProductService.AddProduct(input)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create product"})
		return
	}

	ctx.JSON(http.StatusCreated, mappers.MapToProductDTO(*product))
}

func (pc *ProductController) GetAllProducts(ctx *gin.Context) {
	page, err := strconv.Atoi(ctx.DefaultQuery("page", "1"))
	if err != nil || page < 1 {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid page number"})
		return
	}

	pageSize, err := strconv.Atoi(ctx.DefaultQuery("pageSize", "10"))
	if err != nil || pageSize < 1 {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid page size"})
		return
	}

	searchQuery := ctx.Query("query")

	tagsParam := ctx.Query("tags")
	var tags []int
	if tagsParam != "" {
		tagsStrings := strings.Split(tagsParam, "-")
		for _, tagString := range tagsStrings {
			tagID, err := strconv.Atoi(tagString)
			if err == nil {
				tags = append(tags, tagID)
			}
		}
	}

	orderBy := ctx.DefaultQuery("orderBy", "name")
	order := ctx.DefaultQuery("order", "asc")

	products, totalCount, err := pc.ProductService.GetAllProductsPaginated(page, pageSize, searchQuery, tags, orderBy, order)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve products"})
		return
	}

	var productDTOs []mappers.ProductDTO
	for _, product := range products {
		productDTOs = append(productDTOs, mappers.MapToProductDTO(product))
	}

	ctx.JSON(http.StatusOK, gin.H{
		"watches": productDTOs,
		"total":   totalCount,
	})
}

func (pc *ProductController) GetProductByID(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid product ID"})
		return
	}

	product, err := pc.ProductService.GetProductByID(uint(id))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve product"})
		return
	}

	ctx.JSON(http.StatusOK, mappers.MapToProductDTO(*product))
}

func (pc *ProductController) UpdateProduct(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid product ID"})
		return
	}

	var input types.UpdateProductInput
	if err := ctx.ShouldBindJSON(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	product, err := pc.ProductService.UpdateProduct(id, &input)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update product"})
		return
	}

	ctx.JSON(http.StatusOK, mappers.MapToProductDTO(*product))
}

func (pc *ProductController) DeleteProduct(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid product ID"})
		return
	}

	if err := pc.ProductService.DeleteProduct(id); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete product"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Product deleted successfully"})
}

func (pc *ProductController) GetProductCategories(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid product ID"})
		return
	}

	categories, err := pc.ProductService.GetAllCategoriesForProduct(uint(id))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve product categories"})
		return
	}

	ctx.JSON(http.StatusOK, categories)
}

func (pc *ProductController) AddTagToProduct(ctx *gin.Context) {
	tagId, err := strconv.Atoi(ctx.Param("tagId"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid tag ID"})
		return
	}

	productId, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid product ID"})
		return
	}

	if err := pc.ProductService.AddTagToProduct(tagId, productId); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add tag to product"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Tag added to product successfully"})
}
