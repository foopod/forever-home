package main

import (
	"database/sql"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gorilla/websocket"

	_ "github.com/mattn/go-sqlite3"
)

const (
	DB_FILE = "db.sqlite"
)

var db *sql.DB

func init() {
	var err error
	db, err = sql.Open("sqlite3", DB_FILE)
	if err != nil {
		panic(err)
	}

	_, err = db.Exec(`CREATE TABLE IF NOT EXISTS players (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		pet_id INTEGER,
		attributes JSONB);
		CREATE TABLE IF NOT EXISTS pets (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		attributes JSONB);
	`)
	if err != nil {
		panic(err)
	}
	log.Println("Database initialized.")
}

func main() {
	defer db.Close()
	app := fiber.New()
	app.Use(logger.New())
	app.Use(cors.New())

	// Register API endpoints
	app.Get("/api/join", HandleJoin)
	app.Post("/api/swap/:id", HandleSwap)
	app.Get("/api/state/:id", HandleGetState)

	// Register Websocket endpoint
	app.Use("/ws", func(c *fiber.Ctx) error {
		if websocket.IsWebSocketUpgrade(c) {
			c.Locals("allowed", true)
			return c.Next()
		}
		return fiber.ErrUpgradeRequired
	})
	app.Get("/ws", websocket.New(HandleWebsocket))

	app.Listen(":8080")
}
