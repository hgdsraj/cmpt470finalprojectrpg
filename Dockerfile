FROM golang:latest
LABEL version="1.0"

RUN mkdir -p /go/src/sfu.ca/apruner/cmpt470finalprojectrpg

RUN go get -u github.com/golang/dep/cmd/dep

COPY . /go/src/sfu.ca/apruner/cmpt470finalprojectrpg

WORKDIR /go/src/sfu.ca/apruner/cmpt470finalprojectrpg


RUN dep ensure


RUN go build main.go
EXPOSE 8000

CMD ["./main"]


