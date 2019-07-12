cp db/dbconf.yml db/back.yml
cp db/prod.yml db/dbconf.yml
goose -env production up
cp db/back.yml db/dbconf.yml
rm db/back.yml
