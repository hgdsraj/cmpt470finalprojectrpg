package helpers

import (
	"golang.org/x/crypto/bcrypt"
	"sfu.ca/apruner/cmpt470finalprojectrpg/shared"

	"database/sql"
	"encoding/json"
	"net/http"

	"log"
)

var JsonEncodingErrorFormatString = "json encoding error: %v"
var WritingErrorFormatString = "error writing: %v"
var Database *sql.DB
var Test = false;

func UserLoggedIn(username string, r *http.Request) bool {
	if Test {
		return true
	}
	if username == "" {
		log.Println("No username was provided")
		return false
	}
	c, err := r.Cookie("session_token")
	if err != nil {
		if err == http.ErrNoCookie {
			log.Printf("user: %v was not logged in: %v\n", username, err)
			return false
		}
		log.Printf("user: %v attempted to authenticate but an error occured: %v\n", username, err)
		return false
	}
	sessionToken := c.Value
	var (
		passwordSalt string
		userId string
		hashedSessionToken string
	)
	query := `SELECT passwordsalt, id FROM users WHERE username = $1`
	row := Database.QueryRow(query, username)
	err = row.Scan(&passwordSalt, &userId)
	if err != nil {
		log.Printf("err while querying for userid and salt in users: %v\n", err)
		return false
	}
	query = `SELECT sessionkey FROM usersessions WHERE userid = $1`
	row = Database.QueryRow(query, userId)
	err = row.Scan(&hashedSessionToken)
	if err != nil {
		log.Printf("err while querying for sessionkey in usersessions: %v\n", err)
		return false
	}
	err = bcrypt.CompareHashAndPassword([]byte(hashedSessionToken), []byte(sessionToken+passwordSalt))
	if err != nil {
		log.Printf("err while comparing hashed session token with user session token: %v\n", err)
		return false
	}

	return true
}

func LogAndSendErrorMessage(w http.ResponseWriter, message string, statusCode int) {
	responseToEncode := shared.Response{message}
	encodedResponse, err := json.Marshal(responseToEncode)
	if err != nil {
		log.Printf(JsonEncodingErrorFormatString, err)
	}
	log.Println(message)
	w.WriteHeader(statusCode)
	_, err = w.Write(encodedResponse)
	if err != nil {
		log.Printf(WritingErrorFormatString, err)
	}

}
