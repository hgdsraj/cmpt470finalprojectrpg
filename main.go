package main

import (
	"github.com/gorilla/mux"
	"sfu.ca/rmahey/cmpt470project/db"
	"sfu.ca/rmahey/cmpt470project/handlers"

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

	r.PathPrefix("/").Handler(http.FileServer(http.Dir("." + STATIC)))

	// Start listening for incoming chat messages
	//go handlers.HandleMessages()

	database := db.OpenDb()
	handlers.Database = database
	handlers.SetupConfig()
	// Configure websocket route

	port := os.Getenv("PORT")
	if port == "" {
		log.Println("no port supplied. defaulting to 8000")

		port = "8000"
	}
	host := os.Getenv("HOST")
	if host == "" {
		log.Println("no HOST supplied. defaulting to 0.0.0.0")
		host = "0.0.0.0"
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
