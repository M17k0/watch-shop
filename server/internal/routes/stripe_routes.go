package routes

import (
	"watch-shop-server/internal/controllers"

	"github.com/gin-gonic/gin"
)

func RegisterStripeRouter(router *gin.Engine, stripeController *controllers.StripeController) {
	stripeGroup := router.Group("/create-payment-intent")
	{
		stripeGroup.POST("", stripeController.CreatePaymentIntent)
	}
}
