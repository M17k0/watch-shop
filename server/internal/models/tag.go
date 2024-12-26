package models

// red, small, quartz...
type Tag struct {
	BaseModel
	Name        string `gorm:"not null"`
	CategoryID  uint   `gorm:"not null"`
	Category    Category
	ProductTags []*ProductTag
}
