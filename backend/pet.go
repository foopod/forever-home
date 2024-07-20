package main

import (
	"encoding/json"
	"log"
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

	log.Printf("Pet found %d, %#v", id, p)
	return &p, nil
}
