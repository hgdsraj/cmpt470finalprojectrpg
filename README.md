# CMPT 470 Final Project - MMORPG Game

## How to build and run the app locally

- After cloning, make sure this project is in "$GOPATH/src/sfu.ca/apruner/cmpt470finalprojectrpg", otherwise you will run into issues
- Test the app `go test ./...`

### Dependencies
- need go > 1.10
- need goose (`$ go get bitbucket.org/liamstask/goose/cmd/goose`, read the manual at: <https://bitbucket.org/liamstask/goose/src/master/>)
- need go dep (`brew install go-dep` or `sudo apt-get install go-dep`, read the manual at: <https://github.com/golang/dep>)
- need postgresql (`brew install postgresql` or `sudo apt-get install postgresql`, read the manual at: <https://www.postgresql.org/download/>)

### Before building
- You will need to create a local postgres database, to do this:
  - Create a file db/dbconf.yml based on db/dbconf.example.yml (be aware that if you want to change the user info, you will need to edit the info in scripts/setup.sh as well)
  - Run `sudo sh scripts/setup.sh`
  - Run `goose up`
  - Test the app: `go test ./...`
- Voila! You are ready to build with either docker or go build

### Build the app with docker
- Ensure you have docker (and compose) installed 
        (`brew install docker` or `sudo apt-get install docker`)
- Run:
```
docker-compose down -v --rmi all --remove-orphans
docker-compose build
docker-compose up app
```
- Wait for migrations to run (2-3 mins)
- TODO: use latest migration as reference for healthcheck
- Visit localhost:8000 in your browser. Voila!

### To build and run the app locally (using go build, recommended for development)
- Setup goose config in db/dbconf.yml (same fields as db/dbconf.example.yml)
- Build frontend using npm (cd frontend && npm install && npm run build)
- Run dep ensure && goose up
- Run go run main.go
- Visit localhost:8000 in your browser. Voila!
- Note: If you are running into odd db issues with the API, go into postgres and drop all tables manually in the cmpt470 db. Then run `goose down` and then `goose up`

### When deploying
- you must run ./scripts/heroku_migrate.sh for any migrations after pushing to Heroku
- you must have a file db/prod.yml that looks has the correct authenticated postgresURL like:
    production:
        driver: postgres
        open: postgresURL
        
## Database

### Items

The Items table holds a type reference and a sub reference.

The type reference refers to the id of entries in ItemTypes, each entry has an associated sub-type table (e.g Weapons).

The sub reference refers to the id of entries in the associated sub-type (e.g in Weapons entry with id=1 might be a 
sword).

The following can be used to test the update triggers on items;
```postgresql
INSERT INTO weapons (name, damage, speed, critchance) VALUES ('sword', 2, 2, 2), ('spear', 3, 1, 1), ('axe', 4, 1, 0);
INSERT INTO armour (name, defense, weight) VALUES ('Chestplate', 5, 5), ('Helmet', 3, 1), ('Leggings', 4, 3);
INSERT INTO consumables (name, healing, damage) VALUES ('Potion', 4, 0), ('Apple', 2, 0), ('PosionBerry', 0, 3);
```
After running this you should see all associated entries in the items table automatically populated.

To list all items in the game (from psql console):
```postgresql
SELECT 
    CASE 
        WHEN typename = 'Weapon' THEN weapons.name || ' Type (' || typename || ')'
        WHEN typename = 'Armour' THEN armour.name || ' Type (' || typename || ')'
        WHEN typename = 'Consumable' THEN consumables.name || ' Type (' || typename || ')'
    END AS description
    FROM items
    JOIN itemtypes ON typeref = itemtypes.id
    LEFT JOIN weapons ON subref = weapons.id
    LEFT JOIN armour ON subref = armour.id
    LEFT JOIN consumables ON subref = consumables.id;
```