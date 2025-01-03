package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/stripe/stripe-go/v81"
	"github.com/stripe/stripe-go/v81/paymentintent"
)

type StripeController struct {
	secretKey string
}

func NewStripeController(secretKey string) *StripeController {
	stripe.Key = secretKey
	return &StripeController{secretKey}
}

func (sc *StripeController) CreatePaymentIntent(c *gin.Context) {
	amount := 5000

	params := &stripe.PaymentIntentParams{
		Amount:   stripe.Int64(int64(amount)),
		Currency: stripe.String(string(stripe.CurrencyUSD)),
	}

	intent, err := paymentintent.New(params)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"clientSecret": intent.ClientSecret})
}
