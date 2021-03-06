package main

import (
	"database/sql"
	"log"
)

// Up is executed when this migration is applied
func Up_20190714180311(txn *sql.Tx) {
	_, err := txn.Exec(`CREATE TABLE IF NOT EXISTS Consumables(
						 ID SERIAL primary key not null,
						 Name text not null unique,
						 Healing int,
						 Damage int
						)`)

	if err != nil {
		log.Fatalf("fatal error while running consumables migration %v", err)
	}
}

// Down is executed when this migration is rolled back
func Down_20190714180311(txn *sql.Tx) {
	_, err := txn.Exec(`DROP TABLE Consumables`)
	if err != nil {
		log.Fatalf("fatal error while running consumables migration %v", err)
	}
}
