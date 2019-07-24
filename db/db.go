package db

import (
	"github.com/lib/pq"
	_ "github.com/lib/pq"
	"gopkg.in/yaml.v2"

	"database/sql"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"strings"
)

type DatabaseConfig struct {
	Open     string `yaml:"open"`
	Host     string `yaml:"host"`
	Port     string `yaml:"port"`
	User     string `yaml:"user"`
	Password string `yaml:"password"`
	DbName   string `yaml:"dbname"`
	SSLMode  string `yaml:"sslmode"`
}
type DataBaseYamlParsing struct {
	Development DatabaseConfig `yaml:"development"`
}

func (c *DatabaseConfig) setupConfig() error {
	yamlFile, err := ioutil.ReadFile("db/dbconf.yml")
	if err != nil {
		return fmt.Errorf("error: yamlFile.Get err #%v ", err)
	}
	dbyml := DataBaseYamlParsing{}
	err = yaml.Unmarshal(yamlFile, &dbyml)
	c.Open = dbyml.Development.Open
	if os.Getenv("COMPOSE") == "" {
		c.Open += " host=localhost port=5432"
	}
	if err != nil {
		log.Fatalf("Unmarshal: %v", err)
	}
	settings := strings.Split(c.Open, " ") // TODO useless?
	for _, v := range settings {
		setting := strings.Split(v, "=")
		switch setting[0] {
		case "user":
			c.User = setting[1]
		case "password":
			c.Password = setting[1]
		case "dbname":
			c.DbName = setting[1]
		case "sslmode":
			c.SSLMode = setting[1]
		}
	}
	return nil
}

func OpenDb() *sql.DB {
	config := DatabaseConfig{}
	err := config.setupConfig()
	if err != nil {
		log.Printf("error: %v", err)
	}
	connection := config.Open
	if connection == "" {
		url := os.Getenv("DATABASE_URL")
		if url != "" {
			connection, err = pq.ParseURL(url)
			if err != nil {
				log.Fatalf("error setting up database %v", err)
			}
			connection += fmt.Sprintf(" sslmode=%v", "require")
		} else {
			log.Fatalf("error: no database settings or DATABASE_URL was provided")
		}
	}
	db, err := sql.Open("postgres", connection)
	if err != nil {
		log.Fatalf("database opening error:%v", err)
	}

	return db
}
