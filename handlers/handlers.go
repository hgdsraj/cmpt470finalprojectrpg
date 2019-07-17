package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strings"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"golang.org/x/crypto/bcrypt"
	"sfu.ca/apruner/cmpt470finalprojectrpg/helpers"

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

type Characters struct {
	Characters []Character `json:"characters"`
}

type Item struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
	Type string `json:"type"`
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
		helpers.LogAndSendErrorMessage(w, fmt.Sprintf("handleConfig error: %v", err),  http.StatusInternalServerError)
		return
	}
	_, err = w.Write(bytes)
}

func TestDatabase(w http.ResponseWriter, r *http.Request) {
	_, err := Database.Query("SELECT 1 FROM Users")
	if err != nil {
		helpers.LogAndSendErrorMessage(w, "Database is not connected!", http.StatusInternalServerError)
		return
	}
	responseToEncode := helpers.Response{"Database is connected!!"}
	encodedResponse, err := json.Marshal(responseToEncode)
	if err != nil {
		log.Printf(helpers.JsonError, err)
	}
	_, err = w.Write(encodedResponse)
	if err != nil {
		log.Printf("testDatabase error: %v", err)
	}

}

// TODO: Maybe refactor so that there is less copy paste between this and the other user endpoints
func HandleUserExists(w http.ResponseWriter, r *http.Request) {
	EnableCors(&w)
	username := mux.Vars(r)["username"]
	queryUser := User{}
	row := Database.QueryRow("SELECT id, username, fullname FROM users WHERE username = $1", username)
	err := row.Scan(&queryUser.Id, &queryUser.Username, &queryUser.FullName)

	if err != nil {
		var strErr string
		var header int
		if err == sql.ErrNoRows {
			strErr = fmt.Sprintf("error querying database (user doesn't exist): %v", err)
			header = http.StatusNotFound
		} else {
			strErr = fmt.Sprintf("error querying database (other sql error): %v", err)
			log.Printf(strErr)
			header = http.StatusInternalServerError
		}
		helpers.LogAndSendErrorMessage(w, strErr, header)
		return
	}

	resp, err := json.Marshal(queryUser)
	if err != nil {
		helpers.LogAndSendErrorMessage(w, "Could not marshal JSON body!", http.StatusInternalServerError)
		return
	}

	_, err = w.Write(resp)
	if err != nil {
		log.Printf("error writing: %v", err)
	}

}

func HandleUserLogin(w http.ResponseWriter, r *http.Request) {
	EnableCors(&w)
	user := User{}
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&user)
	if err != nil {
		helpers.LogAndSendErrorMessage(w, "Could not process JSON body!", http.StatusBadRequest)
		return
	}
	queryUser := User{}
	var passwordHash string
	var passwordSalt string
	row := Database.QueryRow("SELECT id, username, fullname, passwordhash, passwordsalt FROM users WHERE username = $1", user.Username)
	err = row.Scan(&queryUser.Id, &queryUser.Username, &queryUser.FullName, &passwordHash, &passwordSalt)
	if err != nil {
		strErr := fmt.Sprintf("error querying database: %v", err)
		header := http.StatusNotFound
		if err != sql.ErrNoRows {
			header = http.StatusInternalServerError
		}
		helpers.LogAndSendErrorMessage(w, strErr, header)
		return
	}
	err = bcrypt.CompareHashAndPassword([]byte(passwordHash), []byte(user.Password+passwordSalt))
	if err != nil {
		helpers.LogAndSendErrorMessage(w, "Password was incorrect!", http.StatusForbidden)
		return
	}
	resp, err := json.Marshal(queryUser)
	if err != nil {
		helpers.LogAndSendErrorMessage(w, "Could not marshal JSON body!", http.StatusInternalServerError)
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
		helpers.LogAndSendErrorMessage(w, "Could not process JSON body!", http.StatusBadRequest)
		return
	}
	user.Username = strings.ToLower(user.Username) // Lowercase the username
	row := Database.QueryRow("SELECT 1 FROM users WHERE username = $1", user.Username)
	var temp int
	err = row.Scan(&temp)
	if err != sql.ErrNoRows {
		strErr := fmt.Sprintf("user already exists. error: %v", err)
		helpers.LogAndSendErrorMessage(w, strErr, http.StatusConflict)
		return
	}

	passwordSalt := uuid.New().String()
	passwordHash, err := bcrypt.GenerateFromPassword([]byte(user.Password+passwordSalt), bcrypt.MinCost)
	sqlStatement := `INSERT INTO Users (username, fullname, passwordhash, passwordsalt)
			VALUES ($1, $2, $3, $4)`
	_, err = Database.Exec(sqlStatement, user.Username, user.FullName, passwordHash, passwordSalt)
	if err != nil {
		strErr := fmt.Sprintf("Could not insert into database error: %v", err)
		helpers.LogAndSendErrorMessage(w, strErr, http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
	responseToEncode := helpers.Response{"Successfully created user"}
	encodedResponse, err := json.Marshal(responseToEncode)
	if err != nil {
		log.Printf(helpers.JsonError, err)
	}
	_, err = w.Write(encodedResponse)
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
		helpers.LogAndSendErrorMessage(w, "Could not process JSON body!", http.StatusBadRequest)
		return
	}

	sqlStatement := `INSERT INTO Characters (charactername, attack, defense, health, userid)
			VALUES ($1, $2, $3, $4, $5)`
	_, err = Database.Exec(sqlStatement, character.CharacterName, character.Attack, character.Defense,
		character.Health, character.UserId)

	if err != nil {
		strErr := fmt.Sprintf("Could not insert into database error: %v", err)
		helpers.LogAndSendErrorMessage(w, strErr, http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)
	responseToEncode := helpers.Response{"Successfully created character"}
	encodedResponse, err := json.Marshal(responseToEncode)
	if err != nil {
		log.Printf(helpers.JsonError, err)
	}
	_, err = w.Write(encodedResponse)
	if err != nil {
		log.Printf("error writing: %v", err)
	}

}


func HandleUserCharacters(w http.ResponseWriter, r *http.Request) {
	EnableCors(&w)
	username := mux.Vars(r)["username"]
	if !helpers.UserLoggedIn(username) {
		helpers.LogAndSendErrorMessage(w, "User not authenticated, please log in!", http.StatusForbidden)
		return
	}
	var userId int
	row := Database.QueryRow(`SELECT id  FROM users WHERE username = $1`, username)
	err := row.Scan(&userId)
	if err != nil {
		var strErr string
		var header int
		if err == sql.ErrNoRows {
			strErr = fmt.Sprintf("error querying database (user doesn't exist): %v", err)
			header = http.StatusNotFound
		} else {
			strErr = fmt.Sprintf("error querying database (other sql error): %v", err)
			log.Printf(strErr)
			header = http.StatusInternalServerError
		}
		helpers.LogAndSendErrorMessage(w, strErr, header)
		return
	}

	rows, err := Database.Query(`SELECT characterid, charactername, attack, defense, health, userid
										FROM characters WHERE userid = $1`, userId)
	if err != nil {
		helpers.LogAndSendErrorMessage(w, fmt.Sprintf("error querying rows: %v", err), http.StatusInternalServerError)
		return
	}
	defer func() {
		err := rows.Close()
		if err != nil {
			log.Println("error closing rows in HandleUserCharacters: ", err)
		}
	}()

	characters := Characters{[]Character{}}
	for rows.Next() {
		character := Character{}
		if err := rows.Scan(&character.CharacterId, &character.CharacterName, &character.Attack,
							&character.Defense, &character.Health, &character.UserId); err != nil {
			msg := fmt.Sprintf("error scanning row, aborting. error: %v", err)
			helpers.LogAndSendErrorMessage(w, msg, http.StatusInternalServerError)
			return
		}
		characters.Characters = append(characters.Characters, character)
	}

	resp, err := json.Marshal(characters)
	if err != nil {
		helpers.LogAndSendErrorMessage(w, "Could not marshal JSON body!", http.StatusInternalServerError)
		return
	}

	_, err = w.Write(resp)
	if err != nil {
		log.Printf("error writing: %v", err)
	}

}