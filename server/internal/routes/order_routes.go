package routes

import (
	"watch-shop-server/internal/controllers"

	"github.com/gin-gonic/gin"
)

func RegisterOrderRoutes(router *gin.Engine, orderController *controllers.OrderController) {
	orderGroup := router.Group("/orders")
	{
		orderGroup.POST("", orderController.CreateOrder)
		orderGroup.GET("/:userId", orderController.GetOrdersByUser)
	}
}
