package main

import (
	"database/sql"
	"log"
)

// Up is executed when this migration is applied
func Up_20190714170534(txn *sql.Tx) {
	_, err := txn.Exec(`ALTER TABLE Items
							ALTER COLUMN ItemName TYPE int USING (ItemName::integer);
							ALTER TABLE Items
							ALTER COLUMN ItemType TYPE int USING (ItemType::integer);
							ALTER TABLE Items
							RENAME COLUMN ItemName TO TypeRef;
							ALTER TABLE Items
							RENAME COLUMN ItemType TO SubRef;
						`)

	if err != nil {
		log.Fatalf("fatal error while running alter columns in items  migration %v", err)
	}

}

// Down is executed when this migration is rolled back
func Down_20190714170534(txn *sql.Tx) {
	// Alter columns back to what they were before
	_, err := txn.Exec(`ALTER TABLE Items
							ALTER COLUMN TypeRef TYPE text USING (TypeRef::text);
							ALTER TABLE Items
							ALTER COLUMN SubRef TYPE text USING (SubRef::text);
							ALTER TABLE Items
							RENAME COLUMN TypeRef TO ItemName;
							ALTER TABLE Items
							RENAME COLUMN SubRef TO ItemType;
						`)
	if err != nil {
		log.Fatalf("fatal error while running alter columns in items migration %v", err)
	}
}
