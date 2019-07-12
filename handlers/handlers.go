package handlers

import (
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"html/template"
	"sync"

	"database/sql"
	"encoding/json"
	"net/http"

	"fmt"
	"log"
	"os"
	"time"
)

var Database *sql.DB

var config Config;

type Config struct {
	Protocol string `json:"protocol"`
	Local    bool   `json:"local"`
}

var clients = make(map[string]map[*websocket.Conn]bool) // connected clients
var broadcast = make(map[string](chan Message))         // broadcast channel
var handleMessagesRoutineExit = make(map[string](chan struct{}))         // broadcast channel

var channels = make([]string, 0)
var clientsMutex = &sync.Mutex{}
//var handleMessagesRoutineExitMutex = &sync.Mutex{}
//var broadcastMutex = &sync.Mutex{} // not sure if need yet

// Configure the upgrader
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
	HandshakeTimeout: time.Hour * 1000, //TODO this is really dumb.
}

// Define our message object
type Message struct {
	Email    string `json:"email"`
	Username string `json:"username"`
	Message  string `json:"message"`
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

func HandleConnections(w http.ResponseWriter, r *http.Request) {
	fmt.Println("handling")
	vars := mux.Vars(r)
	channelName := vars["name"]
	clientsMutex.Lock()
	if _, ok := clients[channelName]; !ok {
		clients[channelName] = make(map[*websocket.Conn]bool)
	}
	clientsMutex.Unlock()
	// Upgrade initial GET request to a websocket
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("error upgrading websocket: ", err)
	}
	// Make sure we close the connection when the function returns
	defer ws.Close()

	// Register our new client
	clientsMutex.Lock()
	clients[channelName][ws] = true
	clientsMutex.Unlock()

	for {
		var msg Message
		// Read in a new message as JSON and map it to a Message object
		ws.SetPingHandler(func(appData string) error { return nil })
		err := ws.ReadJSON(&msg)
		if err != nil {
			log.Printf("handleConnections error: %v", err)
			clientsMutex.Lock()
			delete(clients[channelName], ws)
			clientsMutex.Unlock()

			break
		}
		if msg.Username == "ping" && msg.Message == "ping" && msg.Email == "ping" {
			continue
		}
		// Send the newly received message to the broadcast channel
		broadcast[channelName] <- msg
	}
}

func HandleMessages(channelName string, exitChannel chan struct{}) {
	if _, ok := broadcast[channelName]; !ok {
		broadcast[channelName] = make(chan Message)
	}

	for {
		select {
		case <-exitChannel:
			return
		default:
			// Grab the next message from the broadcast channel
			msg := <-broadcast[channelName]
			if msg.Message == "" {
				continue
			}
			// Send it out to every client that is currently connected
			clientsMutex.Lock()
			for client := range clients[channelName] {
				fmt.Println("msg was: ", msg)
				err := client.WriteJSON(msg)
				if err != nil {
					log.Printf("handleMessages error: %v", err)
					client.Close()
					delete(clients[channelName], client)
				}
			}
			clientsMutex.Unlock()
			// …
		}

	}
}

func CreateChannel(w http.ResponseWriter, r *http.Request) {
	channelName := r.FormValue("channel_name")
	channels = append(channels, channelName)
	fmt.Println(channels)
	exitChannel := make(chan struct{});
	handleMessagesRoutineExit[channelName] = exitChannel

	go HandleMessages(channelName, exitChannel)
	http.Redirect(w, r, "/", 301)

}

// todo add route
func DeleteChannel(w http.ResponseWriter, r *http.Request) {
	channelName := r.FormValue("channel_name")
	for i, v := range channels {
		if v == channelName {
			channels[i] = channels[len(channels)-1]
			channels = channels[:len(channels)-1]
			break
		}
	}

	fmt.Println(channels)
	http.Redirect(w, r, "/", 301)

}

func GetChannels(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var err error

	bytes, err := json.Marshal(channels)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		_, err := w.Write([]byte(fmt.Sprintf("getChannels error: %v", err)))
		if err != nil {
			log.Printf("getChannels error: %v", err);
		}
		return
	}
	_, err = w.Write(bytes)

}

type ChatroomData struct {
	ChatroomName string
}

func HandleChatroom(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	chatroomName := vars["name"]
	var err error

	t := template.New("chat.html")          // Create a template.
	t, err = t.ParseFiles("tmpl/chat.html") // Parse template file.
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		_, err := w.Write([]byte(fmt.Sprintf("HandleChatroom template parse error: %v", err)))
		log.Printf("HandleChatroom template parse error: %v", err);
		if err != nil {
			log.Printf("HandleChatroom template parse error: %v", err);
		}
		return
	}

	chatroomData := ChatroomData{ChatroomName: chatroomName}
	err = t.Execute(w, chatroomData) // merge.
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		_, err := w.Write([]byte(fmt.Sprintf("HandleChatroom template execute error: %v", err)))
		log.Printf("HandleChatroom template execute error: %v", err);
		if err != nil {
			log.Printf("HandleChatroom template execute error: %v", err);
		}
		return
	}

}
