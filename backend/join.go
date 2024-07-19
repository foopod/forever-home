package main

import "github.com/gofiber/fiber/v2"

func HandleJoin(c *fiber.Ctx) error {
	return c.SendString("Join the game!")
}
