// handlers_test.go
package handlers

import (
	"github.com/DATA-DOG/go-sqlmock"
	"github.com/gorilla/mux"

	"encoding/json"
	"net/http"
	"net/http/httptest"

	"bytes"
	"reflect"
	"testing"
)

func TestHandleConfig(t *testing.T) {
	SetupConfig()

	req, err := http.NewRequest("GET", "/config.json", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(HandleConfig)

	// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
	// directly and pass in our Request and ResponseRecorder.
	handler.ServeHTTP(rr, req)

	// Check the status code is what we expect.
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("wrong status code: got %v want %v", status, http.StatusOK)
	}

	responseConfig := Config{}
	err = json.Unmarshal(rr.Body.Bytes(), &responseConfig)
	if err != nil {
		t.Fatalf("error unmarshalling config response: %v\n", err)
	}

	// Check the response body is what we expect.
	expectedConfig := Config{
		Local:    true,
		Protocol: "ws://",
	}
	if eq := reflect.DeepEqual(expectedConfig, responseConfig); !eq {
		t.Fatalf("expectedConfig not equal to responseConfig\nexpected:\n%v\ngot:\n%v\n",
			expectedConfig, responseConfig)
	}
}

func TestHandleCharacterCreate(t *testing.T) {
	SetupConfig()
	db, mock, err := sqlmock.New()

	if err != nil {
		t.Fatalf("an error '%s' was not expected when opening a stub database connection", err)
	}

	// set database to be our mock db
	Database = db
	defer func() {
		// we make sure that all expectations were met
		if err := mock.ExpectationsWereMet(); err != nil {
			t.Errorf("there were unfulfilled expectations: %s", err)
		}
	}()

	user := User{
		Id:       420,
		Username: "ilon",
		Password: "mask",
		FullName: "ilonmask",
	}

	testBadBody := func() {
		req, err := http.NewRequest("POST", "/characters/create", bytes.NewReader([]byte("{zz}")))
		if err != nil {
			t.Fatal(err)
		}

		rr := httptest.NewRecorder()
		handler := http.HandlerFunc(HandleCharacterCreate)

		vars := map[string]string{
			"username": user.Username,
		}

		// Hack to try to fake gorilla/mux vars
		req = mux.SetURLVars(req, vars)

		// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
		// directly and pass in our Request and ResponseRecorder.
		handler.ServeHTTP(rr, req)
		// Check the status code is what we expect.
		if status := rr.Code; status != http.StatusBadRequest {
			t.Fatalf("wrong status code: got %v want %v", status, http.StatusBadRequest)
		}
		expectedBody := `{"Message":"Could not process JSON body!"}`
		if rr.Body.String() != expectedBody {
			t.Fatalf("body not equal to expected body\nexpected:\n%v\ngot:\n%v\n",
				expectedBody, rr.Body.String())
		}

	}

	testSuccessfulCreation := func() {
		character := Character{
			CharacterId:   1,
			CharacterName: "elon",
			Attack:        420,
			Defense:       100,
			Health:        100,
			UserId:        420,
		}
		userRows := sqlmock.NewRows([]string{"id"}).AddRow(user.Id)
		mock.ExpectQuery("SELECT").WillReturnRows(userRows)

		mock.ExpectExec("INSERT INTO Characters").WithArgs(character.CharacterName, character.Attack,
			character.Defense, character.Health, character.Stamina, character.Strength,
			character.Agility, character.Wisdom, character.Charisma, user.Id).
			WillReturnResult(sqlmock.NewResult(1, 1))

		marshalledCharacter, err := json.Marshal(character)
		if err != nil {
			t.Fatalf("error marshalling character: %v", err)
		}

		req, err := http.NewRequest("POST", "/characters/create", bytes.NewReader(marshalledCharacter))
		if err != nil {
			t.Fatal(err)
		}

		rr := httptest.NewRecorder()
		handler := http.HandlerFunc(HandleCharacterCreate)


		vars := map[string]string{
			"username": user.Username,
		}

		// Hack to try to fake gorilla/mux vars
		req = mux.SetURLVars(req, vars)

		// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
		// directly and pass in our Request and ResponseRecorder.
		handler.ServeHTTP(rr, req)
		// Check the status code is what we expect.
		if status := rr.Code; status != http.StatusCreated {
			t.Errorf("wrong status code: got %v want %v", status, http.StatusOK)
		}

		expectedBody := `{"Message":"Successfully created character"}`
		if rr.Body.String() != expectedBody {
			t.Fatalf("body not equal to expected body\nexpected:\n%v\ngot:\n%v\n",
				expectedBody, rr.Body.String())
		}

	}

	testBadBody()
	testSuccessfulCreation()

}

func TestHandleUserCreate(t *testing.T) {
	SetupConfig()
	db, mock, err := sqlmock.New()

	if err != nil {
		t.Fatalf("an error '%s' was not expected when opening a stub database connection", err)
	}

	// set database to be our mock db
	Database = db
	defer func() {
		// we make sure that all expectations were met
		if err := mock.ExpectationsWereMet(); err != nil {
			t.Errorf("there were unfulfilled expectations: %s", err)
		}
	}()

	testBadBody := func() {
		req, err := http.NewRequest("POST", "/users/create", bytes.NewReader([]byte("{zz}")))
		if err != nil {
			t.Fatal(err)
		}

		rr := httptest.NewRecorder()
		handler := http.HandlerFunc(HandleUserCreate)
		// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
		// directly and pass in our Request and ResponseRecorder.
		handler.ServeHTTP(rr, req)
		// Check the status code is what we expect.
		if status := rr.Code; status != http.StatusBadRequest {
			t.Fatalf("wrong status code: got %v want %v", status, http.StatusBadRequest)
		}
		expectedBody := `{"Message":"Could not process JSON body!"}`
		if rr.Body.String() != expectedBody {
			t.Fatalf("body not equal to expected body\nexpected:\n%v\ngot:\n%v\n",
				expectedBody, rr.Body.String())
		}
	}

	testUserExists := func() {
		user := User{
			Username: "ilon",
			Password: "mask",
			FullName: "ilonmask",
		}
		rows := sqlmock.NewRows([]string{"id"}).AddRow(1)

		mock.ExpectQuery("SELECT").WillReturnRows(rows)

		marshalledUser, err := json.Marshal(user)
		if err != nil {
			t.Fatalf("error marshalling character: %v", err)
		}

		req, err := http.NewRequest("POST", "/users/create", bytes.NewReader(marshalledUser))
		if err != nil {
			t.Fatal(err)
		}

		rr := httptest.NewRecorder()
		handler := http.HandlerFunc(HandleUserCreate)
		// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
		// directly and pass in our Request and ResponseRecorder.
		handler.ServeHTTP(rr, req)
		// Check the status code is what we expect.
		if status := rr.Code; status != http.StatusConflict {
			t.Errorf("wrong status code: got %v want %v", status, http.StatusOK)
		}

		expectedBody := `{"Message":"user already exists. error: \u003cnil\u003e"}`
		if rr.Body.String() != expectedBody {
			t.Fatalf("body not equal to expected body\nexpected:\n%v\ngot:\n%v\n",
				expectedBody, rr.Body.String())
		}

	}

	testSuccessfulCreation := func() {
		user := User{
			Username: "ilon",
			Password: "mask",
			FullName: "ilonmask",
		}
		rows := sqlmock.NewRows([]string{"id"})

		mock.ExpectQuery("SELECT").WillReturnRows(rows)

		mock.ExpectExec("INSERT INTO Users").
			WillReturnResult(sqlmock.NewResult(1, 1))

		marshalledUser, err := json.Marshal(user)
		if err != nil {
			t.Fatalf("error marshalling character: %v", err)
		}

		req, err := http.NewRequest("POST", "/users/create", bytes.NewReader(marshalledUser))
		if err != nil {
			t.Fatal(err)
		}

		rr := httptest.NewRecorder()
		handler := http.HandlerFunc(HandleUserCreate)
		// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
		// directly and pass in our Request and ResponseRecorder.
		handler.ServeHTTP(rr, req)
		// Check the status code is what we expect.
		if status := rr.Code; status != http.StatusCreated {
			t.Errorf("wrong status code: got %v want %v", status, http.StatusOK)
		}

		expectedBody := `{"Message":"Successfully created user"}`
		if rr.Body.String() != expectedBody {
			t.Fatalf("body not equal to expected body\nexpected:\n%v\ngot:\n%v\n",
				expectedBody, rr.Body.String())
		}

	}

	testBadBody()
	testUserExists()
	testSuccessfulCreation()

}

func TestHandleUserExists(t *testing.T) {
	SetupConfig()
	db, mock, err := sqlmock.New()

	if err != nil {
		t.Fatalf("an error '%s' was not expected when opening a stub database connection", err)
	}

	// set database to be our mock db
	Database = db
	defer func() {
		// we make sure that all expectations were met
		if err := mock.ExpectationsWereMet(); err != nil {
			t.Errorf("there were unfulfilled expectations: %s", err)
		}
	}()

	testUserExists := func() {
		rows := sqlmock.NewRows([]string{"id", "username", "fullname"}).AddRow(420, "ilon", "ilonmask")

		mock.ExpectQuery("SELECT").WillReturnRows(rows)

		req, err := http.NewRequest("GET", "/users/ilon", nil)
		if err != nil {
			t.Fatal(err)
		}

		rr := httptest.NewRecorder()
		handler := http.HandlerFunc(HandleUserExists)
		vars := map[string]string{
			"username": "ilon",
		}

		// Hack to try to fake gorilla/mux vars
		req = mux.SetURLVars(req, vars)

		// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
		// directly and pass in our Request and ResponseRecorder.
		handler.ServeHTTP(rr, req)

		// Check the status code is what we expect.
		if status := rr.Code; status != http.StatusOK {
			t.Errorf("wrong status code: got %v want %v", status, http.StatusOK)
		}

		responseUser := User{}
		err = json.Unmarshal(rr.Body.Bytes(), &responseUser)
		if err != nil {
			t.Fatalf("error unmarshalling user response: %v\n", err)
		}

		expectedUser := User{
			Id:       420,
			Username: "ilon",
			FullName: "ilonmask",
		}
		if eq := reflect.DeepEqual(expectedUser, responseUser); !eq {
			t.Fatalf("expectedUser not equal to responseUser\nexpected:\n%v\ngot:\n%v\n",
				expectedUser, responseUser)
		}

	}

	testUserDoesNotExist := func() {
		rows := sqlmock.NewRows([]string{"id", "username", "fullname"})

		mock.ExpectQuery("SELECT").WillReturnRows(rows)

		req, err := http.NewRequest("GET", "/users/ilon", nil)
		if err != nil {
			t.Fatal(err)
		}

		rr := httptest.NewRecorder()
		handler := http.HandlerFunc(HandleUserExists)
		vars := map[string]string{
			"username": "ilon",
		}

		//Hack to try to fake gorilla/mux vars
		req = mux.SetURLVars(req, vars)

		// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
		// directly and pass in our Request and ResponseRecorder.
		handler.ServeHTTP(rr, req)

		// Check the status code is what we expect.
		if status := rr.Code; status != http.StatusNotFound {
			t.Errorf("wrong status code: got %v want %v", status, http.StatusNotFound)
		}
	}

	testUserExists()
	testUserDoesNotExist()

}

func TestHandleUserLogin(t *testing.T) {
	// Todo: how to handle bcrypt?
	//bcrypt.CompareHashAndPassword = func(a, b []byte) error {
	//	return nil
	//}
}

func TestHandleUserCharacters(t *testing.T) {
	SetupConfig()
	db, mock, err := sqlmock.New()

	if err != nil {
		t.Fatalf("an error '%s' was not expected when opening a stub database connection", err)
	}

	// set database to be our mock db
	Database = db
	defer func() {
		// we make sure that all expectations were met
		if err := mock.ExpectationsWereMet(); err != nil {
			t.Errorf("there were unfulfilled expectations: %s", err)
		}
	}()

	user := User{
		Id:       420,
		Username: "ilon",
		Password: "mask",
		FullName: "ilonmask",
	}

	character1 := Character{
		CharacterId:   1,
		CharacterName: "elon",
		Attack:        420,
		Defense:       100,
		Health:        100,
		UserId:        420,
	}
	character2 := Character{
		CharacterId:   1,
		CharacterName: "ilon",
		Attack:        69,
		Defense:       69,
		Health:        69,
		UserId:        420,
	}

	testGetCharacters := func() {

		userRows := sqlmock.NewRows([]string{"id"}).AddRow(user.Id)
		characterRows := sqlmock.NewRows([]string{"characterid", "charactername", "attack", "defense", "health",
			"uid", "stamina", "strength", "agility", "wisdom", "charisma"}).
			AddRow(character1.CharacterId, character1.CharacterName, character1.Attack,
				character1.Defense, character1.Health, character1.UserId, character1.Stamina,
				character1.Strength, character1.Agility, character1.Wisdom, character1.Charisma).
			AddRow(character2.CharacterId, character2.CharacterName, character2.Attack,
			character2.Defense, character2.Health, character2.UserId, character2.Stamina,
			character2.Strength, character2.Agility, character2.Wisdom, character2.Charisma)
		mock.ExpectQuery("SELECT").WillReturnRows(userRows)
		mock.ExpectQuery("SELECT").WillReturnRows(characterRows)

		req, err := http.NewRequest("GET", "/characters/ilon", nil)
		if err != nil {
			t.Fatal(err)
		}

		rr := httptest.NewRecorder()
		handler := http.HandlerFunc(HandleUserCharacters)

		vars := map[string]string{
			"username": user.Username,
		}

		// Hack to try to fake gorilla/mux vars
		req = mux.SetURLVars(req, vars)

		// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
		// directly and pass in our Request and ResponseRecorder.
		handler.ServeHTTP(rr, req)

		// Check the status code is what we expect.
		if status := rr.Code; status != http.StatusOK {
			t.Errorf("wrong status code: got %v want %v", status, http.StatusOK)
		}

		responseCharacters := Characters{[]Character{}}
		err = json.Unmarshal(rr.Body.Bytes(), &responseCharacters)
		if err != nil {
			t.Fatalf("error unmarshalling usercharacters response: %v\n", err)
		}

		expectedCharacters := Characters{
			Characters: []Character{character1, character2},
		}
		if eq := reflect.DeepEqual(expectedCharacters, responseCharacters); !eq {
			t.Fatalf("expectedCharacters not equal to responseCharacters\nexpected:\n%v\ngot:\n%v\n",
				expectedCharacters, responseCharacters)
		}

	}

	testUserDoesntExist := func() {

		userRows := sqlmock.NewRows([]string{"id"})

		mock.ExpectQuery("SELECT").WillReturnRows(userRows)

		req, err := http.NewRequest("GET", "/characters/ilon", nil)
		if err != nil {
			t.Fatal(err)
		}

		rr := httptest.NewRecorder()
		handler := http.HandlerFunc(HandleUserCharacters)

		vars := map[string]string{
			"username": user.Username,
		}

		// Hack to try to fake gorilla/mux vars
		req = mux.SetURLVars(req, vars)

		// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
		// directly and pass in our Request and ResponseRecorder.
		handler.ServeHTTP(rr, req)

		// Check the status code is what we expect.
		if status := rr.Code; status != http.StatusNotFound {
			t.Errorf("wrong status code: got %v want %v", status, http.StatusOK)
		}

	}

	testGetCharacters()
	testUserDoesntExist()

	//TODO find a way to test that we don't get other users characters
}
