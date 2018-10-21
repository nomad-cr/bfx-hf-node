## HF Algorithmic Orders Server Node

[Docker Compose](https://docs.docker.com/compose/overview/) definition of which
setups two containers:

* MongoDB container for database
* [bfx-hf-server](https://github.com/nomad-cr/bfx-hf-node/tree/master/bfx-hf-server) container for server

Also creates dedicated network to connect containers.

### Prerequisites

1. Any distribution Linux server with public IP address that can run Docker.
2. Installed up and running [Docker](https://docs.docker.com/).
3. Installed [Docker Compose](https://docs.docker.com/compose/overview/).
4. Installed [git](https://git-scm.com/) tool.

There are a number of ways to meet above requirements:
* Manual installation (expert mode)
* One may already have a server meeting above requirements
* Setup a cloud server meeting above prerequisites (preferred)

Preferred and easiest way is to setup a Linux server in the cloud.
Almost every cloud hosting provider has a ready to use Linux image
with Docker and Docker Compose preinstalled and configured with
public IP, making installation as easy as few clicks. For example:
* DigitalOcean - [ready to use image](https://www.digitalocean.com/products/one-click-apps/docker/)
* TODO: add more references

### Installation

Once logged into console of your Docker enabled Linux server, the following
steps should be applied:

1. In preferred location on your server `mkdir ~/my-bfx && cd ~/my-bfx`
2. Clone the repository: `git clone https://github.com/nomad-cr/bfx-hf-node.git`
3. `cd bfx-hf-node`
4. Checkout version: `git checkout tags/v1.0.4`

For Bitfinex:

5. Create and run the containers (only once):
```
API_KEY=change-me API_SECRET=change-me docker-compose -p bitfinex up -d
```

For Eithfinex:

5. Create and run the containers (only once):
```
PLATFORM=ETHFINEX API_KEY=change-me API_SECRET=change-me docker-compose -p ethfinex up -d
```

Note that, Bitfinex and Ethfinex currently does not support two instances of HF
Algorithmic Orders per user account. Make sure that only one set of containers
is up and running.
 
One can easily create and start more instances than one instance of server at the same time, for example:
```
API_KEY=account1-key API_SECRET=account1-secret SERVER_PORT=18877 docker-compose -p bfx-account1 up -d
API_KEY=account2-key API_SECRET=account2-secret SERVER_PORT=28877 docker-compose -p bfx-account2 up -d
```
Above will run two MongoDB containers and two `bfx-hf-server`s, one pair per each account.
Same is applicable to Ethfinex, which can run in parallel to Bitfinex ones with different accounts:
```
PLATFORM=ETHFINEX API_KEY=account3-key API_SECRET=account3-secret SERVER_PORT=38877 docker-compose -p efx-account3 up -d
PLATFORM=ETHFINEX API_KEY=account4-key API_SECRET=account4-secret SERVER_PORT=48877 docker-compose -p efx-account4 up -d
```

Note that, name after `-p` flag should be unique amoung instances, it is project for Docker Compose,
refer to its documentation. Basically it is used to prefix container, network and volume names.

Also make sure that, your Linux server is properly sized (RAM, Disk space) to handle many containers.

### Stopping

To stop the server:

```
cd ~/my-bfx/bfx-hf-node
docker-compose -p bfx-account1 stop
```

### Starting

To start the server again:

```
cd ~/my-bfx/bfx-hf-node
docker-compose -p bfx-account1 start
```

For starting and stopping, if you are using single instance only, and didn't specify `-p` flag
at the time of initial `up` command, you can omit the flag.


