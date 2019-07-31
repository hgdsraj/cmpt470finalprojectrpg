// handlers_test.go
package handlers

import (
	"database/sql"
	"github.com/DATA-DOG/go-sqlmock"
	"github.com/gorilla/mux"
	"golang.org/x/crypto/bcrypt"
	"sfu.ca/apruner/cmpt470finalprojectrpg/helpers"
	"sfu.ca/apruner/cmpt470finalprojectrpg/shared"

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
	helpers.Database = db
	defer func() {
		// we make sure that all expectations were met
		if err := mock.ExpectationsWereMet(); err != nil {
			t.Errorf("there were unfulfilled expectations: %s", err)
		}
	}()

	user := shared.User{
		Id:       420,
		Username: "ilon",
		Password: "mask",
		FullName: "ilonmask",
	}

	testBadBody := func() {
		salt := "salt"
		sessionKey := "key"
		passwordSaltRows := sqlmock.NewRows([]string{"passwordsalt", "id"}).AddRow("salt", user.Id)
		hashedKey, err := bcrypt.GenerateFromPassword([]byte(sessionKey+salt), bcrypt.MinCost)
		if err != nil {
			t.Fatal(err)
		}
		sessionKeyRows := sqlmock.NewRows([]string{"sessionkey"}).AddRow(hashedKey)
		mock.ExpectQuery("SELECT").WillReturnRows(passwordSaltRows)
		mock.ExpectQuery("SELECT").WillReturnRows(sessionKeyRows)

		req, err := http.NewRequest("POST", "/characters/create", bytes.NewReader([]byte("{zz}")))
		if err != nil {
			t.Fatal(err)
		}

		rr := httptest.NewRecorder()
		http.SetCookie(rr, &http.Cookie{Name: "username", Value: "ilon"})
		http.SetCookie(rr, &http.Cookie{Name: "session_token", Value: sessionKey})
		req.Header = http.Header{"Cookie": rr.HeaderMap["Set-Cookie"]}

		handler := http.HandlerFunc(HandleCharacterCreate)

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
		salt := "salt"
		sessionKey := "key"
		passwordSaltRows := sqlmock.NewRows([]string{"passwordsalt", "id"}).AddRow("salt", user.Id)
		hashedKey, err := bcrypt.GenerateFromPassword([]byte(sessionKey+salt), bcrypt.MinCost)
		if err != nil {
			t.Fatal(err)
		}
		sessionKeyRows := sqlmock.NewRows([]string{"sessionkey"}).AddRow(hashedKey)
		mock.ExpectQuery("SELECT").WillReturnRows(passwordSaltRows)
		mock.ExpectQuery("SELECT").WillReturnRows(sessionKeyRows)

		character := shared.Character{
			CharacterId:   1,
			CharacterName: "elon",
			Level:         1,
			Health:        24,
			Stamina:       12,
			Strength:      10,
			Agility:       10,
			Wisdom:        11,
			Charisma:      11,
		}
		character.CalculateStats()
		userRows := sqlmock.NewRows([]string{"id"}).AddRow(user.Id)
		mock.ExpectQuery("SELECT").WillReturnRows(userRows)

		mock.ExpectExec("INSERT INTO Characters").WithArgs(character.CharacterName, character.Level, character.Attack,
			character.Defense, character.MagicAttack, character.MagicDefense, character.Health, character.Stamina,
			character.Strength, character.Agility, character.Wisdom, character.Charisma, user.Id).
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
		http.SetCookie(rr, &http.Cookie{Name: "username", Value: "ilon"})
		http.SetCookie(rr, &http.Cookie{Name: "session_token", Value: sessionKey})
		req.Header = http.Header{"Cookie": rr.HeaderMap["Set-Cookie"]}

		handler := http.HandlerFunc(HandleCharacterCreate)

		// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
		// directly and pass in our Request and ResponseRecorder.
		handler.ServeHTTP(rr, req)
		// Check the status code is what we expect.
		if status := rr.Code; status != http.StatusCreated {
			t.Errorf("wrong status code: got %v want %v", status, http.StatusCreated)
		}
		character.UserId = user.Id
		expectedBody, err := json.Marshal(character)
		if err != nil {
			t.Fatal(err)
		}
		if rr.Body.String() != string(expectedBody) {
			t.Fatalf("body not equal to expected body\nexpected:\n%v\ngot:\n%v\n",
				expectedBody, rr.Body.String())
		}

	}

	testInvalidCharacter := func() {
		salt := "salt"
		sessionKey := "key"
		passwordSaltRows := sqlmock.NewRows([]string{"passwordsalt", "id"}).AddRow("salt", user.Id)
		hashedKey, err := bcrypt.GenerateFromPassword([]byte(sessionKey+salt), bcrypt.MinCost)
		if err != nil {
			t.Fatal(err)
		}
		sessionKeyRows := sqlmock.NewRows([]string{"sessionkey"}).AddRow(hashedKey)
		mock.ExpectQuery("SELECT").WillReturnRows(passwordSaltRows)
		mock.ExpectQuery("SELECT").WillReturnRows(sessionKeyRows)

		character := shared.Character{
			CharacterId:   1,
			CharacterName: "elon",
			Level:         1,
			Health:        100,
			Stamina:       65,
			Strength:      10,
			Agility:       10,
			Wisdom:        11,
			Charisma:      11,
		}

		marshalledCharacter, err := json.Marshal(character)
		if err != nil {
			t.Fatalf("error marshalling character: %v", err)
		}

		req, err := http.NewRequest("POST", "/characters/create", bytes.NewReader(marshalledCharacter))
		if err != nil {
			t.Fatal(err)
		}

		rr := httptest.NewRecorder()
		http.SetCookie(rr, &http.Cookie{Name: "username", Value: "ilon"})
		http.SetCookie(rr, &http.Cookie{Name: "session_token", Value: sessionKey})
		req.Header = http.Header{"Cookie": rr.HeaderMap["Set-Cookie"]}

		handler := http.HandlerFunc(HandleCharacterCreate)

		// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
		// directly and pass in our Request and ResponseRecorder.
		handler.ServeHTTP(rr, req)
		// Check the status code is what we expect.
		if status := rr.Code; status != http.StatusBadRequest {
			t.Errorf("wrong status code: got %v want %v", status, http.StatusBadRequest)
		}

		expectedBody := `{"Message":"character invalid, err: stamina should be at most 16, was: 65"}`
		if rr.Body.String() != expectedBody {
			t.Fatalf("body not equal to expected body\nexpected:\n%v\ngot:\n%v\n",
				expectedBody, rr.Body.String())
		}

	}

	testAbilitiesCalculated := func() {
		salt := "salt"
		sessionKey := "key"
		passwordSaltRows := sqlmock.NewRows([]string{"passwordsalt", "id"}).AddRow("salt", user.Id)
		hashedKey, err := bcrypt.GenerateFromPassword([]byte(sessionKey+salt), bcrypt.MinCost)
		if err != nil {
			t.Fatal(err)
		}
		sessionKeyRows := sqlmock.NewRows([]string{"sessionkey"}).AddRow(hashedKey)
		mock.ExpectQuery("SELECT").WillReturnRows(passwordSaltRows)
		mock.ExpectQuery("SELECT").WillReturnRows(sessionKeyRows)

		character := shared.Character{
			CharacterId:   1,
			CharacterName: "elon",
			Level:         1,
			Health:        100,
			Stamina:       12,
			Strength:      10,
			Agility:       10,
			Wisdom:        11,
			Charisma:      11,
		}
		character.CalculateStats()
		userRows := sqlmock.NewRows([]string{"id"}).AddRow(user.Id)
		mock.ExpectQuery("SELECT").WillReturnRows(userRows)

		mock.ExpectExec("INSERT INTO Characters").WithArgs(character.CharacterName, character.Level, character.Attack,
			character.Defense, character.MagicAttack, character.MagicDefense, character.Health, character.Stamina,
			character.Strength, character.Agility, character.Wisdom, character.Charisma, user.Id).
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
		http.SetCookie(rr, &http.Cookie{Name: "username", Value: "ilon"})
		http.SetCookie(rr, &http.Cookie{Name: "session_token", Value: sessionKey})
		req.Header = http.Header{"Cookie": rr.HeaderMap["Set-Cookie"]}

		handler := http.HandlerFunc(HandleCharacterCreate)

		// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
		// directly and pass in our Request and ResponseRecorder.
		handler.ServeHTTP(rr, req)
		// Check the status code is what we expect.
		if status := rr.Code; status != http.StatusCreated {
			t.Errorf("wrong status code: got %v want %v", status, http.StatusCreated)
		}

		responseCharacter := shared.Character{}
		err = json.Unmarshal(rr.Body.Bytes(), responseCharacter)
		if err != nil {
			return
		}
		if responseCharacter.Attack != 3 {
			t.Fatalf("responseCharacter.Attack should be equal to %v, was %v", 3,
				responseCharacter.Attack)
		} else if responseCharacter.Defense != 4 {
			t.Fatalf("character.Defense should be equal to %v, was %v", 4,
				responseCharacter.Defense)
		} else if responseCharacter.MagicAttack != 4 {
			t.Fatalf("character.Attack should be equal to %v, was %v", 3,
				responseCharacter.MagicAttack)
		} else if responseCharacter.MagicDefense != 4 {
			t.Fatalf("character.MagicDefense should be equal to %v, was %v", 3,
				responseCharacter.MagicDefense)
		}

	}

	testBadBody()
	testSuccessfulCreation()
	testInvalidCharacter()
	testAbilitiesCalculated()

}

func TestHandleUserCreate(t *testing.T) {
	SetupConfig()
	db, mock, err := sqlmock.New()

	if err != nil {
		t.Fatalf("an error '%s' was not expected when opening a stub database connection", err)
	}

	// set database to be our mock db
	Database = db
	helpers.Database = db
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
		user := shared.User{
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
		user := shared.User{
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
	helpers.Database = db
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

		responseUser := shared.User{}
		err = json.Unmarshal(rr.Body.Bytes(), &responseUser)
		if err != nil {
			t.Fatalf("error unmarshalling user response: %v\n", err)
		}

		expectedUser := shared.User{
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
	SetupConfig()
	db, mock, err := sqlmock.New()

	if err != nil {
		t.Fatalf("an error '%s' was not expected when opening a stub database connection", err)
	}

	// set database to be our mock db
	Database = db
	helpers.Database = db
	defer func() {
		// we make sure that all expectations were met
		if err := mock.ExpectationsWereMet(); err != nil {
			t.Errorf("there were unfulfilled expectations: %s", err)
		}
	}()

	user := shared.User{
		Id:       420,
		Username: "ilon",
		Password: "mask",
		FullName: "ilonmask",
	}

	salt := "salt"
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password+salt), bcrypt.MinCost)
	if err != nil {
		t.Fatal(err)
	}

	passwordSaltRows := sqlmock.NewRows([]string{"id", "username", "fullname", "passwordhash", "passwordsalt"}).
		AddRow(user.Id, user.Username, user.FullName, hashedPassword, salt)
	mock.ExpectQuery("SELECT").WillReturnRows(passwordSaltRows)
	mock.ExpectQuery("SELECT").WillReturnError(sql.ErrNoRows)
	mock.ExpectExec("INSERT").WillReturnResult(sqlmock.NewResult(1, 1))

	marshalledUser, err := json.Marshal(user)
	if err != nil {
		t.Fatal(err)
	}

	req, err := http.NewRequest("GET", "/users/login", bytes.NewReader(marshalledUser))
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	req.Header = http.Header{"Cookie": rr.HeaderMap["Set-Cookie"]}

	handler := http.HandlerFunc(HandleUserLogin)

	// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
	// directly and pass in our Request and ResponseRecorder.
	handler.ServeHTTP(rr, req)

	// Check the status code is what we expect.
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("wrong status code: got %v want %v", status, http.StatusOK)
	}
	responseUser := shared.User{}

	err = json.Unmarshal(rr.Body.Bytes(), &responseUser)
	if err != nil {
		t.Fatalf("error unmarshalling user login response: %v\n", err)
	}

	expectedUser := shared.User{
		Id:       user.Id,
		Username: user.Username,
		Password: "",
		FullName: user.FullName,
	}
	if eq := reflect.DeepEqual(expectedUser, responseUser); !eq {
		t.Fatalf("expectedUser not equal to responseUser\nexpected:\n%v\ngot:\n%v\n",
			expectedUser, responseUser)
	}
}

func TestHandleUserCharacters(t *testing.T) {
	SetupConfig()
	db, mock, err := sqlmock.New()

	if err != nil {
		t.Fatalf("an error '%s' was not expected when opening a stub database connection", err)
	}

	// set database to be our mock db
	Database = db
	helpers.Database = db
	defer func() {
		// we make sure that all expectations were met
		if err := mock.ExpectationsWereMet(); err != nil {
			t.Errorf("there were unfulfilled expectations: %s", err)
		}
	}()

	user := shared.User{
		Id:       420,
		Username: "ilon",
		Password: "mask",
		FullName: "ilonmask",
	}

	character1 := shared.Character{
		CharacterId:   1,
		CharacterName: "elon",
		Attack:        420,
		Defense:       100,
		Health:        100,
		UserId:        420,
	}
	character2 := shared.Character{
		CharacterId:   1,
		CharacterName: "ilon",
		Attack:        69,
		Defense:       69,
		Health:        69,
		UserId:        420,
	}

	testGetCharacters := func() {
		salt := "salt"
		sessionKey := "key"
		passwordSaltRows := sqlmock.NewRows([]string{"passwordsalt", "id"}).AddRow("salt", user.Id)
		hashedKey, err := bcrypt.GenerateFromPassword([]byte(sessionKey+salt), bcrypt.MinCost)
		if err != nil {
			t.Fatal(err)
		}
		sessionKeyRows := sqlmock.NewRows([]string{"sessionkey"}).AddRow(hashedKey)
		mock.ExpectQuery("SELECT").WillReturnRows(passwordSaltRows)
		mock.ExpectQuery("SELECT").WillReturnRows(sessionKeyRows)

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

		req, err := http.NewRequest("GET", "/characters/", nil)
		if err != nil {
			t.Fatal(err)
		}

		rr := httptest.NewRecorder()
		http.SetCookie(rr, &http.Cookie{Name: "username", Value: "ilon"})
		http.SetCookie(rr, &http.Cookie{Name: "session_token", Value: sessionKey})
		req.Header = http.Header{"Cookie": rr.HeaderMap["Set-Cookie"]}

		handler := http.HandlerFunc(HandleUserCharacters)

		// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
		// directly and pass in our Request and ResponseRecorder.
		handler.ServeHTTP(rr, req)

		// Check the status code is what we expect.
		if status := rr.Code; status != http.StatusOK {
			t.Errorf("wrong status code: got %v want %v", status, http.StatusOK)
		}

		responseCharacters := shared.Characters{[]shared.Character{}}
		err = json.Unmarshal(rr.Body.Bytes(), &responseCharacters)
		if err != nil {
			t.Fatalf("error unmarshalling usercharacters response: %v\n", err)
		}

		expectedCharacters := shared.Characters{
			Characters: []shared.Character{character1, character2},
		}
		if eq := reflect.DeepEqual(expectedCharacters, responseCharacters); !eq {
			t.Fatalf("expectedCharacters not equal to responseCharacters\nexpected:\n%v\ngot:\n%v\n",
				expectedCharacters, responseCharacters)
		}

	}

	testUserDoesntExist := func() {
		salt := "salt"
		sessionKey := "key"
		passwordSaltRows := sqlmock.NewRows([]string{"passwordsalt", "id"}).AddRow("salt", user.Id)
		hashedKey, err := bcrypt.GenerateFromPassword([]byte(sessionKey+salt), bcrypt.MinCost)
		if err != nil {
			t.Fatal(err)
		}
		sessionKeyRows := sqlmock.NewRows([]string{"sessionkey"}).AddRow(hashedKey)
		mock.ExpectQuery("SELECT").WillReturnRows(passwordSaltRows)
		mock.ExpectQuery("SELECT").WillReturnRows(sessionKeyRows)

		userRows := sqlmock.NewRows([]string{"id"})

		mock.ExpectQuery("SELECT").WillReturnRows(userRows)

		req, err := http.NewRequest("GET", "/characters/", nil)
		if err != nil {
			t.Fatal(err)
		}

		rr := httptest.NewRecorder()
		http.SetCookie(rr, &http.Cookie{Name: "username", Value: "ilon"})
		http.SetCookie(rr, &http.Cookie{Name: "session_token", Value: sessionKey})
		req.Header = http.Header{"Cookie": rr.HeaderMap["Set-Cookie"]}

		handler := http.HandlerFunc(HandleUserCharacters)

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

func TestHandleUserLogout(t *testing.T) {
	SetupConfig()
	db, mock, err := sqlmock.New()

	if err != nil {
		t.Fatalf("an error '%s' was not expected when opening a stub database connection", err)
	}

	// set database to be our mock db
	Database = db
	helpers.Database = db
	defer func() {
		// we make sure that all expectations were met
		if err := mock.ExpectationsWereMet(); err != nil {
			t.Errorf("there were unfulfilled expectations: %s", err)
		}
	}()

	user := shared.User{
		Id:       420,
		Username: "ilon",
		Password: "mask",
		FullName: "ilonmask",
	}

	testSuccessfulLogout := func() {
		salt := "salt"
		sessionKey := "key"
		passwordSaltRows := sqlmock.NewRows([]string{"passwordsalt", "id"}).AddRow("salt", user.Id)
		hashedKey, err := bcrypt.GenerateFromPassword([]byte(sessionKey+salt), bcrypt.MinCost)
		if err != nil {
			t.Fatal(err)
		}
		sessionKeyRows := sqlmock.NewRows([]string{"sessionkey"}).AddRow(hashedKey)
		mock.ExpectQuery("SELECT").WillReturnRows(passwordSaltRows)
		mock.ExpectQuery("SELECT").WillReturnRows(sessionKeyRows)

		req, err := http.NewRequest("POST", "/users/logout", nil)
		if err != nil {
			t.Fatal(err)
		}

		rr := httptest.NewRecorder()
		http.SetCookie(rr, &http.Cookie{Name: "username", Value: "ilon"})
		http.SetCookie(rr, &http.Cookie{Name: "session_token", Value: sessionKey})
		req.Header = http.Header{"Cookie": rr.HeaderMap["Set-Cookie"]}

		handler := http.HandlerFunc(HandleUserLogout)

		// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
		// directly and pass in our Request and ResponseRecorder.
		handler.ServeHTTP(rr, req)
		// Check the status code is what we expect.
		if status := rr.Code; status != http.StatusOK {
			t.Errorf("wrong status code: got %v want %v", status, http.StatusCreated)
		}

		expectedBody, err := json.Marshal(shared.Response{"User logged out successfully"})
		if err != nil {
			t.Fatal(err)
		}
		if rr.Body.String() != string(expectedBody) {
			t.Fatalf("body not equal to expected body\nexpected:\n%v\ngot:\n%v\n",
				expectedBody, rr.Body.String())
		}
	}
	testSuccessfulLogout()
}
