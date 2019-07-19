package main

import (
	h "github.com/gorilla/handlers"
	"github.com/gorilla/mux"

	"sfu.ca/apruner/cmpt470finalprojectrpg/db"
	"sfu.ca/apruner/cmpt470finalprojectrpg/handlers"

	"fmt"
	"log"
	"net/http"
	"os"
	"time"
)

const STATIC = "./frontend/build"

func loggingMiddleware(next http.Handler) http.Handler {
	return h.CombinedLoggingHandler(os.Stdout, next)
}

func main() {

	r := mux.NewRouter()
	if 	production := os.Getenv("HEROKU"); production == "" {
		r.Use(loggingMiddleware)
	}
	r.HandleFunc("/config.json", handlers.HandleConfig)
	r.HandleFunc("/channels.json", handlers.GetChannels)
	r.HandleFunc("/channel", handlers.CreateChannel)
	r.HandleFunc("/database.html", handlers.TestDatabase)
	// Configure websocket route
	r.HandleFunc("/{name}/ws", handlers.HandleConnections)
	r.HandleFunc("/chat/{name}", handlers.HandleChatroom)

	// Non chat backend API endpoints
	api := r.PathPrefix("/api").Subrouter()
	api.HandleFunc("/users/{username}", handlers.HandleUserExists).Methods("GET")
	api.HandleFunc("/users/login", handlers.HandleUserLogin).Methods("POST")
	api.HandleFunc("/users/create", handlers.HandleUserCreate).Methods("POST")
	api.HandleFunc("/characters/{username}/create", handlers.HandleCharacterCreate).Methods("POST")
	api.HandleFunc("/characters/{username}", handlers.HandleUserCharacters).Methods("GET")

	if os.Getenv("DISABLE_STATIC_FILE_SERVER") != "true" {
		r.PathPrefix("").Handler(http.StripPrefix("", http.FileServer(http.Dir(STATIC))))
	}
	// r.PathPrefix("/").Handler(http.FileServer(http.Dir("." + STATIC)))

	// Start listening for incoming chat messages
	//go handlers.HandleMessages()

	database := db.OpenDb()
	handlers.Database = database
	handlers.SetupConfig()
	// Configure websocket route

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
		log.Printf("no port supplied. defaulting to %v\n", port)
	}
	host := os.Getenv("HOST")
	if host == "" {
		host = "0.0.0.0"
		log.Printf("no HOST supplied. defaulting to %v\n", host)
	}
	srv := &http.Server{
		Handler:      r,
		Addr:         fmt.Sprintf("%v:%v", host, port),
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}
	log.Printf("http server starting on %v:%v\n", host, port)

	log.Fatal(srv.ListenAndServe())
}
