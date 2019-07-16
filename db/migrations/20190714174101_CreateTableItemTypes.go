
package main

import (
	"database/sql"
	"log"
)

// Up is executed when this migration is applied
func Up_20190714174101(txn *sql.Tx) {
	_, err := txn.Exec(	`CREATE TABLE IF NOT EXISTS ItemTypes(
						 ID SERIAL primary key not null,
						 TypeName text not null unique
						)`)

	if err != nil {
		log.Fatalf("fatal error while running ItemTypes creation migration %v", err)
	}

	_, err2 := txn.Exec(	`INSERT INTO ItemTypes (typename) VALUES ('Weapon'), ('Armour'), ('Consumables');`)

	if (err2 != nil) {
		log.Fatalf("fatal error while running ItemTypes insertion migration %v", err2)
	}
}

// Down is executed when this migration is rolled back
func Down_20190714174101(txn *sql.Tx) {
	_, err := txn.Exec(`DROP TABLE ItemTypes`)
	if err != nil {
		log.Fatalf("fatal error while running ItemTypes migration %v", err)
	}
}
