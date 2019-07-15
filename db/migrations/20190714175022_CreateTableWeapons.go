
package main

import (
	"database/sql"
	"log"
)

// Up is executed when this migration is applied
func Up_20190714175022(txn *sql.Tx) {
	_, err := txn.Exec(	`CREATE TABLE IF NOT EXISTS Weapons(
						 ID SERIAL primary key not null,
						 Name text not null unique,
						 Damage int not null,
						 Speed int not null,
						 CritChance int not null
						)`)

	if (err != nil) {
		log.Fatalf("fatal error while running items migration %v", err)
	}
}

// Down is executed when this migration is rolled back
func Down_20190714175022(txn *sql.Tx) {
	_, err := txn.Exec(`DROP TABLE Weapons`)
	if (err != nil) {
		log.Fatalf("fatal error while running items migration %v", err)
	}
}
