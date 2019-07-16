
package main

import (
	"database/sql"
	"log"
)

// Up is executed when this migration is applied
func Up_20190713160546(txn *sql.Tx) {
	_, err := txn.Exec(	`CREATE TABLE IF NOT EXISTS Items(
						 ID SERIAL primary key not null,
						 ItemName text not null,
						 ItemType text not null
						)`)

	if (err != nil) {
		log.Fatalf("fatal error while running items migration %v", err)
	}
}

// Down is executed when this migration is rolled back
func Down_20190713160546(txn *sql.Tx) {
	_, err := txn.Exec(`DROP TABLE Items`)
	if (err != nil) {
		log.Fatalf("fatal error while running items migration %v", err)
	}
}
