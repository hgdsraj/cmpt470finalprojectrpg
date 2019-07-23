FROM golang:latest as gobuild
LABEL version="1.5"

RUN mkdir -p /go/src/sfu.ca/apruner/cmpt470finalprojectrpg

RUN go get -u github.com/golang/dep/cmd/dep

COPY . /go/src/sfu.ca/apruner/cmpt470finalprojectrpg

WORKDIR /go/src/sfu.ca/apruner/cmpt470finalprojectrpg


RUN dep ensure

RUN go build main.go


FROM node:latest as nodebuild
COPY --from=gobuild /go/src/sfu.ca/apruner/cmpt470finalprojectrpg .
RUN npm install --prefix frontend/
RUN npm run build --prefix frontend/

EXPOSE $PORT

### Put the binary onto Heroku image
FROM heroku/heroku:18

COPY --from=nodebuild . .

CMD ["./main"]
