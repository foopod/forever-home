package main

import (
	"log"
	"slices"
	"time"
)

func init() {
	go PushTopPlayersToDashboard()
	go DeleteInactivePlayers()

}

func PushTopPlayersToDashboard() {
	for {
		time.Sleep(1 * time.Second)
		rows, err := db.Query("SELECT id, compatibility FROM PLAYERS ORDER BY compatibility DESC LIMIT 10")
		if err != nil {
			log.Println("Error getting top players", err)
			continue
		}

		var ids []int

		for rows.Next() {
			var id int
			var compatibility float64
			err := rows.Scan(&id, &compatibility)
			if err != nil {
				log.Println("Error scanning top players", err)
				continue
			}
			ids = append(ids, id)
		}

		UpdateLeaderboard(ids)
		log.Println("Updated leaderboard")
		time.Sleep(4 * time.Second)
	}
}

func DeleteInactivePlayers() {
	for {
		// Prevent infinite loop
		time.Sleep(1 * time.Second)

		deleted := 0

		// Get all swaps in last 10 minutes
		rows, err := db.Query("SELECT from_user, to_user FROM swaps WHERE timestamp > datetime('now', '-10 minutes')")
		if err != nil {
			log.Println("Error getting active players", err)
			continue
		}

		var ids []int
		for rows.Next() {
			var id1 int
			var id2 int
			err := rows.Scan(&id1, &id2)
			if err != nil {
				log.Println("Error scanning active players", err)
				continue
			}
			ids = append(ids, id1, id2)
		}

		// Loop over all players and see if they're in the active list
		rows, err = db.Query("SELECT id FROM players")
		if err != nil {
			log.Println("Error getting all players", err)
			continue
		}

		var deleteIDs []int

		for rows.Next() {
			var id int
			err := rows.Scan(&id)
			if err != nil {
				log.Println("Error scanning all players", err)
				continue
			}

			if !slices.Contains(ids, id) {
				deleteIDs = append(deleteIDs, id)
				// _, err := db.Exec("DELETE FROM players WHERE id = ?", id)
				// if err != nil {
				// 	log.Println("Error deleting inactive player", err)
				// 	continue
				// }
				//deleted++
			}
		}

		if len(deleteIDs) > 0 {
			for i := 0; i < len(deleteIDs); i += 1 {
				_, err := db.Exec("DELETE FROM players WHERE id = ? and joined < datetime('now', '-10 minutes')", deleteIDs[i])
				if err != nil {
					log.Println("Error deleting inactive players", err)
					// Don't care about this error
				}

				SendToPlayer(deleteIDs[i], []byte(`refresh`))
				log.Println("Deleted inactive player", deleteIDs[i])
				deleted++
			}

		}

		log.Println("Cleaned up", deleted, " inactive players", len(deleteIDs))

		time.Sleep(10 * time.Second)
	}
}
