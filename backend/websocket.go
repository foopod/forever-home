package main

import (
	"log"

	"github.com/gorilla/websocket"
)

func HandleWebsocket(c *websocket.Conn) {
	// clients[c] = GenerateRandomPlayer()
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
	// delete(clients, c)
}
