package services

import (
	"fmt"
	"strconv"
	"watch-shop-server/internal/models"

	"gorm.io/gorm"
)

type OrderService struct {
	db *gorm.DB
}

func NewOrderService(db *gorm.DB) *OrderService {
	return &OrderService{db: db}
}

func (s *OrderService) GetAllOrders() ([]models.Order, error) {
	var orders []models.Order
	if err := s.db.Find(&orders).Error; err != nil {
		return nil, err
	}
	return orders, nil
}

func (s *OrderService) CreateOrder(order *models.Order, orderItems []models.OrderItem) (*models.Order, error) {
	tx := s.db.Begin()

	if err := tx.Create(order).Error; err != nil {
		tx.Rollback()
		return nil, fmt.Errorf("failed to create order: %w", err)
	}

	order.OrderNumber = "ORN" + strconv.FormatUint(uint64(order.ID), 10)
	if err := tx.Save(&order).Error; err != nil {
		tx.Rollback()
		return nil, fmt.Errorf("failed to create order: %w", err)
	}

	for i := range orderItems {
		orderItems[i].OrderID = int(order.ID)

		var product models.Product
		if err := tx.First(&product, orderItems[i].ProductID).Error; err != nil {
			tx.Rollback()
			return nil, fmt.Errorf("failed to find product for ID %d: %w", orderItems[i].ProductID, err)
		}

		if product.Stock < orderItems[i].Quantity {
			tx.Rollback()
			return nil, fmt.Errorf("not enough stock for product %s", product.Name)
		}

		product.Stock -= orderItems[i].Quantity
		if err := tx.Save(&product).Error; err != nil {
			tx.Rollback()
			return nil, fmt.Errorf("failed to update product stock for %s: %w", product.Name, err)
		}
	}

	if err := tx.Create(&orderItems).Error; err != nil {
		tx.Rollback()
		return nil, fmt.Errorf("failed to create order items: %w", err)
	}

	if err := tx.Commit().Error; err != nil {
		return nil, fmt.Errorf("failed to commit transaction: %w", err)
	}

	return order, nil
}

func (s *OrderService) GetProductPrice(productID int) (float64, error) {
	var product models.Product
	if err := s.db.First(&product, productID).Error; err != nil {
		return 0, fmt.Errorf("failed to fetch product: %w", err)
	}

	return product.Price, nil
}
