package attributes

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"math/rand"
  	"time"
)

const ATTRIBUTE_BASE_DIR = "../../public/parts"

var ATTRIBUTE_NAMES []string = []string{
	"base",
	"eyes",
	"mouth",
	"accessories",
}

var ALL_ATTRIBUTES = CollectAttributes(ATTRIBUTE_BASE_DIR)

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
	if species == "dog" {
		attr = ALL_ATTRIBUTES["dog"]
	} else if species == "human"{
		attr = ALL_ATTRIBUTES["human"]
	}

	return map[string]string{
		"base": attr["base"][rand.Intn(len(attr["base"]))],
		"eyes": attr["eyes"][rand.Intn(len(attr["eyes"]))],
		"mouth": attr["mouth"][rand.Intn(len(attr["mouth"]))],
		"accessories": attr["accessories"][rand.Intn(len(attr["accessories"]))],
	}
}
