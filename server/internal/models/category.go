package models

// color, size, mechanism, material...
type Category struct {
	BaseModel
	Name       string `gorm:"not null;unique"`
	OrderIndex int    `gorm:"not null"`
	Tags       []*Tag
}
