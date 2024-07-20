package main

import (
	"log"
	"strconv"

	"github.com/gofiber/contrib/websocket"
)

type Connection struct {
	Conn     *websocket.Conn
	PlayerID int
}

var clients []*Connection

func HandleWebsocket(c *websocket.Conn) {
	// clients[c] = GenerateRandomPlayer()
	userID, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		c.WriteMessage(websocket.TextMessage, []byte("Invalid user ID, must be an int"+err.Error()))
		return
	}

	connection := &Connection{
		Conn:     c,
		PlayerID: userID,
	}
	AddConnection(*connection)

	var (
		mt  int
		msg []byte
		//err error
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

	RemoveConnection(*connection)
}

func BroadcastToPlayers(msg []byte) {
	for _, client := range clients {
		if err := client.Conn.WriteMessage(websocket.TextMessage, msg); err != nil {
			log.Println("broadcast:", err)
		}
	}
}

func SendToPlayer(playerID int, msg []byte) error {
	for _, client := range clients {
		if client.PlayerID == playerID {
			if err := client.Conn.WriteMessage(websocket.TextMessage, msg); err != nil {
				log.Println("send to player:", err)
				return err
			}
		}
	}
	return nil
}

func AddConnection(c Connection) {
	clients = append(clients, &c)
}

func RemoveConnection(c Connection) {
	for i, client := range clients {
		if client.Conn == c.Conn {
			clients = append(clients[:i], clients[i+1:]...)
			break
		}
	}
}