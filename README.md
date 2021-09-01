# Etheroll ReactJS

[![Build Status](https://travis-ci.org/AndreMiras/etheroll.svg?branch=develop)](https://travis-ci.org/AndreMiras/etheroll)

* Production: <https://andremiras.github.io/etheroll/>
* Staging: <https://etheroll.herokuapp.com/>

Experimental project running an alternative [Etheroll](http://etheroll.com) frontend on [ReactJS](https://reactjs.org).
If you're looking for the mobile app instead, see [EtherollApp](https://github.com/AndreMiras/EtherollApp).

## Closed down
The upstream project/smart-contract closed down.
<https://www.reddit.com/r/etheroll/comments/peeekh/etheroll_is_closing_down/>

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
docker-compose up
```
The application will be served on both port `80` (default HTTP) and `3000` (default Node.js port).
Find out more reading the [docker-compose.yml](docker-compose.yml) file.

## Deployment
The app can be deployed on GitHub pages when releasing via:
```sh
make deploy
```
It can also be deployed on Heroku for staging:
```
git push heroku develop:master
```
