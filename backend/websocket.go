package main

import "github.com/gofiber/fiber/v2"

func HandleWebsocket(c *fiber.Ctx) error {
	return c.SendString("Websocket!")
}
