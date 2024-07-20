package main

import (
	"encoding/json"
	"math/rand/v2"

	"github.com/foopod/forever-home/backend/attributes"
	"github.com/gofiber/fiber/v2"
)

const (
	MAX_ID = 1000000
)

type JoinResponse struct {
	UserID int    `json:"user_id"`
	Player Player `json:"player"`
	Pet    Pet    `json:"pet"`
}

type Player struct {
	ID         int               `json:"id"`
	PetID      int               `json:"pet_id"`
	Attributes map[string]string `json:"attributes"`
}

type Pet struct {
	ID         int               `json:"id"`
	Attributes map[string]string `json:"attributes"`
}

func HandleJoin(c *fiber.Ctx) error {
	player := Player{
		ID:         rand.IntN(MAX_ID),
		PetID:      rand.IntN(MAX_ID),
		Attributes: attributes.Generate(),
	}

	pet := Pet{
		ID:         player.PetID,
		Attributes: attributes.Generate(),
	}

	response := JoinResponse{
		UserID: player.ID,
		Player: player,
		Pet:    pet,
	}

	bruh, err := json.Marshal(player.Attributes)
	if err != nil {
		return err
	}

	_, err = db.Exec(`INSERT INTO players (id, pet_id, attributes) VALUES (?, ?, ?)`, player.ID, player.PetID, bruh)
	if err != nil {
		return err
	}

	bruh, err = json.Marshal(pet.Attributes)
	if err != nil {
		return err
	}

	_, err = db.Exec(`INSERT INTO pets (id, attributes) VALUES (?, ?)`, pet.ID, bruh)
	if err != nil {
		return err
	}

	return c.JSON(response)
}
