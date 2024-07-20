# go build
FROM golang:1.22 AS go-build

WORKDIR /backend
COPY    backend /backend
RUN     go build -o server 

# node build
FROM node:22.5.1 AS node-build

WORKDIR /build
COPY ./ /build
RUN \
    npm i && \
    npm run build

#
# final stage:
#
FROM ubuntu

WORKDIR /app

COPY /public /app/dist/public

COPY --from=go-build \
    /backend/server \
    /app/server

COPY --from=node-build \
    /build/dist \
    /app/dist/



CMD ["/app/server"]