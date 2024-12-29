package services

import (
	"watch-shop-server/internal/models"

	"gorm.io/gorm"
)

type CategoryService struct {
	db *gorm.DB
}

func NewCategoryService(db *gorm.DB) *CategoryService {
	return &CategoryService{db: db}
}

func (s *CategoryService) GetAllCategories() ([]models.Category, error) {
	var categories []models.Category
	if err := s.db.Find(&categories).Error; err != nil {
		return nil, err
	}
	return categories, nil
}

func (s *CategoryService) GetCategoryByID(id uint) (*models.Category, error) {
	category := &models.Category{}
	if err := s.db.First(category, id).Error; err != nil {
		return nil, err
	}
	return category, nil
}

func (s *CategoryService) GetCategoryByName(name string) (*models.Category, error) {
	category := &models.Category{}
	if err := s.db.Where("name = ?", name).First(category).Error; err != nil {
		return nil, err
	}
	return category, nil
}

func (s *CategoryService) AddCategory(name string, orderIndex int) (*models.Category, error) {
	newCategory := &models.Category{
		Name:       name,
		OrderIndex: orderIndex,
	}

	if err := s.db.Create(newCategory).Error; err != nil {
		return nil, err
	}

	return newCategory, nil
}

func (s *CategoryService) GetAllTagsForCategory(categoryId uint) ([]models.Tag, error) {
	var tags []models.Tag
	if err := s.db.Preload("Category").Where("category_id = ?", categoryId).Find(&tags).Error; err != nil {
		return nil, err
	}
	return tags, nil
}

func (s *CategoryService) CreateTagForCategory(name string, categoryID uint) (*models.Tag, error) {
	newTag := &models.Tag{
		Name:       name,
		CategoryID: categoryID,
	}

	if err := s.db.Create(newTag).Error; err != nil {
		return nil, err
	}

	return newTag, nil
}

func (s *CategoryService) RemoveTagFromCategory(tagID uint) error {
	tag := &models.Tag{}
	if err := s.db.First(tag, tagID).Error; err != nil {
		return err
	}

	if err := s.db.Delete(tag).Error; err != nil {
		return err
	}

	return nil
}
