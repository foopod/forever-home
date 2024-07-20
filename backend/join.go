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
}

func HandleJoin(c *fiber.Ctx) error {
	player := Player{
		ID: rand.IntN(MAX_ID),
		Pet: Pet{
			ID:         rand.IntN(MAX_ID),
			Attributes: attributes.Generate("cat"),
		},
		Attributes: attributes.Generate("human"),
	}

	// pet := Pet{
	// 	ID:         player.PetID,
	// 	Attributes: attributes.Generate(),
	// }

	response := JoinResponse{
		UserID: player.ID,
		Player: player,
	}

	bruh, err := json.Marshal(player.Attributes)
	if err != nil {
		return err
	}

	_, err = db.Exec(`INSERT INTO players (id, pet_id, attributes) VALUES (?, ?, ?)`, player.ID, player.Pet.ID, bruh)
	if err != nil {
		return err
	}

	bruh, err = json.Marshal(player.Pet.Attributes)
	if err != nil {
		return err
	}

	_, err = db.Exec(`INSERT INTO pets (id, attributes) VALUES (?, ?)`, player.Pet.ID, bruh)
	if err != nil {
		return err
	}

	return c.JSON(response)
}
