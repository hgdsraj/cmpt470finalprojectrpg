
package main

import (
	"database/sql"
	"log"
)

// Up is executed when this migration is applied
func Up_20190714180049(txn *sql.Tx) {
	_, err := txn.Exec(	`CREATE TABLE IF NOT EXISTS Armour(
						 ID SERIAL primary key not null,
						 Name text not null unique,
						 Defense int not null,
						 Weight int not null
						)`)

	if (err != nil) {
		log.Fatalf("fatal error while running items migration %v", err)
	}
}

// Down is executed when this migration is rolled back
func Down_20190714180049(txn *sql.Tx) {
	_, err := txn.Exec(`DROP TABLE Armour`)
	if (err != nil) {
		log.Fatalf("fatal error while running items migration %v", err)
	}
}
