package handlers

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
	"golang.org/x/crypto/bcrypt"
	"sfu.ca/apruner/cmpt470finalprojectrpg/helpers"
	"sfu.ca/apruner/cmpt470finalprojectrpg/shared"

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
		helpers.LogAndSendErrorMessage(w, fmt.Sprintf("handleConfig error: %v", err), http.StatusInternalServerError)
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
	responseToEncode := shared.Response{"Database is connected!!"}
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
	queryUser := shared.User{}
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
	requestUser := shared.User{}
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&requestUser)
	if err != nil {
		helpers.LogAndSendErrorMessage(w, "Could not process JSON body!", http.StatusBadRequest)
		return
	}
	queryUser := shared.User{}
	var passwordHash string
	var passwordSalt string
	row := Database.QueryRow("SELECT id, username, fullname, passwordhash, passwordsalt FROM users WHERE username = $1", requestUser.Username)
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
	err = bcrypt.CompareHashAndPassword([]byte(passwordHash), []byte(requestUser.Password+passwordSalt))
	if err != nil {
		helpers.LogAndSendErrorMessage(w, "Password was incorrect!", http.StatusForbidden)
		return
	}

	sessionToken := uuid.New().String()
	sessionHash, err := bcrypt.GenerateFromPassword([]byte(sessionToken+passwordSalt), bcrypt.MinCost)
	selectUserIdStatement := `SELECT 1 FROM usersessions WHERE userid = $1`
	row = Database.QueryRow(selectUserIdStatement, queryUser.Id)
	var temp int
	err = row.Scan(&temp)
	if err == sql.ErrNoRows {
		sqlStatement := `INSERT INTO usersessions (sessionkey, userid, logintime, lastseentime)
			VALUES ($1, $2, $3, $4)`
		_, err = Database.Exec(sqlStatement, sessionHash, queryUser.Id, time.Now(), time.Now())
		if err != nil {
			strErr := fmt.Sprintf("Could not insert into database error: %v", err)
			helpers.LogAndSendErrorMessage(w, strErr, http.StatusInternalServerError)
			return
		}
	} else {
		sqlStatement := `UPDATE usersessions SET sessionkey = $1, logintime = $2, lastseentime = $3 WHERE userid = $4`
		_, err = Database.Exec(sqlStatement, sessionHash, time.Now(), time.Now(), queryUser.Id)
		if err != nil {
			strErr := fmt.Sprintf("Could not insert into database error: %v", err)
			helpers.LogAndSendErrorMessage(w, strErr, http.StatusInternalServerError)
			return
		}
	}

	http.SetCookie(w, &http.Cookie{
		Name:    "session_token",
		Value:   string(sessionToken),
		Path: "/api/",
		//TODO probably should expire: Expires: time.Now().Add(3600 * time.Second),
	})
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

func HandleTestUserLoggedIn(w http.ResponseWriter, r *http.Request) {
	username := mux.Vars(r)["username"]
	if !helpers.UserLoggedIn(username, r) {
		helpers.LogAndSendErrorMessage(w, "User not authenticated, please log in!", http.StatusForbidden)
		return
	}
	responseToEncode := shared.Response{"User is logged in"}
	encodedResponse, err := json.Marshal(responseToEncode)
	if err != nil {
		log.Printf(helpers.JsonError, err)
	}
	w.WriteHeader(http.StatusOK)
	_, err = w.Write(encodedResponse)
	if err != nil {
		log.Printf("error writing: %v", err)
	}

}

func HandleUserCreate(w http.ResponseWriter, r *http.Request) {
	EnableCors(&w)
	user := shared.User{}
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
	responseToEncode := shared.Response{"Successfully created user"}
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
	username := mux.Vars(r)["username"]
	if !helpers.UserLoggedIn(username, r) {
		helpers.LogAndSendErrorMessage(w, "User not authenticated, please log in!", http.StatusForbidden)
		return
	}
	// TODO: maybe make a separate constructor function for this? or make default values in the database for new
	//  characters? or allow custom values (i.e. fixed number of assignable attribute points)?
	character := shared.Character{
		Level: 1,
	}

	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&character) // store uid and name
	if err != nil {
		helpers.LogAndSendErrorMessage(w, "Could not process JSON body!", http.StatusBadRequest)
		return
	}

	err = character.Validate()
	if err != nil {
		helpers.LogAndSendErrorMessage(w, fmt.Sprintf("character invalid, err: %v", err),
			http.StatusBadRequest)
		return
	}

	character.CalculateStats()

	var userId int
	row := Database.QueryRow(`SELECT id  FROM users WHERE username = $1`, username)
	err = row.Scan(&userId)
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

	sqlStatement := `INSERT INTO Characters (charactername, characterlevel, attack, defense, magic_attack, magic_defense, health, stamina, strength, agility, wisdom, charisma, userid)
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`
	_, err = Database.Exec(sqlStatement, character.CharacterName, character.Level, character.Attack,
		character.Defense, character.MagicAttack, character.MagicDefense, character.Health,
		character.Stamina, character.Strength, character.Agility, character.Wisdom, character.Charisma, userId)

	if err != nil {
		strErr := fmt.Sprintf("Could not insert into database error: %v", err)
		helpers.LogAndSendErrorMessage(w, strErr, http.StatusBadRequest)
		return
	}
	character.UserId = userId
	w.WriteHeader(http.StatusCreated)
	encodedResponse, err := json.Marshal(character)
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
	if !helpers.UserLoggedIn(username, r) {
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

	rows, err := Database.Query(`SELECT characterid, charactername, attack, defense, health, userid,
       									stamina, strength, agility, wisdom, charisma
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

	characters := shared.Characters{[]shared.Character{}}
	for rows.Next() {
		character := shared.Character{}
		err := rows.Scan(&character.CharacterId, &character.CharacterName, &character.Attack,
			&character.Defense, &character.Health, &character.UserId, &character.Stamina, &character.Strength,
			&character.Agility, &character.Wisdom, &character.Charisma)
		if err != nil {
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
