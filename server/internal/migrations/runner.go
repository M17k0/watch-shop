package migrations

import "gorm.io/gorm"

var Migrations = []struct {
	Migrate  func(tx *gorm.DB) error
	Rollback func(tx *gorm.DB) error
}{
	{Migrate_001, Rollback_001},
	{Migrate_002, Rollback_002},
	{Migrate_003, Rollback_003},
}

func RunMigrations(db *gorm.DB) error {
	for _, migration := range Migrations {
		if err := migration.Migrate(db); err != nil {
			return err
		}
	}
	return nil
}

func RollbackMigrations(db *gorm.DB) error {
	for i := len(Migrations) - 1; i >= 0; i-- {
		if err := Migrations[i].Rollback(db); err != nil {
			return err
		}
	}
	return nil
}
