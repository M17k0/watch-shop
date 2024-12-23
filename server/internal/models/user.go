package models

import (
	"time"
)

type UserRole string

const (
	superAdmin UserRole = "superadmin"
	admin      UserRole = "admin"
	user       UserRole = "user"
)

type User struct {
	ID        uint
	CreatedAt time.Time
	UpdatedAt time.Time
	FirstName string   `gorm:"not null"`
	LastName  string   `gorm:"not null"`
	Email     string   `gorm:"unique;not null"`
	Password  string   `gorm:"not null"`
	Role      UserRole `gorm:"type:varchar(20);default:'user';check:role IN ('superadmin', 'admin', 'user')"`
}
