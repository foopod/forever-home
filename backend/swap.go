package main

import "github.com/gofiber/fiber/v2"

func HandleSwap(c *fiber.Ctx) error {
	return c.SendString("Swap the pets!")
}
