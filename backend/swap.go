package main

import (
	"log"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func HandleSwap(c *fiber.Ctx) error {
	myID, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		log.Println("Error getting myid")
		return err
	}

	theirID, err := strconv.Atoi(c.Params("theirid"))
	if err != nil {
		log.Println("Error getting their ID")
		return err
	}

	// Get MY pet ID
	var myPetID int
	err = db.QueryRow("SELECT pet_id from players WHERE id = ?", myID).Scan(&myPetID)
	if err != nil {
		log.Println("Error getting their petID ", err)
		return err
	}

	// Get THEIR pet ID to swap into
	var theirPetID int
	err = db.QueryRow("SELECT pet_id from players WHERE id = ?", theirID).Scan(&theirPetID)
	if err != nil {
		log.Println("Error getting their petID ", err)
		return err
	}

	// Update MY pet ID to THEIRS
	_, err = db.Exec("UPDATE players SET pet_id = ? WHERE id = ?", theirPetID, myID)
	if err != nil {
		log.Println("Error updating my petID ", err)
		return err
	}

	// Update THEIR pet ID to MINE
	_, err = db.Exec("UPDATE players SET pet_id = ? WHERE id = ?", myPetID, theirID)
	if err != nil {
		log.Println("Error updating their petID ", err)
		return err
	}

	BroadcastToPlayers([]byte("refresh"))

	return HandleGetState(c)
	//return c.SendString("OK")
}
