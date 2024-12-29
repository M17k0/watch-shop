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
