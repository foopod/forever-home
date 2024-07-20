package main

func ComputePlayerPetCompatibility(player *Player, pet *Pet) float64 {
	//method := metrics.NewJaccard()
	similarity := 0.0

	for key, playerValue := range player.Attributes {

		if key == "species" || key == "name" {
			continue
		}
		petValue, exists := pet.Attributes[key]
		//log.Println("Key:", key, "Value:", playerValue, "Pet Value:", petValue)
		if !exists {
			similarity += 0
		} else {
			if key == "accessory" {
				if playerValue == petValue {
					similarity += 0.37
				}
			} else if key == "base" {
				if playerValue == petValue {
					similarity += 0.23
				}
			} else {
				if playerValue == petValue {
					similarity += 0.20
				}
			}
		}
		//log.Println("Similarity updated to", similarity)

	}
	return similarity

}
