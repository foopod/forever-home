package main

import (
	"log"

	"github.com/gofiber/contrib/websocket"
)


var dashboardConnections = make(map[*websocket.Conn] bool)

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
			log.Println("broadcast:", err)
		}
	}
}

func NotifyTradeEvent(){
	BroadcastToDashboards([]byte{})
}