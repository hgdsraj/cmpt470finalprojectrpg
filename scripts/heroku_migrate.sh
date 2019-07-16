cp db/dbconf.yml db/back.yml
touch db/prod.yml
printf "production:\n  driver: postgres\n  open: $(heroku config | grep DATABASE_URL: | sed -En "s/DATABASE_URL: //p")" > db/prod.yml
cp db/prod.yml db/dbconf.yml
goose -env production up
cp db/back.yml db/dbconf.yml
rm db/back.yml
rm db/prod.yml
