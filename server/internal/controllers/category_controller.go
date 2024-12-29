package controllers

import (
	"net/http"
	"watch-shop-server/internal/models"
	"watch-shop-server/internal/services"

	"github.com/gin-gonic/gin"
)

type CategoryController struct {
	CategoryService *services.CategoryService
}

func NewCategoryController(categoryService *services.CategoryService) *CategoryController {
	return &CategoryController{categoryService}
}

func (cc *CategoryController) CreateCategory(ctx *gin.Context) {
	var input models.Category
	if err := ctx.ShouldBindJSON(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	category, err := cc.CategoryService.AddCategory(input.Name, input.OrderIndex)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create category"})
		return
	}

	ctx.JSON(http.StatusCreated, category)
}

func (cc *CategoryController) GetAllCategories(ctx *gin.Context) {
	categories, err := cc.CategoryService.GetAllCategories()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch categories"})
		return
	}

	ctx.JSON(http.StatusOK, categories)
}

func (cc *CategoryController) GetCategoryByID(ctx *gin.Context) {
	var input struct {
		ID uint `uri:"id" binding:"required"`
	}
	if err := ctx.ShouldBindUri(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	category, err := cc.CategoryService.GetCategoryByID(input.ID)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
		return
	}

	ctx.JSON(http.StatusOK, category)
}

func (cc *CategoryController) GetCategoryByName(ctx *gin.Context) {
	var input struct {
		Name string `uri:"name" binding:"required"`
	}
	if err := ctx.ShouldBindUri(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	category, err := cc.CategoryService.GetCategoryByName(input.Name)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Category not found"})
		return
	}

	ctx.JSON(http.StatusOK, category)
}

func (cc *CategoryController) AddTagToCategory(ctx *gin.Context) {
	var uriInput struct {
		CategoryID uint `uri:"id" binding:"required"`
	}
	if err := ctx.ShouldBindUri(&uriInput); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var bodyInput struct {
		Name string `json:"name" binding:"required"`
	}
	if err := ctx.ShouldBindJSON(&bodyInput); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	tag, err := cc.CategoryService.CreateTagForCategory(bodyInput.Name, uriInput.CategoryID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create tag"})
		return
	}

	ctx.JSON(http.StatusCreated, tag)
}

func (cc *CategoryController) RemoveTagFromCategory(ctx *gin.Context) {
	var input struct {
		CategoryID uint `uri:"id" binding:"required"`
		TagID      uint `uri:"tagID" binding:"required"`
	}
	if err := ctx.ShouldBindUri(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := cc.CategoryService.RemoveTagFromCategory(input.TagID); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to remove tag from category"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Tag removed from category"})
}

func (cc *CategoryController) GetTagsForCategory(ctx *gin.Context) {
	var input struct {
		ID uint `uri:"id" binding:"required"`
	}
	if err := ctx.ShouldBindUri(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	tags, err := cc.CategoryService.GetAllTagsForCategory(input.ID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch tags for category"})
		return
	}

	ctx.JSON(http.StatusOK, tags)
}
