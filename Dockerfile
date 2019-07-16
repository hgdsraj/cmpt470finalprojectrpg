FROM golang:latest as build
LABEL version="1.1"

RUN mkdir -p /go/src/sfu.ca/apruner/cmpt470finalprojectrpg

RUN go get -u github.com/golang/dep/cmd/dep

COPY . /go/src/sfu.ca/apruner/cmpt470finalprojectrpg

WORKDIR /go/src/sfu.ca/apruner/cmpt470finalprojectrpg

RUN dep ensure

RUN go build main.go


FROM node:10-alpine
COPY --from=build /go/src/sfu.ca/apruner/cmpt470finalprojectrpg .

RUN npm install --prefix frontend/
RUN npm run build --prefix frontend/

EXPOSE $PORT

CMD ["./main"]


