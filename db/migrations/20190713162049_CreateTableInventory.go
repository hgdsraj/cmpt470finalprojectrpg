package main

import (
	"database/sql"
	"log"
)

// Up is executed when this migration is applied
func Up_20190713162049(txn *sql.Tx) {
	_, err := txn.Exec(`CREATE TABLE IF NOT EXISTS Inventory(
						 CharacterID int not null,
						 ItemID int not null,
						 NumHeld int not null,
						 foreign key (ItemID) references Items(ID),
						 foreign key (CharacterID) references Characters(CharacterID)
						)`)

	if err != nil {
		log.Fatalf("fatal error while running inventory migration %v", err)
	}
}

// Down is executed when this migration is rolled back
func Down_20190713162049(txn *sql.Tx) {
	_, err := txn.Exec(`DROP TABLE Inventory`)
	if err != nil {
		log.Fatalf("fatal error while running inventory migration %v", err)
	}
}
