
package main

import (
	"database/sql"
	"log"
)

// Up is executed when this migration is applied
func Up_20190714183904(txn *sql.Tx) {

	_, err := txn.Exec(	`ALTER TABLE Items
							ADD CONSTRAINT items_constraint UNIQUE (TypeRef, SubRef);`)

	if (err != nil) {
		log.Fatalf("fatal error while running items migration %v", err)
	}
}

// Down is executed when this migration is rolled back
func Down_20190714183904(txn *sql.Tx) {
	_, err := txn.Exec(`ALTER TABLE Items
							DROP CONSTRAINT items_constraint;`)
	if (err != nil) {
		log.Fatalf("fatal error while running items migration %v", err)
	}
}
