
package main

import (
	"database/sql"
	"log"
)

// Up is executed when this migration is applied
func Up_20190715213308(txn *sql.Tx) {
	_, err := txn.Exec(	`CREATE OR REPLACE FUNCTION consum_update() RETURNS TRIGGER AS
							$BODY$
							BEGIN INSERT INTO items(typeref,subref) VALUES(3,new.id);
							RETURN new;
							END;
							$BODY$
							language plpgsql;`)

	if err != nil {
		log.Fatalf("fatal error while running consumable trigger migration %v", err)
	}

	_, err2 := txn.Exec(	`CREATE TRIGGER consum_update
							 AFTER INSERT ON Consumables
							 FOR EACH ROW
							 EXECUTE PROCEDURE consum_update();`)

	if err2 != nil {
		log.Fatalf("fatal error while running consumable trigger migration %v", err2)
	}
}

// Down is executed when this migration is rolled back
func Down_20190715213308(txn *sql.Tx) {
	_, err := txn.Exec(`DROP TRIGGER IF EXISTS consum_update ON consumables;`)
	if err != nil {
		log.Fatalf("fatal error while running consumable trigger migration %v", err)
	}

	_, err2 := txn.Exec(`DROP FUNCTION IF EXISTS consum_update;`)
	if err2 != nil {
		log.Fatalf("fatal error while running consumable trigger migration %v", err2)
	}
}
