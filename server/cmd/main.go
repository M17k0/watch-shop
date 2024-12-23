package main

import (
	"fmt"
	"net/http"
	"watch-shop-server/internal/migrations"
	"watch-shop-server/internal/routers"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	dsn := "host=localhost user=pass password=pass dbname=test port=8808 sslmode=disable TimeZone=Asia/Shanghai"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	migrations.RunMigrations(db)

	fmt.Println(db, err)

	mainMux := http.NewServeMux()

	mainMux.Handle("/test", routers.TestRouter())
	mainMux.Handle("/test/", http.StripPrefix("/test", routers.TestRouter()))

	fmt.Println("Server is running on http://localhost:8080")
	if err := http.ListenAndServe(":8080", mainMux); err != nil {
		fmt.Printf("Error starting server: %v\n", err)
	}
}
