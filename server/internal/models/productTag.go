package models

// Associates a tag with a category
// e.g. color - red, size - small, mechanism - quartz
type ProductTag struct {
	BaseModel
	ProductID uint `gorm:"not null"`
	Product   Product
	TagID     uint `gorm:"not null"`
	Tag       Tag
}
