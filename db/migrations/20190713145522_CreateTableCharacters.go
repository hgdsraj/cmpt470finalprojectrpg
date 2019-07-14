
package main

import (
	"database/sql"
	"log"
)

// Up is executed when this migration is applied
func Up_20190713145522(txn *sql.Tx) {
	_, err := txn.Exec(	`CREATE TABLE IF NOT EXISTS Characters(
						 CharacterID SERIAL primary key not null,
						 CharacterName text not null unique,
						 Attack int not null,
						 Defense int not null,
						 Health int not null,
						 UserID int not null,
						 foreign key (UserID) references USERS(ID)
						)`)

	if (err != nil) {
		log.Fatalf("fatal error while running characters migration %v", err)
	}
}

// Down is executed when this migration is rolled back
func Down_20190713145522(txn *sql.Tx) {
	_, err := txn.Exec(`DROP TABLE Characters`)
	if (err != nil) {
		log.Fatalf("fatal error while running characters migration %v", err)
	}
}
