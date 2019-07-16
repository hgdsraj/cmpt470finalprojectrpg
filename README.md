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

### Build the app with docker (CURRENTLY NOT WORKING, IGNORE THIS)
- Ensure you have docker installed (`brew install docker` or `sudo apt-get install docker`)
- Run `sudo sh scripts/docker.sh`
- Visit localhost:8000 in your browser. Voila!

### To build and run the app locally (using go build, recommended for development)
- Run `sh scripts/local.sh`
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

The Items table holds a type reference and a sub reference. The type reference is used to determine the type of item 
and is tied to the id column of the item_types table. The sub reference is used to determine the exact item of a 
certain type.

The following can be input into the psql console to populate some values into the items and then print out all items:
```postgresql
INSERT INTO weapons (name, damage, speed, critchance) VALUES ('sword', 2, 2, 2), ('spear', 3, 1, 1), ('axe', 4, 1, 0);
INSERT INTO armour (name, defense, weight) VALUES ('Chestplate', 5, 5), ('Helmet', 3, 1), ('Leggings', 4, 3);
INSERT INTO consumables (name, healing, damage) VALUES ('Potion', 4, 0), ('Apple', 2, 0), ('PosionBerry', 0, 3);
INSERT INTO items (typeref, subref) VALUES (1,1), (1,2), (1,3), (2,1), (2,2), (2,3), (3,1), (3,2), (3,3);

--LIST ALL ITEMS IN GAME
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