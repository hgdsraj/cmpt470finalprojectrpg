package helpers

import (
	"golang.org/x/crypto/bcrypt"
	"sfu.ca/apruner/cmpt470finalprojectrpg/shared"

	"database/sql"
	"encoding/json"
	"net/http"

	"fmt"
	"log"
)

var JsonEncodingErrorFormatString = "json encoding error: %v"
var WritingErrorFormatString = "error writing: %v"
var Database *sql.DB

func GetUsername(r *http.Request) (string, error) {
	c, err := r.Cookie("username")
	if err != nil {
		if err == http.ErrNoCookie {
			return "", fmt.Errorf("username was not present: %v\n", err)
		}
		return "", fmt.Errorf("user attempted to authenticate but an error occured: %v\n", err)
	}
	return c.Value, nil
}

func GetSessionToken(r *http.Request) (string, error) {
	c, err := r.Cookie("session_token")
	if err != nil {
		if err == http.ErrNoCookie {
			return "", fmt.Errorf("user was not logged in: %v\n", err)
		}
		return "", fmt.Errorf("user attempted to authenticate but an error occured: %v\n", err)
	}
	return c.Value, nil
}

func UserLoggedIn(r *http.Request) (bool, error) {

	sessionToken, err := GetSessionToken(r)
	if err != nil {
		return false, err
	}
	username, err := GetUsername(r)
	if err != nil {
		return false, err
	}

	var (
		passwordSalt       string
		userId             string
		hashedSessionToken string
	)
	query := `SELECT passwordsalt, id FROM users WHERE username = $1`
	row := Database.QueryRow(query, username)
	err = row.Scan(&passwordSalt, &userId)
	if err != nil {
		return false, fmt.Errorf("err while querying for userid and salt in users: %v\n", err)
	}
	query = `SELECT sessionkey FROM usersessions WHERE userid = $1`
	row = Database.QueryRow(query, userId)
	err = row.Scan(&hashedSessionToken)
	if err != nil {
		return false, fmt.Errorf("err while querying for sessionkey in usersessions: %v\n", err)
	}
	err = bcrypt.CompareHashAndPassword([]byte(hashedSessionToken), []byte(sessionToken+passwordSalt))
	if err != nil {
		return false, fmt.Errorf("err while comparing hashed session token with user session token: %v\n", err)

	}

	return true, nil
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
