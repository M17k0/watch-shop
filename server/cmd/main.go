package main

import (
	"fmt"
	"log"
	"net/http"
	"watch-shop-server/internal/config"
	"watch-shop-server/internal/migrations"
	"watch-shop-server/internal/routers"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Error loading config: %v", err)
	}

	dbConnectionString := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		cfg.DBHost, cfg.DBUser, cfg.DBPassword, cfg.DBName, cfg.DBPort)
	db, err := gorm.Open(postgres.Open(dbConnectionString), &gorm.Config{})
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}
	migrations.RunMigrations(db)

	/*
		// create a category
		var newCategory models.Category
		newCategory.Name = "Category 1"
		newCategory.OrderIndex = 1
		if err := db.Create(&newCategory).Error; err != nil {
			log.Fatalf("Error inserting new user: %v", err)
		}

		// create a tag
		var newTag models.Tag
		newTag.Name = "Tag 1"
		newTag.CategoryID = newCategory.ID
		if err := db.Create(&newTag).Error; err != nil {
			log.Fatalf("Error inserting new user: %v", err)
		}

		// create a product
		var newProduct models.Product
		newProduct.Name = "Product 1"
		newProduct.Description = "Description 1"
		newProduct.Price = 100
		newProduct.Stock = 10
		newProduct.Type = "watch"
		if err := db.Create(&newProduct).Error; err != nil {
			log.Fatalf("Error inserting new user: %v", err)
		}

		// create a product tag
		var newProductTag models.ProductTag
		newProductTag.ProductID = newProduct.ID
		newProductTag.TagID = newTag.ID
		if err := db.Create(&newProductTag).Error; err != nil {
			log.Fatalf("Error inserting new user: %v", err)
		}
	*/

	// update a user
	// var user models.User
	// err = db.Find(&user, "email = ?", "johndoe@example.com").Error
	// if err != nil {
	// 	log.Printf("Error finding user with email %s: %v", "johndoe@example.com", err)
	// } else {
	// 	user.FirstName = "Updated User Name"
	// 	err := db.Save(&user).Error
	// 	if err != nil {
	// 		log.Printf("Error updating user: %v", err)
	// 	} else {
	// 		fmt.Printf("User with email %s updated: %v\n", "johndoe@example.com", user)
	// 	}
	// }

	mainMux := http.NewServeMux()
	mainMux.Handle("/test", routers.TestRouter())
	mainMux.Handle("/test/", http.StripPrefix("/test", routers.TestRouter()))

	fmt.Println("Server is running on http://localhost:8080")
	if err := http.ListenAndServe(":8080", mainMux); err != nil {
		fmt.Printf("Error starting server: %v\n", err)
	}
}
