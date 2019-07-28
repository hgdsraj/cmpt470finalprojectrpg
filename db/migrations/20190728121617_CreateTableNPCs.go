package main

import (
	"database/sql"
	"log"
)

// Up is executed when this migration is applied
func Up_20190728121617(txn *sql.Tx) {
	_, err := txn.Exec(`CREATE TABLE IF NOT EXISTS NPCs(
		NPCID SERIAL primary key not null,
		NPCName text not null unique,
		NPCType text not null,
		Level int not null,
		Description text not null,
		Attack int not null,
		Defense int not null,
		Health int not null,
		Magic_Attack int not null,
		Magic_Defense int not null
	 )`)

	if err != nil {
		log.Fatalf("fatal error while running NPC migration %v", err)
	}
}

// Down is executed when this migration is rolled back
func Down_20190728121617(txn *sql.Tx) {
	_, err := txn.Exec(`DROP TABLE NPCs`)
	if err != nil {
		log.Fatalf("fatal error while running NPC migration %v", err)
	}
}
