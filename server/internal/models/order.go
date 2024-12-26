package models

type Order struct {
	BaseModel
	OrderNumber string `gorm:"not null"`
	TotalPrice  int    `gorm:"not null"`
	UserId      int
	UserEmail   string `gorm:"not null"`
	UserAddress string `gorm:"not null"`
	UserPhone   string `gorm:"not null"`
}
