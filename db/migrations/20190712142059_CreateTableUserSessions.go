
package main

import (
	"database/sql"
	"log"
)

// Up is executed when this migration is applied
func Up_20190712142059(txn *sql.Tx) {
	_, err := txn.Exec(	`CREATE TABLE IF NOT EXISTS UserSessions(
						 SessionKey text primary key,
						 UserID int not null, 
						 LoginTime timestamp not null,
						 LastSeenTime timestamp not null
						)`)

	if (err != nil) {
		log.Fatalf("fatal error while running users migration %v", err)
	}
}



// Down is executed when this migration is rolled back
func Down_20190712142059(txn *sql.Tx) {
	_, err := txn.Exec(`DROP TABLE UserSessions`)
	if (err != nil) {
		log.Fatalf("fatal error while running user sessiosn migration %v", err)
	}

}
