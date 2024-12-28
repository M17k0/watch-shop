package services

import (
	"watch-shop-server/internal/models"
	"watch-shop-server/internal/types"

	"gorm.io/gorm"
)

type ProductService struct {
	db *gorm.DB
}

func NewProductService(db *gorm.DB) *ProductService {
	return &ProductService{db: db}
}

func (s *ProductService) GetProductByID(id uint) (*models.Product, error) {
	product := &models.Product{}
	if err := s.db.Preload("ProductTags.Tag.Category").First(product, id).Error; err != nil {
		return nil, err
	}
	return product, nil
}

func (s *ProductService) GetAllProducts() ([]models.Product, error) {
	var products []models.Product
	if err := s.db.Preload("ProductTags.Tag.Category").Find(&products).Error; err != nil {
		return nil, err
	}
	return products, nil
}

func (s *ProductService) AddProduct(input types.CreateProductInput) (*models.Product, error) {
	newProduct := &models.Product{
		Name:        input.Name,
		Description: input.Description,
		Type:        input.Type,
		Price:       input.Price,
		Stock:       input.Stock,
	}
	if input.ImageUrl != nil {
		newProduct.ImageUrl = input.ImageUrl
	} else {
		newProduct.ImageUrl = nil
	}

	if err := s.db.Create(newProduct).Error; err != nil {
		return nil, err
	}

	return newProduct, nil
}

func (s *ProductService) UpdateProduct(productId int, updatedFields *types.UpdateProductInput) (*models.Product, error) {
	var product models.Product
	if err := s.db.First(&product, productId).Error; err != nil {
		return nil, err
	}

	if updatedFields.Name != nil {
		product.Name = *updatedFields.Name
	}
	if updatedFields.Description != nil {
		product.Description = *updatedFields.Description
	}
	if updatedFields.Type != nil {
		product.Type = *updatedFields.Type
	}
	if updatedFields.Price != nil {
		product.Price = *updatedFields.Price
	}
	if updatedFields.Stock != nil {
		product.Stock = *updatedFields.Stock
	}
	if updatedFields.ImageUrl != nil {
		product.ImageUrl = updatedFields.ImageUrl
	}

	if err := s.db.Save(&product).Error; err != nil {
		return nil, err
	}

	return &product, nil
}

func (s *ProductService) DeleteProduct(productId int) error {
	if err := s.db.Delete(&models.Product{}, productId).Error; err != nil {
		return err
	}
	return nil
}

func (s *ProductService) AddTagToProduct(tagId, productId int) error {
	productTag := &models.ProductTag{
		ProductID: uint(productId),
		TagID:     uint(tagId),
	}

	if err := s.db.Create(productTag).Error; err != nil {
		return err
	}

	return nil
}
