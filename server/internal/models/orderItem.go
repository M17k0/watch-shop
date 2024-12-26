package models

type OrderItem struct {
	BaseModel
	OrderID   int `gorm:"not null"`
	Order     Order
	ProductID int `gorm:"not null"`
	Product   Product
	Quantity  int `gorm:"not null"`
}
