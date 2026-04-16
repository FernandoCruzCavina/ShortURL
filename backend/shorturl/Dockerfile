FROM golang:1.26.1-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o app

FROM alpine:3.19
WORKDIR /app
COPY --from=builder /app/app .
RUN apk add --no-cache ca-certificates
EXPOSE 8080
CMD ["./app"]