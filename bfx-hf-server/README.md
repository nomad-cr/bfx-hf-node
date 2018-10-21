## HF Algorithmic Orders Server

Based on example from [bfx-hf-algo-server](https://github.com/bitfinexcom/bfx-hf-algo-server).

### Differences

Containerized setup in the way that:
* provides Dockerfile for server
* removes embedded MongoDB (docker containers idiomatically one process/process-type per container)
* support for `docker secret` reading of `API_KEY` and `API_SECRET`
* determines platform to connect from `PLATFORM` environment variable

Otherwise, it is same example server as published by `bfx-hf-algo-server`.

### Usage

Defined environment variables:

* `PLATFORM` - if not specified, defaults to BITFINEX, otherwise can be either BITFINEX or ETHFINEX
* `API_KEY` - if specified will be used from environment
* `API_SECRET` - if specified will be used from environment
* `MONGODB_URL` - full url of MongoDB database to connect, if not specified defaults to `mongodb://localhost/hf-as`
* `DEBUG` - defaults to "*" for now, enable debug all

If `API_KEY` and `API_SECRET` environment variables are not defined, as fallback server will try to read them
from `docker secret` files which will be `/run/secrets/API_KEY` and `/run/secrets/API_SECRET` respectively. For
additional information refer to [Docker Secrets](https://docs.docker.com/engine/swarm/secrets/) documentation.
It should be noted that, in order to use `docker secret`, Docker should be running in Swarm mode.

### Customizing Algorithmic Orders Server

By default exposes all algorithmic orders defined by [bfx-hf-algo](https://github.com/bitfinexcom/bfx-hf-algo).

If you want to add new custom algorithmic orders, put your source to `lib/algos` and add your algorithmic order
to exported from `lib/algos/index.js`.

If you want to disable one or more standard algorithmic orders, just comment out them from exported array
in `lib/algos/index.js`.

### Building Algorithmic Orders Server

Follow standard docker image build procedure which is `docker build -t <name:tag> .`.
