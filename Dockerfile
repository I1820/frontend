FROM node:alpine as builder-front

WORKDIR /app

# Install all dependencies of the current project.
COPY package.json package.json
RUN npm install

# Copy all local files into the image.
COPY . .

RUN npm run build

FROM golang:1.12-alpine3.9 as builder-server

WORKDIR /app

RUN apk --no-cache add git ca-certificates git gcc g++ libc-dev

COPY . .
RUN go build -o /bin/app


FROM alpine:3.9

WORKDIR /bin/

COPY --from=builder-server /bin/app .
COPY --from=builder-front /app/build .

EXPOSE 7080

# Metadata
ARG BUILD_DATE
ARG BUILD_COMMIT
ARG BUILD_COMMIT_MSG
LABEL maintainer="Parham Alvani <parham.alvani@gmail.com>"
LABEL org.i1820.build-date=$BUILD_DATE
LABEL org.i1820.build-commit-sha=$BUILD_COMMIT
LABEL org.i1820.build-commit-msg=$BUILD_COMMIT_MSG

CMD ["/bin/app"]
