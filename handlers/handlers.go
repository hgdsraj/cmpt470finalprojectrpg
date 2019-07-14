package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strings"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"

	"fmt"
	"log"
	"os"
)

var Database *sql.DB

var config Config

type Config struct {
	Protocol string `json:"protocol"`
	Local    bool   `json:"local"`
}

func SetupConfig() {
	production := os.Getenv("HEROKU")
	if production != "" {
		config.Local = false
		config.Protocol = "wss://"
	} else {
		config.Local = true
		config.Protocol = "ws://"
	}
}

// TODO: Figure out if Cors is/should be enabled for production
// Development needs it for now
func EnableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func HandleConfig(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var err error
	bytes, err := json.Marshal(config)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		_, err := w.Write([]byte(fmt.Sprintf("handleConfig error: %v", err)))
		if err != nil {
			log.Printf("handleConfig error: %v", err)
		}
		return
	}
	_, err = w.Write(bytes)
}

func TestDatabase(w http.ResponseWriter, r *http.Request) {
	_, err := Database.Query("SELECT 1 FROM Users")
	if err != nil {
		log.Printf("error querying database: %v", err)
		_, err := w.Write([]byte("Database is not connected!"))
		if err != nil {
			log.Printf("error writing: %v", err)
		}
		return
	}
	_, err = w.Write([]byte("Database is connected!"))
	if err != nil {
		log.Printf("testDatabase error: %v", err)
	}

}

type User struct {
	Id       int    `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
	FullName string `json:"full_name"`
}

type Character struct {
	CharacterId   int    `json:"id"`
	CharacterName string `json:"name"`
	Attack        int    `json:"attack"`
	Defense       int    `json:"defense"`
	Health        int    `json:"health"`
	UserId        int    `json:"uid"`
}

type Item struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
	Type string `json:"type"`
}

func HandleUserLogin(w http.ResponseWriter, r *http.Request) {
	EnableCors(&w)
	user := User{}
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		_, err := w.Write([]byte("Could not process JSON body!"))
		if err != nil {
			log.Printf("error writing: %v", err)
		}
		return
	}
	queryUser := User{}
	var passwordHash string
	var passwordSalt string
	row := Database.QueryRow("SELECT id, username, fullname, passwordhash, passwordsalt FROM users WHERE username = $1", user.Username)
	err = row.Scan(&queryUser.Id, &queryUser.Username, &queryUser.FullName, &passwordHash, &passwordSalt)
	if err != nil {
		strErr := fmt.Sprintf("error querying database: %v", err)
		log.Printf(strErr)
		if err == sql.ErrNoRows {
			w.WriteHeader(http.StatusNotFound)
		} else {
			w.WriteHeader(http.StatusInternalServerError)
		}
		_, err := w.Write([]byte(strErr))
		if err != nil {
			log.Printf("error writing: %v", err)
		}
		return
	}
	err = bcrypt.CompareHashAndPassword([]byte(passwordHash), []byte(user.Password+passwordSalt))
	if err != nil {
		w.WriteHeader(http.StatusForbidden)
		log.Printf("error in password: %v\n", err)

		_, err := w.Write([]byte("Password was incorrect!"))
		if err != nil {
			log.Printf("error writing: %v", err)
		}
		return
	}
	resp, err := json.Marshal(queryUser)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		_, err := w.Write([]byte("Could not marshal JSON body!"))
		if err != nil {
			log.Printf("error writing: %v", err)
		}
		return
	}

	_, err = w.Write([]byte(resp))
	if err != nil {
		log.Printf("error writing: %v", err)
	}
}

func HandleUserCreate(w http.ResponseWriter, r *http.Request) {
	EnableCors(&w)
	user := User{}
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		_, err := w.Write([]byte("Could not process JSON body!"))
		if err != nil {
			log.Printf("error writing: %v", err)
		}
		return
	}
	user.Username = strings.ToLower(user.Username) // Lowercase the username
	row := Database.QueryRow("SELECT 1 FROM users WHERE username = $1", user.Username)
	var temp int
	err = row.Scan(&temp)
	if err != sql.ErrNoRows {
		strErr := fmt.Sprintf("user already exists error: %v", err)
		log.Printf(strErr)
		w.WriteHeader(http.StatusInternalServerError)
		_, err := w.Write([]byte(strErr))
		if err != nil {
			log.Printf("error writing: %v", err)
		}
		return
	}

	passwordSalt := uuid.New().String()
	passwordHash, err := bcrypt.GenerateFromPassword([]byte(user.Password+passwordSalt), bcrypt.MinCost)
	sqlStatement := `INSERT INTO Users (username, fullname, passwordhash, passwordsalt)
			VALUES ($1, $2, $3, $4)`
	_, err = Database.Exec(sqlStatement, user.Username, user.FullName, passwordHash, passwordSalt)
	if err != nil {
		strErr := fmt.Sprintf("Could not insert into database error: %v", err)
		log.Printf(strErr)
		w.WriteHeader(http.StatusInternalServerError)
		_, err := w.Write([]byte(strErr))
		if err != nil {
			log.Printf("error writing: %v", err)
		}
		return
	}
	_, err = w.Write([]byte("Successfully created user"))
	if err != nil {
		log.Printf("error writing: %v", err)
	}

}

// HandleCharacterCreate takes name and uid values
func HandleCharacterCreate(w http.ResponseWriter, r *http.Request) {
	EnableCors(&w)

	// TODO: maybe make a separate constructor function for this? or make default values in the database for new
	//  characters? or allow custom values (i.e. fixed number of assignable attribute points)?
	character := Character{}
	character.Attack = 5
	character.Defense = 4
	character.Health = 25
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&character) // store uid and name

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		_, err := w.Write([]byte("Could not process JSON body!"))
		if err != nil {
			log.Printf("error writing: %v", err)
		}
		return
	}

	sqlStatement := `INSERT INTO Characters (charactername, attack, defense, health, userid)
			VALUES ($1, $2, $3, $4, $5)`
	_, err = Database.Exec(sqlStatement, character.CharacterName, character.Attack, character.Defense,
		character.Health, character.UserId)

	if err != nil {
		strErr := fmt.Sprintf("Could not insert into database error: %v", err)
		log.Printf(strErr)
		w.WriteHeader(http.StatusInternalServerError)
		_, err := w.Write([]byte(strErr))
		if err != nil {
			log.Printf("error writing: %v", err)
		}
		return
	}

	_, err = w.Write([]byte("Successfully created character"))
	if err != nil {
		log.Printf("error writing: %v", err)
	}

}

//type Character struct {
//	CharacterId   int    `json:"id"`
//	CharacterName string `json:"name"`
//	Attack        int    `json:"attack"`
//	Defense       int    `json:"defense"`
//	Health        int    `json:"health"`
//	UserId        int    `json:"uid"`
//}
