package models

type UserRole string

const (
	RoleSuperAdmin UserRole = "superadmin"
	RoleAdmin      UserRole = "admin"
	RoleUser       UserRole = "user"
)

type User struct {
	BaseModel
	FirstName   string   `json:"firstName" binding:"required" gorm:"not null"`
	LastName    string   `json:"lastName" binding:"required" gorm:"not null"`
	Email       string   `json:"email" binding:"required,email" gorm:"unique;not null"`
	Password    string   `json:"password" binding:"required" gorm:"not null"`
	PhoneNumber string   `json:"phoneNumber" binding:"required" gorm:"not null"`
	Role        UserRole `json:"role" gorm:"type:varchar(20);default:'user';check:role IN ('superadmin', 'admin', 'user')"`
}
