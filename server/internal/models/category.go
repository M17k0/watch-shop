package models

// color, size, mechanism, material...
type Category struct {
	BaseModel
	Name       string `gorm:"not null;unique" json:"name" binding:"required"`
	OrderIndex int    `gorm:"not null" json:"orderIndex" binding:"required"`
	Tags       []*Tag
}
