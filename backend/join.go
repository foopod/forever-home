package main

import (
	"encoding/json"
	"log"
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
		ID:         rand.IntN(MAX_ID),
		Attributes: attributes.Generate("human"),
	}

	pet, err := GeneratePetForPlayer(player)
	if err != nil {
		return err
	}
	player.Pet = *pet

	player.PetCompatibility = ComputePlayerPetCompatibility(&player, &player.Pet)

	response := JoinResponse{
		UserID: player.ID,
		Player: player,
	}

	bruh, err := json.Marshal(player.Attributes)
	if err != nil {
		return err
	}

	_, err = db.Exec(`INSERT INTO players (id, pet_id, compatibility, attributes) VALUES (?, ?, ?, ?)`, player.ID, player.Pet.ID, player.PetCompatibility, bruh)
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

	log.Println("Player joined", player.ID)

	return c.JSON(response)
}
