package attributes

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

const ATTRIBUTE_BASE_DIR = "../../public/parts"

var ATTRIBUTE_NAMES []string = []string{
	"base",
	"eyes",
	"nose",
	"mouth",
	"ears",
	"accessory",
}

var ALL_ATTRIBUTES = CollectAttributes(ATTRIBUTE_BASE_DIR, ATTRIBUTE_NAMES)

func CollectAttributes(baseDir string, attributeNames []string) map[string][]string {
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

func Generate() map[string]string {

	return map[string]string{
		"hair": "long",
		"eyes": "blue",
	}
}
