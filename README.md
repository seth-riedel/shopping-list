# About
This is a sample shopping list app using React, Redux, Material UI, with Node, Express, and MySQL on the backend. 
The entire project can be spun up using docker. 

## Adminer
This project also stands up an instance of Adminer, a simple GUI for interacting with MySQL. By default it will run locally on port 8080.

## Prerequisites
* Node >= 14.0.0
* npm >= 6.0.0
* Docker

## Installation 
* Run `npm install` inside of the `ui` and `api` directories
* From the root of the repository, run `npm run dc:build` to download and build the necessary docker images for the first time
* From the root of the repository, run `npm run start` to start the entire stack using docker
* Navigate to the "adminer" UI Manually seed the database:
  * Navigate to adminer at http://localhost:8080 and log in with the default MySQL credentials (currently hard-coded in `devops/docker-compose.yml` and `api/lib/db.js`)
  * Run the SQL in `devops/sql/db.sql` to create the database and required table(s) 

The UI will be hosted by default on port 3000, and the API on port 3001