package main

import (
	"log"

	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

type PlayerData struct {
	Name       string
	ID         int
	Attributes map[string]string
	PetID      int
}

func GenerateRandomPlayer() *PlayerData {
	return &PlayerData{
		Name: "Bob",
		ID:   1111,
		Attributes: map[string]string{
			"head": "bald",
		},
		PetID: 11212,
	}
}

var clients map[*websocket.Conn]*PlayerData

func main() {
	clients := make(map[*websocket.Conn]*PlayerData)

	app := fiber.New()

	app.Use("/ws", func(c *fiber.Ctx) error {
		// IsWebSocketUpgrade returns true if the client
		// requested upgrade to the WebSocket protocol.
		if websocket.IsWebSocketUpgrade(c) {
			c.Locals("allowed", true)
			return c.Next()
		}
		return fiber.ErrUpgradeRequired
	})

	app.Get("/ws", websocket.New(func(c *websocket.Conn) {
		clients[c] = GenerateRandomPlayer()
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

		// the connection has ended, cleanup connection
		delete(clients, c)
	}))

	log.Fatal(app.Listen(":3000"))
	// Access the websocket server: ws://localhost:3000/ws/123?v=1.0
	// https://www.websocket.org/echo.html
}

func BroadcastToPlayers(msg []byte) {
	for client, clientData := range clients {
		clientData = clientData
		if err := client.WriteMessage(websocket.TextMessage, msg); err != nil {
			log.Println("broadcast:", err)
		}
	}
}
