# Base image
FROM nginx

# Install dependencies
RUN apt-get update -qq && apt-get -y install apache2-utils


# Set our working directory inside the image
WORKDIR ./

ENV ROOT=$pwd

# create log directory
RUN mkdir log

# copy over static assets
RUN mkdir -p frontend/build
COPY frontend/build frontend/build

# Copy Nginx config template
COPY nginx.conf /tmp/docker.nginx

# substitute variable references in the Nginx config template for real values from the environment
# put the final config in its place
RUN envsubst '$ROOT' < /tmp/docker.nginx > /etc/nginx/conf.d/default.conf

EXPOSE 80
# Use the "exec" form of CMD so Nginx shuts down gracefully on SIGTERM (i.e. `docker stop`)
CMD [ "nginx", "-g", "daemon off;" ]
