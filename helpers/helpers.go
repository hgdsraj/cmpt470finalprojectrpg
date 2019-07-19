package helpers

import (
	"sfu.ca/apruner/cmpt470finalprojectrpg/shared"

	"encoding/json"
	"net/http"

	"log"
)

var JsonError string = "json encoding error: %v"

func UserLoggedIn(username string) bool {
	//TODO
	return true
}

func LogAndSendErrorMessage(w http.ResponseWriter, message string, statusCode int) {
	responseToEncode := shared.Response{message}
	encodedResponse, err := json.Marshal(responseToEncode)
	if err != nil {
		log.Printf(JsonError, err)
	}
	log.Println(message)
	w.WriteHeader(statusCode)
	_, err = w.Write(encodedResponse)
	if err != nil {
		log.Printf("error writing: %v", err)
	}

}
