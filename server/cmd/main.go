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

	mainMux := http.NewServeMux()
	mainMux.Handle("/test", routers.TestRouter())
	mainMux.Handle("/test/", http.StripPrefix("/test", routers.TestRouter()))

	fmt.Println("Server is running on http://localhost:8080")
	if err := http.ListenAndServe(":8080", mainMux); err != nil {
		fmt.Printf("Error starting server: %v\n", err)
	}
}
