package main

import "github.com/gofiber/fiber/v2"

func HandleGetState(c *fiber.Ctx) error {
	return c.SendString("Get the state!")
}
