package config

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	DBUser          string
	DBPassword      string
	DBHost          string
	DBName          string
	DBPort          string
	ServerPort      string
	StripeSecretKey string
	JWTSecret       string
}

func LoadConfig() (*Config, error) {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASS")
	dbHost := os.Getenv("DB_HOST")
	dbName := os.Getenv("DB_NAME")
	dbPort := os.Getenv("DB_PORT")
	serverPort := os.Getenv("SERVER_PORT")
	stripeSecretKey := os.Getenv("STRIPE_SECRET_KEY")
	jwtSecret := os.Getenv("JWT_SECRET")

	if dbUser == "" || dbPassword == "" || dbHost == "" || dbName == "" || dbPort == "" || serverPort == "" || stripeSecretKey == "" {
		return nil, fmt.Errorf("some required environment variables are missing")
	}

	return &Config{
		DBUser:          dbUser,
		DBPassword:      dbPassword,
		DBHost:          dbHost,
		DBName:          dbName,
		DBPort:          dbPort,
		ServerPort:      serverPort,
		StripeSecretKey: stripeSecretKey,
		JWTSecret:       jwtSecret,
	}, nil
}
