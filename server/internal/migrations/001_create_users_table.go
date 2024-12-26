package migrations

import (
	"watch-shop-server/internal/models"

	"gorm.io/gorm"
)

func Migrate_001(tx *gorm.DB) error {
	return tx.AutoMigrate(&models.User{})
}

func Rollback_001(tx *gorm.DB) error {
	return tx.Migrator().DropTable(&models.User{})
}
