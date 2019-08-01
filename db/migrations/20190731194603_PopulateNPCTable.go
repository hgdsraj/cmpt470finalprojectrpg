
package main

import (
	"database/sql"
	"log"
)

// copied from models in case they are changed in the future
type NPC struct {
	Id           int    `json:"id"`
	Name         string `json:"name"`
	Type         string `json:"type"`
	Level        int    `json:"level"`
	Description  string `json:"description"`
	Attack       int    `json:"attack"`
	Defense      int    `json:"defense"`
	Health       int    `json:"health"`
	MagicAttack  int    `json:"magic_attack"`
	MagicDefense int    `json:"magic_defense"`
}

type NPCs struct {
	NPCs []NPC `json:"npcs"`
}

var npcs = NPCs{[]NPC{}}

var npc1 = NPC{
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

var npc2 = NPC{
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

var npc3 = NPC{
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

func AppendNPCs() {
	npcs.NPCs = append(npcs.NPCs, npc1)
	npcs.NPCs = append(npcs.NPCs, npc2)
	npcs.NPCs = append(npcs.NPCs, npc3)
}

// Up is executed when this migration is applied
func Up_20190731194603(txn *sql.Tx) {
	AppendNPCs()
	sqlStatement := `INSERT INTO npcs(name, type, level, description, attack, defense, health, magic_attack, magic_defense)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`
	for _, npc := range npcs.NPCs {
		_, err := txn.Exec(sqlStatement, npc.Name, npc.Type, npc.Level, npc.Description, npc.Attack,
			npc.Defense, npc.Health, npc.MagicAttack, npc.MagicDefense)

		if err != nil {
			log.Fatalf("fatal error while running consumables migration %v", err)
		}
	}
}

// Down is executed when this migration is rolled back
func Down_20190731194603(txn *sql.Tx) {
	AppendNPCs()
	sqlStatement := `DELETE FROM npcs WHERE name = $1;`
	for _, npc := range npcs.NPCs {
		_, err := txn.Exec(sqlStatement, npc.Name)

		if err != nil {
			log.Fatalf("fatal error while running consumables migration %v", err)
		}
	}
}
