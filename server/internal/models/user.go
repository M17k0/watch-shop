package models

type UserRole string

const (
	RoleSuperAdmin UserRole = "superadmin"
	RoleAdmin      UserRole = "admin"
	RoleUser       UserRole = "user"
)

type User struct {
	BaseModel
	FirstName   string   `gorm:"not null"`
	LastName    string   `gorm:"not null"`
	Email       string   `gorm:"unique;not null"`
	Password    string   `gorm:"not null"`
	PhoneNumber string   `gorm:"not null"`
	Role        UserRole `gorm:"type:varchar(20);default:'user';check:role IN ('superadmin', 'admin', 'user')"`
}
