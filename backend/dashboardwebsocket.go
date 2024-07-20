package main

var dashboardConnections = make(map[*websocket.Conn] bool)

func HandleDashboardWebsocket(c *websocket.Conn) {
	// clients[c] = GenerateRandomPlayer()
	dashboardConnections[c] = true

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
	delete(dashboardConnections, c)
}

func BroadcastToPlayers(msg []byte) {
	for _, client := range clients {
		if err := client.Conn.WriteMessage(websocket.TextMessage, msg); err != nil {
			log.Println("broadcast:", err)
		}
	}
}
