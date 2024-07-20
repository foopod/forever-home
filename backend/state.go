package main

import (
	"log"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func HandleGetState(c *fiber.Ctx) error {
	var response JoinResponse
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return err
	}

	p, err := GetPlayerByID(id)
	if err != nil {
		return err
	}
	log.Printf("Player: %+v, error: %+v", p, err)

	response.Player = *p
	response.UserID = p.ID

	log.Println("Got state for player", response.Player.ID)

	return c.JSON(response)
}
