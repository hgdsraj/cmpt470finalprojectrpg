FROM golang:latest
LABEL version="1.5"

RUN mkdir -p /go/src/sfu.ca/apruner/cmpt470finalprojectrpg

COPY  . /go/src/sfu.ca/apruner/cmpt470finalprojectrpg
WORKDIR /go/src/sfu.ca/apruner/cmpt470finalprojectrpg
RUN cp db/dbconf.docker.yml db/dbconf.yml

RUN go get 'bitbucket.org/liamstask/goose/cmd/goose'

ENTRYPOINT ["/go/bin/goose"]
CMD ["up"]