package routes

import (
	"watch-shop-server/internal/controllers"

	"github.com/gin-gonic/gin"
)

func RegisterTagRoutes(router *gin.Engine, tagController *controllers.TagController) {
	tagGroup := router.Group("/tags")
	{
		tagGroup.GET("/:id", tagController.GetTagByID)
	}
}
