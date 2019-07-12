# CMPT 470 Demo Site

## How to build and run the app locally

- After cloning, make sure this project is in "$GOPATH/src/sfu.ca/rmahey/cmpt470project", otherwise you will run into issues

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
- Voila! You are ready to build with either docker or go build

### Build the app with docker (recommended for deployment)
- Ensure you have docker installed (`brew install docker` or `sudo apt-get install docker`)
- Run `sudo sh scripts/docker.sh`
- Visit localhost:8000 in your browser. Voila!

### To build and run the app locally (using go build, recommended for development)
- Run `sh scripts/local.sh`
- Visit localhost:8000 in your browser. Voila!

\[\[constraint\]\]
  branch = "master"
  name = "bitbucket.org/liamstask/goose"

Chat taken from tutorial here https://scotch.io/bar-talk/build-a-realtime-chat-server-with-go-and-websockets