package migrations

import (
	"watch-shop-server/internal/models"

	"gorm.io/gorm"
)

func Migrate_003(tx *gorm.DB) error {
	tx.AutoMigrate(&models.Order{})
	return tx.AutoMigrate(&models.OrderItem{})
}

func Rollback_003(tx *gorm.DB) error {
	tx.Migrator().DropTable(&models.OrderItem{})
	return tx.Migrator().DropTable(&models.Order{})
}
