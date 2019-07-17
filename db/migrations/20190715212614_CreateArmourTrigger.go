package main

import (
	"database/sql"
	"log"
)

// Up is executed when this migration is applied
func Up_20190715212614(txn *sql.Tx) {
	_, err := txn.Exec(`CREATE OR REPLACE FUNCTION arm_update() RETURNS TRIGGER AS
							$BODY$
							BEGIN INSERT INTO items(typeref,subref) VALUES(2,new.id);
							RETURN new;
							END;
							$BODY$
							language plpgsql;`)

	if err != nil {
		log.Fatalf("fatal error while running armour trigger migration %v", err)
	}

	_, err2 := txn.Exec(`CREATE TRIGGER arm_update
							 AFTER INSERT ON Armour
							 FOR EACH ROW
							 EXECUTE PROCEDURE arm_update();`)

	if err2 != nil {
		log.Fatalf("fatal error while running armour trigger migration %v", err2)
	}
}

// Down is executed when this migration is rolled back
func Down_20190715212614(txn *sql.Tx) {
	_, err := txn.Exec(`DROP TRIGGER IF EXISTS arm_update ON armour;`)
	if err != nil {
		log.Fatalf("fatal error while running armour trigger migration %v", err)
	}

	_, err2 := txn.Exec(`DROP FUNCTION IF EXISTS arm_update;`)
	if err2 != nil {
		log.Fatalf("fatal error while running armour trigger migration %v", err2)
	}
}
