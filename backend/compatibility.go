package main

import (
	"github.com/adrg/strutil"
	"github.com/adrg/strutil/metrics"
)

func ComputePlayerPetCompatibility(player *Player, pet *Pet) float64 {
	levenshtein := metrics.NewLevenshtein()
	similarity := 1.0

	for key, playerValue := range player.Attributes {
		petValue, exists := pet.Attributes[key]
		if !exists {
			similarity *= 0.5
		} else {
			similarity *= strutil.Similarity(playerValue, petValue, levenshtein)
		}
	}
	return similarity
}
