package main

import (
	"encoding/json"
	"log"
	"math/rand"

	"github.com/foopod/forever-home/backend/attributes"
)

const (
	MAXIMUM_COMPATIBILITY = 0.41
)

type Pet struct {
	ID         int        `json:"id"`
	Attributes Attributes `json:"attributes"`
}

func GetPetByID(id int) (*Pet, error) {
	var p Pet

	var jsonAttributes []byte

	err := db.QueryRow(`SELECT id, attributes FROM pets WHERE id = ?`, id).
		Scan(&p.ID, &jsonAttributes)
	if err != nil {
		log.Printf("Pet not found %d, error: %s", id, err)
		return nil, err
	}

	err = json.Unmarshal(jsonAttributes, &p.Attributes)
	if err != nil {
		log.Printf("Error unmarshalling attributes: %s", err)
		return nil, err
	}

	//log.Printf("Pet found %d, %#v", id, p)
	return &p, nil
}

func GeneratePetForPlayer(player Player) (*Pet, error) {
	//var out Pet

	log.Println("Generating pet")
	pet := Pet{
		ID:         rand.Intn(MAX_ID),
		Attributes: attributes.Generate("cat"),
	}

	return &pet, nil
}
