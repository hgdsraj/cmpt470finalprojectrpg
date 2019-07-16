
package main

import (
	"database/sql"
	"log"
)

// Up is executed when this migration is applied
func Up_20190715211631(txn *sql.Tx) {
	_, err := txn.Exec(	`CREATE OR REPLACE FUNCTION wep_update() RETURNS TRIGGER AS
							$BODY$
							BEGIN INSERT INTO items(typeref,subref) VALUES(1,new.id);
							RETURN new;
							END;
							$BODY$
							language plpgsql;`)

	if (err != nil) {
		log.Fatalf("fatal error while running weapons trigger migration %v", err)
	}

	_, err2 := txn.Exec(	`CREATE TRIGGER wep_update
							 AFTER INSERT ON Weapons
							 FOR EACH ROW
							 EXECUTE PROCEDURE wep_update();`)

	if (err2 != nil) {
		log.Fatalf("fatal error while running weapons trigger migration %v", err2)
	}
}

// Down is executed when this migration is rolled back
func Down_20190715211631(txn *sql.Tx) {
	_, err := txn.Exec(`DROP TRIGGER IF EXISTS wep_update ON weapons;`)
	if (err != nil) {
		log.Fatalf("fatal error while running weapons trigger migration %v", err)
	}

	_, err2 := txn.Exec(`DROP FUNCTION IF EXISTS wep_update;`)
	if (err2 != nil) {
		log.Fatalf("fatal error while running weapons trigger migration %v", err2)
	}
}
