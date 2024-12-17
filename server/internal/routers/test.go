package routes

import (
	"fmt"
	"net/http"
)

func TestRouter() *http.ServeMux {
	mux := http.NewServeMux()

	fmt.Println("TestRouter")

	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/plain")
		fmt.Fprintln(w, "This is a test GET endpoint!")
	})

	mux.HandleFunc("DELETE /", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/plain")
		fmt.Fprintln(w, "This is a test GET endpoint!")
	})

	return mux
}
