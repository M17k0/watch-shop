package routes

import (
	"watch-shop-server/internal/controllers"

	"github.com/gin-gonic/gin"
)

func RegisterCategoryRoutes(router *gin.Engine, categoryController *controllers.CategoryController) {
	categoryGroup := router.Group("/categories")
	{
		categoryGroup.POST("", categoryController.CreateCategory)
		categoryGroup.GET("", categoryController.GetAllCategories)
		categoryGroup.GET("/:id", categoryController.GetCategoryByID)
		categoryGroup.GET("/:id/tags", categoryController.GetTagsForCategory)
		categoryGroup.POST("/:id/tags", categoryController.AddTagToCategory)
		categoryGroup.DELETE("/:id/tags/:tagID", categoryController.RemoveTagFromCategory)
		categoryGroup.GET("/name/:name", categoryController.GetCategoryByName)
	}
}
