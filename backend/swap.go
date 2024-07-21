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

	myNewPet, err := GetPetByID(theirPetID)
	if err != nil {
		log.Println("Error getting their pet ", err)
		return err
	}

	theirNewPet, err := GetPetByID(myPetID)
	if err != nil {
		log.Println("Error getting my pet ", err)
		return err
	}

	me, err := GetPlayerByID(myID)
	if err != nil {
		log.Println("Error getting me ", err)
		return err
	}

	them, err := GetPlayerByID(theirID)
	if err != nil {
		log.Println("Error getting them ", err)
		return err
	}

	myNewPetCompatibility := ComputePlayerPetCompatibility(me, myNewPet)
	theirNewPetCompatibility := ComputePlayerPetCompatibility(them, theirNewPet)

	// Update MY pet ID to THEIRS
	_, err = db.Exec("UPDATE players SET pet_id = ?, compatibility = ? WHERE id = ?", myNewPet.ID, myNewPetCompatibility, myID)
	if err != nil {
		log.Println("Error updating my petID ", err)
		return err
	}

	// Update THEIR pet ID to MINE
	_, err = db.Exec("UPDATE players SET pet_id = ?, compatibility = ? WHERE id = ?", theirNewPet.ID, theirNewPetCompatibility, theirID)
	if err != nil {
		log.Println("Error updating their petID ", err)
		return err
	}

	//BroadcastToPlayers([]byte("refresh"))
	err = SendToPlayer(theirID, []byte("refresh"))
	if err != nil {
		log.Println("Error sending refresh to player ", err)
	}

	_, err = db.Exec("INSERT INTO swaps (from_user, to_user, from_pet_id, to_pet_id) VALUES (?, ?, ?, ?)", myID, theirID, myPetID, theirPetID)
	if err != nil {
		log.Println("Error inserting swap ", err)
		// Don't do anything else because who cares
	}

	log.Println("Swapped", myID, "and", theirID)
	NotifyTradeEvent(myID, theirID, myPetID, theirPetID)

	return HandleGetState(c)
	//return c.SendString("OK")
}
