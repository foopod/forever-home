package main

import (
	"encoding/json"
	"log"

	"github.com/gofiber/contrib/websocket"
)

var dashboardConnections = make(map[*websocket.Conn]bool)

func HandleDashboardWebsocket(c *websocket.Conn) {
	// clients[c] = GenerateRandomPlayer()
	dashboardConnections[c] = true

	var (
		mt  int
		msg []byte
		err error
	)
	for {
		if mt, msg, err = c.ReadMessage(); err != nil {
			log.Println("read:", err)
			break
		}
		log.Printf("recv: %s", msg)

		if err = c.WriteMessage(mt, msg); err != nil {
			log.Println("write:", err)
			break
		}
	}
	delete(dashboardConnections, c)
}

func BroadcastToDashboards(msg []byte) {
	for client := range dashboardConnections {
		if err := client.Conn.WriteMessage(websocket.TextMessage, msg); err != nil {
			log.Println("BroadcastToDashboards:", err)
		}
	}
}

type TradeEvent struct {
	MsgType string  `json:"msgtype"`
	Player1 *Player `json:"player1"`
	Player2 *Player `json:"player2"`
}

func NotifyTradeEvent(myID int, theirID int, myPetID int, theirPetID int) {
	player1, err := GetPlayerByID(myID)
	if err != nil {
		log.Printf("NotifyTradeEvent: Error retrieving player %d: %s", myID, err)
		return
	}
	player2, err := GetPlayerByID(theirID)
	if err != nil {
		log.Printf("NotifyTradeEvent: Error retrieving player %d: %s", theirID, err)
		return
	}

	tradeEvent := &TradeEvent{
		MsgType: "notify-trade",
		Player1: player1,
		Player2: player2,
	}

	data, err := json.Marshal(tradeEvent)
	if err != nil {
		log.Printf("NotifyTradeEvent: Error marshalling for player1=%d, player2=%d, pet1=%d, pet2=%d: %s",
			myID, theirID, myPetID, theirPetID, err)
		return
	}

	BroadcastToDashboards(data)
}

type LeaderboardEvent struct {
	MsgType     string    `json:"msgtype"`
	Leaders     []*Player `json:"leaders"`
	PlayerCount int       `json:"player_count"`
}

func UpdateLeaderboard(leaderIDs []int) {
	var leaders []*Player

	for _, leaderID := range leaderIDs {
		player, err := GetPlayerByID(leaderID)
		if err != nil {
			log.Printf("UpdateLeaderboard: Error retrieving player %d: %s", leaderID, err)
			return
		}
		leaders = append(leaders, player)
	}

	leaderboardEvent := &LeaderboardEvent{
		MsgType: "update-leaderboard",
		Leaders: leaders,
	}

	err := db.QueryRow(`SELECT COUNT(*) FROM players`).Scan(&leaderboardEvent.PlayerCount)
	if err != nil {
		log.Printf("UpdateLeaderboard: Error getting player count: %s", err)
	}

	data, err := json.Marshal(leaderboardEvent)
	if err != nil {
		log.Printf("UpdateLeaderboard: Error marshalling for leaders=%v: %s",
			leaderIDs, err)
		return
	}

	BroadcastToDashboards(data)
}
