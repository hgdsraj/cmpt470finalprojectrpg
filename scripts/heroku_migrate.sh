cp db/production.yml db/dbconf.yml
goose -env production up
