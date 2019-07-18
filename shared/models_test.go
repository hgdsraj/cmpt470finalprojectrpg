package shared

import (
	"fmt"
	"testing"
)

func TestCharacter_Validate(t *testing.T) {
	validCharacter := func() {
		character := Character{
			CharacterId:   1,
			CharacterName: "elon",
			Attack:        420,
			Defense:       100,
			Health:        100,
			Stamina:       12,
			Strength:      10,
			Agility:       10,
			Wisdom:        11,
			Charisma:      11,
		}
		err := character.Validate()
		if err != nil {
			t.Fatalf("expected valid character, got: %v", err)
		}

	}
	sumTooHigh := func() {
		character := Character{
			CharacterId:   1,
			CharacterName: "elon",
			Attack:        420,
			Defense:       100,
			Health:        100,
			Stamina:       MaxNewCharacter.Stamina,
			Strength:      MaxNewCharacter.Strength,
			Agility:       MaxNewCharacter.Agility,
			Wisdom:        MaxNewCharacter.Wisdom,
			Charisma:      MaxNewCharacter.Charisma,
		}
		err := character.Validate()
		if err == nil {
			t.Fatalf("Expected an error, got nil")
		}

		expectedErr := fmt.Sprintf("sum of stamina, strength, agility, wisdom, and " +
			"charisma should be less than %v, was: 74", MAX_CHARACTER_ATTRIBUTE_SUM)
		if err.Error() != expectedErr {
			t.Fatalf("error not equal to expected error\nexpected:\n%v\ngot:\n%v\n",
				expectedErr, err)
		}
	}
	staminaTooHigh := func() {
		character := Character{
			CharacterId:   1,
			CharacterName: "elon",
			Attack:        420,
			Defense:       100,
			Health:        100,
			Stamina:       MaxNewCharacter.Stamina + 1,
			Strength:      MaxNewCharacter.Strength,
			Agility:       MaxNewCharacter.Agility,
			Wisdom:        MaxNewCharacter.Wisdom,
			Charisma:      MaxNewCharacter.Charisma,
		}
		err := character.Validate()
		if err == nil {
			t.Fatalf("Expected an error, got nil")
		}

		expectedErr := fmt.Sprintf("stamina should be at most %v, was: %v", MaxNewCharacter.Stamina,
			character.Stamina)
		if err.Error() != expectedErr {
			t.Fatalf("error not equal to expected error\nexpected:\n%v\ngot:\n%v\n",
				expectedErr, err)
		}
	}
	strengthTooHigh := func() {
		character := Character{
			CharacterId:   1,
			CharacterName: "elon",
			Attack:        420,
			Defense:       100,
			Health:        100,
			Stamina:       MaxNewCharacter.Stamina,
			Strength:      MaxNewCharacter.Strength + 1,
			Agility:       MaxNewCharacter.Agility,
			Wisdom:        MaxNewCharacter.Wisdom,
			Charisma:      MaxNewCharacter.Charisma,
		}
		err := character.Validate()
		if err == nil {
			t.Fatalf("Expected an error, got nil")
		}

		expectedErr := fmt.Sprintf("strength should be at most %v, was: %v", MaxNewCharacter.Strength,
			character.Strength)
		if err.Error() != expectedErr {
			t.Fatalf("error not equal to expected error\nexpected:\n%v\ngot:\n%v\n",
				expectedErr, err)
		}
	}
	agilityTooHigh := func() {
		character := Character{
			CharacterId:   1,
			CharacterName: "elon",
			Attack:        420,
			Defense:       100,
			Health:        100,
			Stamina:       MaxNewCharacter.Stamina,
			Strength:      MaxNewCharacter.Strength,
			Agility:       MaxNewCharacter.Agility + 1,
			Wisdom:        MaxNewCharacter.Wisdom,
			Charisma:      MaxNewCharacter.Charisma,
		}
		err := character.Validate()
		if err == nil {
			t.Fatalf("Expected an error, got nil")
		}

		expectedErr := fmt.Sprintf("agility should be at most %v, was: %v", MaxNewCharacter.Agility,
			character.Agility)
		if err.Error() != expectedErr {
			t.Fatalf("error not equal to expected error\nexpected:\n%v\ngot:\n%v\n",
				expectedErr, err)
		}
	}
	wisdomTooHigh := func() {
		character := Character{
			CharacterId:   1,
			CharacterName: "elon",
			Attack:        420,
			Defense:       100,
			Health:        100,
			Stamina:       MaxNewCharacter.Stamina,
			Strength:      MaxNewCharacter.Strength,
			Agility:       MaxNewCharacter.Agility,
			Wisdom:        MaxNewCharacter.Wisdom + 1,
			Charisma:      MaxNewCharacter.Charisma,
		}
		err := character.Validate()
		if err == nil {
			t.Fatalf("Expected an error, got nil")
		}

		expectedErr := fmt.Sprintf("wisdom should be at most %v, was: %v", MaxNewCharacter.Wisdom,
			character.Wisdom)
		if err.Error() != expectedErr {
			t.Fatalf("error not equal to expected error\nexpected:\n%v\ngot:\n%v\n",
				expectedErr, err)
		}
	}
	charismaTooHigh := func() {
		character := Character{
			CharacterId:   1,
			CharacterName: "elon",
			Attack:        420,
			Defense:       100,
			Health:        100,
			Stamina:       MaxNewCharacter.Stamina,
			Strength:      MaxNewCharacter.Strength,
			Agility:       MaxNewCharacter.Agility,
			Wisdom:        MaxNewCharacter.Wisdom,
			Charisma:      MaxNewCharacter.Charisma + 1,
		}
		err := character.Validate()
		if err == nil {
			t.Fatalf("Expected an error, got nil")
		}

		expectedErr := fmt.Sprintf("charisma should be at most %v, was: %v", MaxNewCharacter.Charisma,
			character.Charisma)
		if err.Error() != expectedErr {
			t.Fatalf("error not equal to expected error\nexpected:\n%v\ngot:\n%v\n",
				expectedErr, err)
		}
	}
	staminaTooLow := func() {
		character := Character{
			CharacterId:   1,
			CharacterName: "elon",
			Attack:        420,
			Defense:       100,
			Health:        100,
			Stamina:       MinNewCharacter.Stamina - 1,
			Strength:      MinNewCharacter.Strength,
			Agility:       MinNewCharacter.Agility,
			Wisdom:        MinNewCharacter.Wisdom,
			Charisma:      MinNewCharacter.Charisma,
		}
		err := character.Validate()
		if err == nil {
			t.Fatalf("Expected an error, got nil")
		}

		expectedErr := fmt.Sprintf("stamina should be at least %v, was: %v", MinNewCharacter.Stamina,
			character.Stamina)
		if err.Error() != expectedErr {
			t.Fatalf("error not equal to expected error\nexpected:\n%v\ngot:\n%v\n",
				expectedErr, err)
		}
	}
	strengthTooLow := func() {
		character := Character{
			CharacterId:   1,
			CharacterName: "elon",
			Attack:        420,
			Defense:       100,
			Health:        100,
			Stamina:       MinNewCharacter.Stamina,
			Strength:      MinNewCharacter.Strength - 1,
			Agility:       MinNewCharacter.Agility,
			Wisdom:        MinNewCharacter.Wisdom,
			Charisma:      MinNewCharacter.Charisma,
		}
		err := character.Validate()
		if err == nil {
			t.Fatalf("Expected an error, got nil")
		}

		expectedErr := fmt.Sprintf("strength should be at least %v, was: %v", MinNewCharacter.Strength,
			character.Strength)
		if err.Error() != expectedErr {
			t.Fatalf("error not equal to expected error\nexpected:\n%v\ngot:\n%v\n",
				expectedErr, err)
		}
	}
	agilityTooLow := func() {
		character := Character{
			CharacterId:   1,
			CharacterName: "elon",
			Attack:        420,
			Defense:       100,
			Health:        100,
			Stamina:       MinNewCharacter.Stamina,
			Strength:      MinNewCharacter.Strength,
			Agility:       MinNewCharacter.Agility - 1,
			Wisdom:        MinNewCharacter.Wisdom,
			Charisma:      MinNewCharacter.Charisma,
		}
		err := character.Validate()
		if err == nil {
			t.Fatalf("Expected an error, got nil")
		}

		expectedErr := fmt.Sprintf("agility should be at least %v, was: %v", MinNewCharacter.Agility,
			character.Agility)
		if err.Error() != expectedErr {
			t.Fatalf("error not equal to expected error\nexpected:\n%v\ngot:\n%v\n",
				expectedErr, err)
		}
	}
	wisdomTooLow := func() {
		character := Character{
			CharacterId:   1,
			CharacterName: "elon",
			Attack:        420,
			Defense:       100,
			Health:        100,
			Stamina:       MinNewCharacter.Stamina,
			Strength:      MinNewCharacter.Strength,
			Agility:       MinNewCharacter.Agility,
			Wisdom:        MinNewCharacter.Wisdom - 1,
			Charisma:      MinNewCharacter.Charisma,
		}
		err := character.Validate()
		if err == nil {
			t.Fatalf("Expected an error, got nil")
		}

		expectedErr := fmt.Sprintf("wisdom should be at least %v, was: %v", MinNewCharacter.Wisdom,
			character.Wisdom)
		if err.Error() != expectedErr {
			t.Fatalf("error not equal to expected error\nexpected:\n%v\ngot:\n%v\n",
				expectedErr, err)
		}
	}
	charismaTooLow := func() {
		character := Character{
			CharacterId:   1,
			CharacterName: "elon",
			Attack:        420,
			Defense:       100,
			Health:        100,
			Stamina:       MinNewCharacter.Stamina,
			Strength:      MinNewCharacter.Strength,
			Agility:       MinNewCharacter.Agility,
			Wisdom:        MinNewCharacter.Wisdom,
			Charisma:      MinNewCharacter.Charisma - 1,
		}
		err := character.Validate()
		if err == nil {
			t.Fatalf("Expected an error, got nil")
		}

		expectedErr := fmt.Sprintf("charisma should be at least %v, was: %v", MinNewCharacter.Charisma,
			character.Charisma)
		if err.Error() != expectedErr {
			t.Fatalf("error not equal to expected error\nexpected:\n%v\ngot:\n%v\n",
				expectedErr, err)
		}
	}
	validCharacter()
	sumTooHigh()
	staminaTooHigh()
	strengthTooHigh()
	agilityTooHigh()
	wisdomTooHigh()
	charismaTooHigh()
	staminaTooLow()
	strengthTooLow()
	agilityTooLow()
	wisdomTooLow()
	charismaTooLow()
}

