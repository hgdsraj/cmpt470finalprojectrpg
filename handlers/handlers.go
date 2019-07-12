package handlers

import (

	"database/sql"
	"encoding/json"
	"net/http"

	"fmt"
	"log"
	"os"
)

var Database *sql.DB

var config Config;

type Config struct {
	Protocol string `json:"protocol"`
	Local    bool   `json:"local"`
}


func SetupConfig() {
	production := os.Getenv("HEROKU");
	if production != "" {
		config.Local = false
		config.Protocol = "wss://"
	} else {
		config.Local = true
		config.Protocol = "ws://"
	}
}

func HandleConfig(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var err error
	bytes, err := json.Marshal(config)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		_, err := w.Write([]byte(fmt.Sprintf("handleConfig error: %v", err)))
		if err != nil {
			log.Printf("handleConfig error: %v", err);
		}
		return
	}
	_, err = w.Write(bytes)
}

func TestDatabase(w http.ResponseWriter, r *http.Request) {
	_, err := Database.Query("SELECT 1 FROM users")
	if err != nil {
		log.Printf("error querying database: %v", err);
		_, err := w.Write([]byte("Database is not connected!"))
		if err != nil {
			log.Printf("error writing: %v", err);
		}
		return
	}
	_, err = w.Write([]byte("Database is connected!"))
	if err != nil {
		log.Printf("testDatabase error: %v", err);
	}

}
