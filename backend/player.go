package main

import (
	"encoding/json"
	"log"
)

type Player struct {
	ID int `json:"id"`
	//PetID      int        `json:"pet_id"`
	Pet              Pet        `json:"pet"`
	Attributes       Attributes `json:"attributes"`
	PetCompatibility float64    `json:"pet_compatibility"`
}

func GetPlayerByID(id int) (*Player, error) {
	var p Player
	var petID int

	var jsonAttributes []byte

	err := db.QueryRow(`SELECT id, pet_id, attributes FROM players WHERE id = ?`, id).
		Scan(&p.ID, &petID, &jsonAttributes)
	if err != nil {
		log.Printf("Player not found %d, error: %s", id, err)
		return nil, err
	}

	err = json.Unmarshal(jsonAttributes, &p.Attributes)
	if err != nil {
		log.Printf("Error unmarshalling attributes: %s", err)
		return nil, err
	}
	log.Println("Getting pet by ID", petID)
	pet, err := GetPetByID(petID)
	if err != nil {
		log.Println("Error getting pet by id", err)
		return nil, err
	}
	p.Pet = *pet
	p.PetCompatibility = ComputePlayerPetCompatibility(&p, &p.Pet)

	log.Printf("Player found %d, %#v", id, p)
	return &p, nil
}
