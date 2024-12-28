package models

type Product struct {
	BaseModel
	ImageUrl    *string
	Name        string  `gorm:"not null"`
	Description string  `gorm:"not null"`
	Price       float64 `gorm:"not null"`
	Stock       int     `gorm:"not null"`
	Type        string  `gorm:"not null"` // watch, bracelet, necklace
	ProductTags []*ProductTag
}
