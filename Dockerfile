FROM golang:latest
LABEL version="1.0"

RUN mkdir -p /go/src/sfu.ca/rmahey/cmpt470project

RUN go get -u github.com/golang/dep/cmd/dep

COPY . /go/src/sfu.ca/rmahey/cmpt470project

WORKDIR /go/src/sfu.ca/rmahey/cmpt470project


RUN dep ensure


RUN go build main.go
EXPOSE 8000

CMD ["./main"]


