package main

import (
	"database/sql"
	"log"
	"os"
	"sync"

	"github.com/foopod/forever-home/backend/attributes"
	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"

	_ "github.com/mattn/go-sqlite3"
)

const (
	DB_FILE = "db.sqlite"
)

var db *sql.DB

func init() {
	var err error
	db, err = sql.Open("sqlite3", getEnv("DB_FILE", DB_FILE))
	if err != nil {
		panic(err)
	}

	_, err = db.Exec(`CREATE TABLE IF NOT EXISTS players (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		pet_id INTEGER,
		compatibility FLOAT,
		attributes JSONB,
		joined DATETIME DEFAULT CURRENT_TIMESTAMP);
		CREATE TABLE IF NOT EXISTS pets (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		attributes JSONB,
		created DATETIME DEFAULT CURRENT_TIMESTAMP);
		CREATE TABLE IF NOT EXISTS swaps (
		from_user INTEGER,
		to_user INTEGER,
		from_pet_id INTEGER,
		to_pet_id INTEGER,
		timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);
	`)
	if err != nil {
		panic(err)
	}
	log.Println("Database initialized.")
}

func removeDbExistingSeeds(seedSpace []uint64) ([]uint64, error) {
	var workingSpace []uint64
	workingSpace = append(workingSpace, seedSpace...)
	rows, err := db.Query("SELECT id, pet_id FROM players")
	if err != nil {
		log.Println("Error getting active seeds", err)
		return nil, err
	}

	var existingSeeds []int64
	for rows.Next() {
		var id1 int64
		var id2 int64
		err := rows.Scan(&id1, &id2)
		if err != nil {
			log.Println("Error scanning active seeds", err)
			return nil, err
		}
		existingSeeds = append(existingSeeds, id1, id2)
	}

	for _, existSeed := range existingSeeds {
		idx := 0
		for {
			if idx >= len(workingSpace) {
				break
			}
			if workingSpace[idx] == uint64(existSeed) {
				workingSpace[idx] = workingSpace[len(workingSpace)-1]
				workingSpace = workingSpace[:len(workingSpace)-1]
				continue
			}
			idx += 1
		}
	}
	return workingSpace, nil
}

var SeedSpace []uint64
var SeedSpaceMutex sync.Mutex

func GetNextAvailableSeed() uint64 {
	// Critical Section - multiple entry may result in invalid state
	SeedSpaceMutex.Lock()
	defer SeedSpaceMutex.Unlock()
	if len(SeedSpace) == 0 {
		log.Printf("GetNextAvailableSeed: Seedspace exhausted. Returning 0 as wildcard value")
		return 0
	}
	seed := SeedSpace[0]
	SeedSpace = SeedSpace[1:]
	return seed
}

func main() {
	SeedSpace = attributes.GenerateAttrSeedSpaceForGame()
	beforeLen := len(SeedSpace)
	var err error
	SeedSpace, err = removeDbExistingSeeds(SeedSpace)
	log.Printf("before: %d, after: %d", beforeLen, len(SeedSpace))
	if err != nil {
		log.Printf("error while getting existing seeds: %s", err)
		return
	}

	defer db.Close()
	app := fiber.New()
	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
	}))

	app.Static("/", "./dist")

	// Register API endpoints
	app.Get("/api/join", HandleJoin)
	app.Post("/api/swap/:id/:theirid", HandleSwap)
	app.Get("/api/state/:id", HandleGetState)

	// Register Websocket endpoint
	app.Use("/ws", func(c *fiber.Ctx) error {
		if websocket.IsWebSocketUpgrade(c) {
			c.Locals("allowed", true)
			return c.Next()
		}
		return fiber.ErrUpgradeRequired
	})
	app.Get("/ws/:id", websocket.New(HandleWebsocket))

	app.Use("/dashboard/ws/", func(c *fiber.Ctx) error {
		if websocket.IsWebSocketUpgrade(c) {
			c.Locals("allowed", true)
			return c.Next()
		}
		return fiber.ErrUpgradeRequired
	})
	app.Get("/dashboard/ws/", websocket.New(HandleDashboardWebsocket))

	app.Listen(":" + getEnv("PORT", "8080"))
}

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}
