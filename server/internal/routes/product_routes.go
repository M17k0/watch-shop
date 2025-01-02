package routes

import (
	"watch-shop-server/internal/controllers"

	"github.com/gin-gonic/gin"
)

func RegisterProductRoutes(router *gin.Engine, productController *controllers.ProductController) {
	productGroup := router.Group("/products")
	{
		productGroup.POST("", productController.CreateProduct)
		productGroup.GET("", productController.GetAllProducts)
		productGroup.GET("/:id", productController.GetProductByID)
		productGroup.GET("/:id/categories", productController.GetProductCategories)
		productGroup.PATCH("/:id", productController.UpdateProduct)
		productGroup.DELETE("/:id", productController.DeleteProduct)
		productGroup.POST("/:id/tags/:tagId", productController.AddTagToProduct)
	}
}
