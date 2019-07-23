package main

import (
	"database/sql"
	"log"
)

// Up is executed when this migration is applied
func Up_20190718122322(txn *sql.Tx) {

	_, err := txn.Exec(`ALTER TABLE characters
						ADD COLUMN stamina INT NOT NULL DEFAULT 0,
						ADD COLUMN strength INT NOT NULL DEFAULT 0,
						ADD COLUMN agility INT NOT NULL DEFAULT 0,
						ADD COLUMN wisdom INT NOT NULL DEFAULT 0,
						ADD COLUMN charisma INT NOT NULL DEFAULT 0,
						ADD COLUMN magic_attack INT NOT NULL DEFAULT 0,
						ADD COLUMN magic_defense INT NOT NULL DEFAULT 0
						`)

	if err != nil {
		log.Fatalf("fatal error while running characters abilities migration %v", err)
	}

}

// Down is executed when this migration is rolled back
func Down_20190718122322(txn *sql.Tx) {
	_, err := txn.Exec(`ALTER TABLE characters
						DROP COLUMN stamina,
						DROP COLUMN strength,
						DROP COLUMN agility,
						DROP COLUMN wisdom,
						DROP COLUMN charisma,
						DROP COLUMN magic_attack,
						DROP COLUMN magic_defense
						`)
	if err != nil {
		log.Fatalf("fatal error while running characters abilities migration %v", err)
	}

}
