package services

import (
	"watch-shop-server/internal/models"

	"gorm.io/gorm"
)

type TagService struct {
	db *gorm.DB
}

func NewTagService(db *gorm.DB) *TagService {
	return &TagService{db: db}
}

func (s *TagService) GetTagByID(id uint) (*models.Tag, error) {
	tag := &models.Tag{}
	if err := s.db.First(tag, id).Error; err != nil {
		return nil, err
	}
	return tag, nil
}

func (s *TagService) GetAllTagsForCategory(categoryId int) ([]models.Tag, error) {
	var tags []models.Tag
	if err := s.db.Preload("Category").Where("category_id = ?", categoryId).Find(&tags).Error; err != nil {
		return nil, err
	}
	return tags, nil
}

func (s *TagService) CreateTagForCategory(name string, categoryID uint) (*models.Tag, error) {
	newTag := &models.Tag{
		Name:       name,
		CategoryID: categoryID,
	}

	if err := s.db.Create(newTag).Error; err != nil {
		return nil, err
	}

	return newTag, nil
}
