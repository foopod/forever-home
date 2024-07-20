package attributes

import (
	"fmt"
	"log"
	"math/rand"
	"os"
	"path/filepath"
	"strings"
	"time"
)

const ATTRIBUTE_BASE_DIR = "../public/parts"

var ATTRIBUTE_NAMES []string = []string{
	"base",
	"eyes",
	"mouth",
	"accessories",
}

var HUMAN_NAMES []string = []string{
	"Alex", "Avery", "Blake", "Cameron", "Casey", "Charlie", "Dakota", "Drew", "Emerson", "Finley",
	"Harper", "Hayden", "Jamie", "Jordan", "Kai", "Kendall", "Lane", "Logan", "Morgan", "Parker",
	"Quinn", "Reese", "Riley", "Robin", "Rowan", "Ryan", "Sage", "Sawyer", "Skyler", "Taylor",
	"Terry", "Tracy", "Bailey", "Billie", "Bobby", "Carter", "Chris", "Corey", "Dana", "Devin",
	"Elliot", "Frankie", "Glenn", "Jessie", "Joey", "Jules", "Kelly", "Kerry", "Leslie", "Lindsay",
	"Lynn", "Marion", "Micah", "Montana", "Noel", "Nico", "Pat", "Payton", "Phoenix", "Quincy",
	"Ray", "Reagan", "Remy", "Rene", "River", "Rory", "Sam", "Sasha", "Shannon", "Sky",
	"Spencer", "Stevie", "Storm", "Sydney", "Teagan", "Toby", "Tyler", "Val", "Winter", "Addison",
	"Arden", "Aspen", "Ash", "Brook", "Carmen", "Dale", "Ellis", "Flynn", "Gray", "Indigo",
	"Justice", "Lane", "Linden", "Merritt", "Perry", "Rain", "Shiloh", "Sterling", "Tatum", "West",
}

var CAT_NAMES []string = []string{
	"Whiskerino", "Mittens", "Shadowpaws", "Luna", "Simba", "Tigress", "Mochi", "Sable", "Pixel", "Nimbus",
    "Jinx", "Cinnamon", "Gizmo", "Pepper", "Zephyr", "Sushi", "Echo", "Waffles", "Mystique", "Pudding", "Blaze", 
    "Neko", "Karma", "Basil", "Zelda", "Ash", "Nebula", "Figaro", "Lyric", "Sprout", "Clover", "Harley", "Frost",
    "Coco", "Raven", "Pippin", "Indigo", "Tango", "Buttercup", "Oreo", "Cosmo", "Saffron", "Doodle", "Mimosa",
    "Jasper", "Quasar", "Maple", "Galaxy", "Snickers", "Bubbles", "Phoenix", "Fudge", "Rascal", "Dusk", "Pixie",
    "Taffy", "Echo", "Jewel", "Skittles", "Mango", "Topaz", "Pumpkin", "Cobalt", "Velvet", "Frostbite", "Marble",
    "Sable", "Zenith", "Opal", "Nutmeg", "Ripple", "Slate", "Truffle", "Breeze", "Mystery", "Sorrel", "Nugget",
    "Sterling", "Flicker", "Fawn", "Cloud", "Ziggy", "Peaches", "Vortex", "Roo", "Galaxy", "Whisper", "Dynamo",
    "Sirius", "Lynx", "Jubilee", "Moss", "Pudding", "Starlight", "Sable", "Frost", "Glitter", "Rune",
}

var ALL_ATTRIBUTES = CollectAttributes(getEnv("IMAGE_DIR", ATTRIBUTE_BASE_DIR))

func CollectAttributes(baseDir string) map[string]map[string][]string {
	outputAttributes := make(map[string]map[string][]string)
	rand.Seed(time.Now().Unix())

	// Check the attribute folder exists
	dir, err := os.Open(baseDir)
	if err != nil {
		fmt.Printf("error while opening attribute dir %s: %s\n", baseDir, err)
	}

	defer dir.Close()

	dirInfo, err := dir.Stat()
	if os.IsNotExist(err) || !dirInfo.IsDir() {
		fmt.Printf("attribute path %s does not exist", baseDir)
	} else if err != nil {
		fmt.Printf("error while getting info for attribute dir %s: %s\n", baseDir, err)
	}

	// Get attributes inside directory
	files, err := dir.Readdir(-1)
	if err != nil {
		fmt.Printf("error while reading attribute dir %s: %s\n", baseDir, err)
	}

	for _, f := range files {
		fInfo, err := os.Stat(filepath.Join(baseDir, f.Name()))
		if err != nil {
			fmt.Printf("error while reading species dir %s: %s\n", baseDir, err)
			continue
		} else if fInfo.IsDir() {
			dirname := f.Name()
			attributes := CollectAttributesForSpecies(filepath.Join(baseDir, dirname), ATTRIBUTE_NAMES)
			outputAttributes[dirname] = attributes
		}
	}

	return outputAttributes
}

func CollectAttributesForSpecies(baseDir string, attributeNames []string) map[string][]string {
	outputAttributes := make(map[string][]string)

	for _, attributeName := range attributeNames {
		outputAttributes[attributeName] = make([]string, 0)
		attrDir := filepath.Join(baseDir, attributeName)

		// Check the attribute folder exists
		dir, err := os.Open(attrDir)
		if err != nil {
			fmt.Printf("error while opening attribute dir %s: %s\n", attrDir, err)
			continue
		}

		defer dir.Close()

		dirInfo, err := dir.Stat()
		if os.IsNotExist(err) || !dirInfo.IsDir() {
			fmt.Printf("attribute path %s does not exist", attrDir)
			continue
		} else if err != nil {
			fmt.Printf("error while getting info for attribute dir %s: %s\n", attrDir, err)
			continue
		}

		// Get attributes inside directory
		files, err := dir.Readdir(-1)
		if err != nil {
			fmt.Printf("error while reading attribute dir %s: %s\n", attrDir, err)
			continue
		}

		for _, f := range files {
			filename := f.Name()
			ext := filepath.Ext(filename)
			if ext != ".png" {
				fmt.Printf("ignoring non-png %s in %s\n", filename, attrDir)
				continue
			}
			outputAttributes[attributeName] = append(outputAttributes[attributeName], strings.TrimSuffix(filename, ext))
		}
	}

	return outputAttributes
}

func Generate(species string) map[string]string {
	attr := ALL_ATTRIBUTES["cat"]
	if species == "human" {
		attr = ALL_ATTRIBUTES["human"]
	}

	name := CAT_NAMES[rand.Intn(len(CAT_NAMES))]
	if species == "human" {
		name = HUMAN_NAMES[rand.Intn(len(HUMAN_NAMES))]
	}

	return map[string]string{
		"species":   species,
		"name": name,
		"base":      attr["base"][rand.Intn(len(attr["base"]))],
		"eyes":      attr["eyes"][rand.Intn(len(attr["eyes"]))],
		"mouth":     attr["mouth"][rand.Intn(len(attr["mouth"]))],
		"accessory": attr["accessories"][rand.Intn(len(attr["accessories"]))],
	}
}

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	log.Println("Returning fallback:", fallback)
	return fallback
}
