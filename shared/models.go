package shared

import (
	"fmt"
	"math"
)

type User struct {
	Id       int    `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
	FullName string `json:"full_name"`
}

type Character struct {
	CharacterId   int    `json:"id"`
	CharacterName string `json:"name"`
	Level         int    `json:"level"`
	Attack        int    `json:"attack"`
	Defense       int    `json:"defense"`
	MagicAttack   int    `json:"magic_attack"`
	MagicDefense  int    `json:"magic_defense"`
	Health        int    `json:"health"`
	Stamina       int    `json:"stamina"`
	Strength      int    `json:"strength"`
	Agility       int    `json:"agility"`
	Wisdom        int    `json:"wisdom"`
	Charisma      int    `json:"charisma"`
	UserId        int    `json:"uid"`
}

type Characters struct {
	Characters []Character `json:"characters"`
}

type Item struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
	Type string `json:"type"`
}

type Response struct {
	Message string
}

var MinNewCharacter = Character{
	Attack:   5,
	Defense:  4,
	Health:   25,
	Stamina:  12,
	Strength: 10,
	Agility:  10,
	Wisdom:   11,
	Charisma: 11,
}

var MaxNewCharacter = Character{
	Attack:       5,
	Defense:      4,
	MagicDefense: 4,
	MagicAttack:  4,
	Health:       25,
	Stamina:      16,
	Strength:     14,
	Agility:      14,
	Wisdom:       15,
	Charisma:     15,
}

var MAX_NEW_CHARACTER_ATTRIBUTE_SUM = 64

func (c *Character) CalculateStats() {
	c.Attack = int(math.Round(float64(c.Strength) / 3))
	c.Defense = int(math.Round(float64(c.Stamina+c.Agility) / 6))
	c.MagicAttack = int(math.Round(float64(c.Wisdom) / 3))
	c.MagicDefense = int(math.Round(float64(c.Stamina+c.Wisdom) / 6))
	return
}

func (c *Character) Validate() (err error) {
	if c.Stamina < MinNewCharacter.Stamina {
		return fmt.Errorf("stamina should be at least %v, was: %v", MinNewCharacter.Stamina, c.Stamina)
	} else if c.Strength < MinNewCharacter.Strength {
		return fmt.Errorf("strength should be at least %v, was: %v", MinNewCharacter.Strength, c.Strength)
	} else if c.Agility < MinNewCharacter.Agility {
		return fmt.Errorf("agility should be at least %v, was: %v", MinNewCharacter.Agility, c.Agility)
	} else if c.Wisdom < MinNewCharacter.Wisdom {
		return fmt.Errorf("wisdom should be at least %v, was: %v", MinNewCharacter.Wisdom, c.Wisdom)
	} else if c.Charisma < MinNewCharacter.Charisma {
		return fmt.Errorf("charisma should be at least %v, was: %v", MinNewCharacter.Charisma, c.Charisma)
	}

	if c.Stamina > MaxNewCharacter.Stamina {
		return fmt.Errorf("stamina should be at most %v, was: %v", MaxNewCharacter.Stamina, c.Stamina)
	} else if c.Strength > MaxNewCharacter.Strength {
		return fmt.Errorf("strength should be at most %v, was: %v", MaxNewCharacter.Strength, c.Strength)
	} else if c.Agility > MaxNewCharacter.Agility {
		return fmt.Errorf("agility should be at most %v, was: %v", MaxNewCharacter.Agility, c.Agility)
	} else if c.Wisdom > MaxNewCharacter.Wisdom {
		return fmt.Errorf("wisdom should be at most %v, was: %v", MaxNewCharacter.Wisdom, c.Wisdom)
	} else if c.Charisma > MaxNewCharacter.Charisma {
		return fmt.Errorf("charisma should be at most %v, was: %v", MaxNewCharacter.Charisma, c.Charisma)
	}

	if sum := c.Stamina + c.Strength + c.Agility + c.Wisdom + c.Charisma; sum > MAX_NEW_CHARACTER_ATTRIBUTE_SUM {
		return fmt.Errorf("sum of stamina, strength, agility, wisdom, and charisma "+
			"should be less than %v, was: %v", MAX_NEW_CHARACTER_ATTRIBUTE_SUM, sum)
	}

	return
}
