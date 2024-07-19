package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {

	app := fiber.New()
	app.Use(logger.New())
	app.Use(cors.New())

	// Register API endpoints
	app.Get("/api/join", HandleJoin)
	app.Post("/api/swap/:id", HandleSwap)
	app.Get("/api/state", HandleGetState)

	// Register Websocket endpoint
	app.Get("/ws", HandleWebsocket)

	app.Listen(":8080")
}
