
package main

import (
	"database/sql"
	"log"
)

// Up is executed when this migration is applied
func Up_20190522113851(txn *sql.Tx) {
	_, err := txn.Exec(`CREATE TABLE IF NOT EXISTS users(
    	id SERIAL PRIMARY KEY,
    	username TEXT NOT NULL
	)`)
	if (err != nil) {
		log.Fatalf("fatal error while running users migration %v", err)
	}
}

// Down is executed when this migration is rolled back
func Down_20190522113851(txn *sql.Tx) {
	_, err := txn.Exec(`DROP TABLE users`)
	if (err != nil) {
		log.Fatalf("fatal error while running users migration %v", err)
	}

}
