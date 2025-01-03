package mappers

import "watch-shop-server/internal/models"

type ProductDTO struct {
	ID          uint            `json:"id"`
	ImageUrl    *string         `json:"imageUrl"`
	Name        string          `json:"name"`
	Description string          `json:"description"`
	Price       float64         `json:"price"`
	Stock       int             `json:"stock"`
	Type        string          `json:"type"`
	ProductTags []ProductTagDTO `json:"productTags"`
}

type ProductTagDTO struct {
	ID           uint   `json:"id"`
	ProductID    uint   `json:"productId"`
	TagID        uint   `json:"tagId"`
	TagName      string `json:"tagName"`
	CategoryID   uint   `json:"categoryId"`
	CategoryName string `json:"categoryName"`
}

type TagDTO struct {
	ID           uint   `json:"id"`
	Name         string `json:"name"`
	CategoryID   uint   `json:"categoryId"`
	CategoryName string `json:"categoryName"`
}

type CategoryDTO struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
}

type OrderDto struct {
	OrderNumber string `json:"orderNumber"`
	TotalPrice  int    `json:"totalPrice"`
	UserEmail   string `json:"userEmail"`
	UserAddress string `json:"userAddress"`
	UserPhone   string `json:"userPhone"`
}

func MapToProductDTO(product models.Product) ProductDTO {
	var productTags []ProductTagDTO
	for _, pt := range product.ProductTags {
		if pt.Tag.Category.ID > 0 {
			productTags = append(productTags, ProductTagDTO{
				ID:           pt.ID,
				ProductID:    pt.ProductID,
				TagID:        pt.TagID,
				TagName:      pt.Tag.Name,
				CategoryID:   pt.Tag.Category.ID,
				CategoryName: pt.Tag.Category.Name,
			})
		}
	}

	return ProductDTO{
		ID:          product.ID,
		ImageUrl:    product.ImageUrl,
		Name:        product.Name,
		Description: product.Description,
		Price:       product.Price,
		Stock:       product.Stock,
		Type:        product.Type,
		ProductTags: productTags,
	}
}

func MapToTagDTO(tag models.Tag) TagDTO {
	return TagDTO{
		ID:           tag.ID,
		Name:         tag.Name,
		CategoryID:   tag.Category.ID,
		CategoryName: tag.Category.Name,
	}
}

func MapToCategoryDTO(category models.Category) CategoryDTO {
	return CategoryDTO{
		ID:   category.ID,
		Name: category.Name,
	}
}

func MapToOrderDTO(order models.Order) OrderDto {
	return OrderDto{
		OrderNumber: order.OrderNumber,
		TotalPrice:  order.TotalPrice,
		UserEmail:   order.UserEmail,
		UserAddress: order.UserAddress,
		UserPhone:   order.UserPhone,
	}
}
