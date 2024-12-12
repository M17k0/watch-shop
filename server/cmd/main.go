package main

import (
	"fmt"
	"net/http"
	"watch-shop-server/internal/routers"
)

func main() {
	mainMux := http.NewServeMux()

	mainMux.Handle("/test", routes.TestRouter())
	mainMux.Handle("/test/", http.StripPrefix("/test", routes.TestRouter()))

	fmt.Println("Server is running on http://localhost:8080")
	if err := http.ListenAndServe(":8080", mainMux); err != nil {
		fmt.Printf("Error starting server: %v\n", err)
	}
}
