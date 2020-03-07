# Etheroll ReactJS

[![Build Status](https://travis-ci.org/AndreMiras/etheroll.svg?branch=develop)](https://travis-ci.org/AndreMiras/etheroll)

<https://andremiras.github.io/etheroll/>

Experimental project running an alternative [Etheroll](http://etheroll.com) frontend on [ReactJS](https://reactjs.org).
If you're looking for the mobile app instead, see [EtherollApp](https://github.com/AndreMiras/EtherollApp).

## Disclaimer
This is very early stage and experimental.
I'm learning ReactJS while building it, but I'm not a UX designer.

## Run
```sh
make start
```

## Install
```sh
make
```

## Test
```sh
make lint
make test
```

## Docker
We provide a [Dockerfile](Dockerfile) that can be used for development or production.
Build and run with:
```sh
docker-compuse up
```
The application will be server on both port `80` (default HTTP) and `3000` (default Node.js port).
Find out more reading the [docker-compose.yml](docker-compose.yml) file.
