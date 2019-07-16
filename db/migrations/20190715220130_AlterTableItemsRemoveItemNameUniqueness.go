package main

import (
	"database/sql"
	"fmt"
	"log"
)

// Up is executed when this migration is applied
func Up_20190715220130(txn *sql.Tx) {
	row := txn.QueryRow(`SELECT conname
						FROM pg_constraint
						WHERE conrelid = 'items'::regclass
						AND contype = 'u' AND conname ~ '.*itemname.*'
						`)
	if row == nil {
		log.Fatalf("could not find itemname uniqueness")
	}
	var itemNameUniqueConstraint string
	err := row.Scan(&itemNameUniqueConstraint)
	if err != nil {
		log.Fatalf("fatal error while scanning item name uniqueness constraint %v", err)
	}
	_, err = txn.Exec(fmt.Sprintf(`ALTER TABLE items DROP CONSTRAINT %v;`, itemNameUniqueConstraint))

	if err != nil {
		log.Fatalf("fatal error while running item name uniqueness migration %v", err)
	}

}

// Down is executed when this migration is rolled back
func Down_20190715220130(txn *sql.Tx) {
	_, err := txn.Exec(`ALTER TABLE items
							  ADD CONSTRAINT items_itemname_key UNIQUE (typeref);
					  `)

	if err != nil {
		log.Fatalf("fatal error while running item name uniqueness migration %v", err)
	}

}
