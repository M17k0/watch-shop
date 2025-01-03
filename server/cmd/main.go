package main

import (
	"fmt"
	"log"
	"net/http"
	"watch-shop-server/internal/config"
	"watch-shop-server/internal/controllers"
	"watch-shop-server/internal/migrations"
	"watch-shop-server/internal/routes"
	"watch-shop-server/internal/services"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
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

	productController := controllers.NewProductController(services.NewProductService(db))
	categoryController := controllers.NewCategoryController(services.NewCategoryService(db))
	tagController := controllers.NewTagController(services.NewTagService(db))
	stripeController := controllers.NewStripeController(cfg.StripeSecretKey)
	orderController := controllers.NewOrderController(services.NewOrderService(db))
	userController := controllers.NewUserController(services.NewUserService(db), cfg.JWTSecret)

	router := gin.Default()

	router.Use(cors.Default())

	routes.RegisterProductRoutes(router, productController)
	routes.RegisterCategoryRoutes(router, categoryController)
	routes.RegisterTagRoutes(router, tagController)
	routes.RegisterStripeRouter(router, stripeController)
	routes.RegisterOrderRoutes(router, orderController)
	routes.RegisterUserRoutes(router, userController)

	fmt.Printf("Server is listening on port %s\n", cfg.ServerPort)
	if err := http.ListenAndServe(fmt.Sprintf(":%s", cfg.ServerPort), router); err != nil {
		fmt.Printf("Error starting server: %v\n", err)
	}
}
