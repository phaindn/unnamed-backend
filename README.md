# README

A boilerplate for [Node.js](https://nodejs.org/en) App.

* This boilerplate is built using [Express.js](https://expressjs.com/) web framework, and is using [Typescript Lang](https://www.typescriptlang.org/) for writing the app's logic. 
* It uses Node's [Cluster API](https://nodejs.org/api/cluster.html), this helps us to take advantage of multi-core systems & to handle the load.
* For storing custom constant configurations within the `process.env` - [DotEnv](https://github.com/motdotla/dotenv) package is used.
* For Database - Repo contains the use of [Mongoose](https://mongoosejs.com/) (ie. [MongoDB](https://www.mongodb.com/) object modeling for [Node.js](https://nodejs.org/en/)).
* For Cache - Repo contains the use of [memory-cache](https://github.com/ptarjan/node-cache#readme) (ie. A simple in-memory cache for node.js).
* For Routing - Repo contains the use of [express-router](https://expressjs.com/en/guide/routing.html) & have distributed Routes into two files ie. Web Routes & API Routes. 
* For Route Auth Middleware - Web routes are configured with [CSRF Token](https://github.com/krakenjs/lusca) while the API routes are configured with [JSON Web Token](https://github.com/auth0/express-jwt).
* For Strategies Auth - Repo contains the use of the [Passport.js](https://github.com/jaredhanson/passport). Passport.js is compatible with Express.js and is authentication middleware for Node.js.
* For Logging - Repo uses custom Log class built in middlewares folder, and it creates logs file by date & removes the log files after 'X' days (You can define that 'X' in the `.env` file).
* For Handling Exception - Repo contains two classes ie. `Handler` & `NativeEvent`.
* To Log - use `Log.info('Your message should go here!')`. Other options for logging are `Log.warn`, `Log.error` & `Log.custom`.
* For views - Repo contains the use of [PUG](https://github.com/pugjs/pug) template engine.
* For background queues - Repo contains the use of [Kue](https://github.com/Automattic/kue). For more details, please review the [Queue](https://github.com/faizahmedfarooqui/nodets/blob/master/src/providers/Queue.ts) class.

# Contents

* [Global Requisites](#global-requisites)
* [Install, Configure & Run](#install-configure--run)

# Global Requisites

* node (>= 10.5.0)
* tsc (>= 3.0.1)
* typescript (>= 3.0.1)
* pg (>= 8.11.2)
* redis

# Install, Configure & Run

Below mentioned are the steps to install, configure & run in your platform/distributions.

```bash
# Clone the repo.
git clone https://github.com/GeekyAnts/express-typescript.git;

# Goto the cloned project folder.
cd nodets;
```

```bash
# Without Docker

# Note: It is assumed here that you have MongoDB running in the background and that you have created the database.

# Install NPM dependencies.
# Note: You can review the list of dependencies from the below link.
# https://github.com/faizahmedfarooqui/nodets/network/dependencies
npm install;

# Edit your DotEnv file using any editor of your choice.
# Please Note: You should add all the configurations details
# or else default values will be used!
vim .env;

# Run the app
npm run dev;
```

```bash
# With Docker

# Note: It is assumed here that you have Docker running in the background.

# Run the app in docker as a foreground process
docker-compose up

# Run the app in docker as a background process
docker-compose up -d
```
