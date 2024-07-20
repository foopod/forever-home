package main

import (
	"encoding/json"
	"fmt"
	"log"
)

type Attributes map[string]string

// Implement the sql.Scanner interface
func (a Attributes) Scan(src interface{}) error {

	log.Println("Scanning", src, a)
	if src == nil {
		return nil
	}

	switch t := src.(type) {
	case []byte:
		log.Print("Unmarshalling")

		err := json.Unmarshal(t, &a)
		log.Print("Unmarshalled", a, err)
		return err
	}
	return fmt.Errorf("unsupported type: %T", src)
}

// Implement the driver.Valuer interface
func (a Attributes) Value() (interface{}, error) {
	return json.Marshal(a)
}
