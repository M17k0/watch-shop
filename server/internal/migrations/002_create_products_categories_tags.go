package migrations

import (
	"watch-shop-server/internal/models"

	"gorm.io/gorm"
)

func Migrate_002(tx *gorm.DB) error {
	tx.AutoMigrate(&models.Product{})
	tx.AutoMigrate(&models.Category{})
	tx.AutoMigrate(&models.Tag{})
	return tx.AutoMigrate(&models.ProductTag{})
}

func Rollback_002(tx *gorm.DB) error {
	tx.Migrator().DropTable(&models.ProductTag{})
	tx.Migrator().DropTable(&models.Tag{})
	tx.Migrator().DropTable(&models.Category{})
	return tx.Migrator().DropTable(&models.Product{})
}
