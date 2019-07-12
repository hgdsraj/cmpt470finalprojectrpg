dep ensure
echo "CREATE DATABASE cmpt470; CREATE USER admin WITH ENCRYPTED PASSWORD 'postgres'; GRANT ALL PRIVILEGES ON DATABASE cmpt470 to admin;" | sudo -u postgres psql