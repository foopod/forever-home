package main

import (
	"math"

	"github.com/adrg/strutil"
	"github.com/adrg/strutil/metrics"
)

func ComputePlayerPetCompatibility(player *Player, pet *Pet) float64 {
	method := metrics.NewJaccard()
	similarity := 1.0

	for key, playerValue := range player.Attributes {
		if key == "species" || key == "name" {
			continue
		}
		petValue, exists := pet.Attributes[key]
		if !exists {
			similarity *= 0.5
		} else {
			similarity *= strutil.Similarity(playerValue, petValue, method)
		}
	}
	return math.Cbrt(similarity)
}
