package transactions

import (
	"database/sql"
	"log"
	"fmt"

	"sfu.ca/apruner/cmpt470finalprojectrpg/shared"
)

var Database *sql.DB

func RunTransactions() {
	PopulateNPCsTable()
}

func handleError(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func PopulateNPCsTable() {
	// More NPCs can be added later
	npcs := shared.NPCs{[]shared.NPC{}}

	npc1 := shared.NPC {
		Id:           1,
		Name:         "Goblin",
		Type:         "Monster",
		Level:        1,
		Description:  "A goblin",
		Attack:       5,
		Defense:      4,
		Health:       20,
		MagicAttack:  6,
		MagicDefense: 3,
	}

	npc2 := shared.NPC {
		Id:           1,
		Name:         "Zombie",
		Type:         "Monster",
		Level:        2,
		Description:  "A Zombie",
		Attack:       7,
		Defense:      6,
		Health:       25,
		MagicAttack:  6,
		MagicDefense: 6,
	}

	npc3 := shared.NPC {
		Id:           1,
		Name:         "Imp",
		Type:         "Monster",
		Level:        3,
		Description:  "An Imp",
		Attack:       7,
		Defense:      8,
		Health:       30,
		MagicAttack:  10,
		MagicDefense: 8,
	}

	npcs.NPCs = append(npcs.NPCs, npc1)
	npcs.NPCs = append(npcs.NPCs, npc2)
	npcs.NPCs = append(npcs.NPCs, npc3)

	for _, npc := range npcs.NPCs {
		sqlStatement := `
		INSERT INTO npcs(name, type, level, description, attack, defense, health, magic_attack, magic_defense)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`
		_, err := Database.Exec(sqlStatement, npc.Name, npc.Type, npc.Level, npc.Description, npc.Attack, 
			npc.Defense, npc.Health, npc.MagicAttack, npc.MagicDefense)
		if err != nil {
			strErr := fmt.Sprintf("Could not insert into database error: %v", err)
			log.Println(strErr)
		}
	}

	log.Printf("Finished populating npcs table.")
}