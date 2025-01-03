package controllers

import (
	"strconv"
	"watch-shop-server/internal/models"
	"watch-shop-server/internal/services"

	"github.com/gin-gonic/gin"
)

type OrderController struct {
	OrderService *services.OrderService
}

func NewOrderController(orderService *services.OrderService) *OrderController {
	return &OrderController{orderService}
}

func (oc *OrderController) CreateOrder(ctx *gin.Context) {
	var req struct {
		UserID      *int   `json:"userId"`
		UserEmail   string `json:"userEmail"`
		UserAddress string `json:"userAddress"`
		UserPhone   string `json:"userPhone"`
		Items       []struct {
			ID       int `json:"id"`
			Quantity int `json:"quantity"`
		} `json:"items"`
	}

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(400, gin.H{"error": "Invalid request body"})
		return
	}

	if len(req.Items) == 0 {
		ctx.JSON(400, gin.H{"error": "Order must contain at least one item"})
		return
	}

	order := &models.Order{
		UserId:      0,
		UserEmail:   req.UserEmail,
		UserAddress: req.UserAddress,
		UserPhone:   req.UserPhone,
		TotalPrice:  0,
	}

	if req.UserID != nil {
		order.UserId = *req.UserID
	}

	var orderItems []models.OrderItem
	for _, item := range req.Items {
		orderItems = append(orderItems, models.OrderItem{
			ProductID: item.ID,
			Quantity:  item.Quantity,
		})
		price, err := oc.OrderService.GetProductPrice(item.ID)
		if err != nil {
			ctx.JSON(500, gin.H{"error": "Failed to fetch product price"})
			return
		}
		order.TotalPrice += int(price) * item.Quantity
	}

	createdOrder, err := oc.OrderService.CreateOrder(order, orderItems)
	if err != nil {
		ctx.JSON(500, gin.H{"error": "Failed to create order", "details": err.Error()})
		return
	}

	ctx.JSON(201, createdOrder)
}

func (oc *OrderController) GetOrdersByUser(ctx *gin.Context) {
	userID := ctx.Param("userID")
	userIdNum, err := strconv.Atoi(userID)
	if err != nil {
		ctx.JSON(400, gin.H{"error": "Invalid user ID"})
		return
	}

	orders, err := oc.OrderService.GetOrdersByUserId(userIdNum)
	if err != nil {
		ctx.JSON(500, gin.H{"error": "Failed to fetch orders", "details": err.Error()})
		return
	}

	ctx.JSON(200, orders)
}
