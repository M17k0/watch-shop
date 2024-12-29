package types

type CreateProductInput struct {
	Name        string  `json:"name" binding:"required"`
	Description string  `json:"description" binding:"required"`
	Type        string  `json:"type" binding:"required"`
	Price       float64 `json:"price" binding:"required"`
	Stock       int     `json:"stock" binding:"required"`
	ImageUrl    *string `json:"imageUrl,omitempty"`
}
