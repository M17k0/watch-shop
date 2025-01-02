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
