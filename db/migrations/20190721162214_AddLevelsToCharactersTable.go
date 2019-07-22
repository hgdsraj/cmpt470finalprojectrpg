package main

import (
	"database/sql"
	"log"
)

// Up is executed when this migration is applied
func Up_20190721162214(txn *sql.Tx) {
	_, err := txn.Exec(`ALTER TABLE characters
						ADD COLUMN characterlevel INT NOT NULL DEFAULT 1
						`)

	if err != nil {
		log.Fatalf("fatal error while running characters levels migration %v", err)
	}
}

// Down is executed when this migration is rolled back
func Down_20190721162214(txn *sql.Tx) {
	_, err := txn.Exec(`ALTER TABLE characters
						DROP COLUMN characterlevel
						`)

	if err != nil {
		log.Fatalf("fatal error while running characters levels migration %v", err)
	}
}
