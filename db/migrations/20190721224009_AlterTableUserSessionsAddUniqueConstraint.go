package main

import (
	"database/sql"
	"log"
)

// Up is executed when this migration is applied
func Up_20190721224009(txn *sql.Tx) {
	_, err := txn.Exec(`ALTER TABLE usersessions ADD CONSTRAINT usersessions_userid_key UNIQUE (userid);`)

	if err != nil {
		log.Fatalf("fatal error while running usersessions userid uniqueness migration %v", err)
	}
}

// Down is executed when this migration is rolled back
func Down_20190721224009(txn *sql.Tx) {
	_, err := txn.Exec(`ALTER TABLE usersessions DROP CONSTRAINT usersessions_userid_key;`)

	if err != nil {
		log.Fatalf("fatal error while running usersessions userid uniqueness migration %v", err)
	}
}
