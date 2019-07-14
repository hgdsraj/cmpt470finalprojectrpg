package main

import (
	"github.com/gorilla/mux"
	"sfu.ca/apruner/cmpt470finalprojectrpg/db"
	"sfu.ca/apruner/cmpt470finalprojectrpg/handlers"

	"fmt"
	"log"
	"net/http"
	"os"
	"time"
)

const STATIC = "/static/"

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/config.json", handlers.HandleConfig)
	r.HandleFunc("/channels.json", handlers.GetChannels)
	r.HandleFunc("/channel", handlers.CreateChannel)
	r.HandleFunc("/database.html", handlers.TestDatabase)
	// Configure websocket route
	r.HandleFunc("/{name}/ws", handlers.HandleConnections)
	r.HandleFunc("/chat/{name}", handlers.HandleChatroom)
	r.HandleFunc("/api/users/login", handlers.HandleUserLogin)
	r.HandleFunc("/api/users/create", handlers.HandleUserCreate)
	r.HandleFunc("/api/characters/create", handlers.HandleCharacterCreate)

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
