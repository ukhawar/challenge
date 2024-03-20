# Soliver App

Soliver is a Vue 3 TypeScript application that is easy to set up and run with Docker.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed [Docker](https://www.docker.com/get-started) on your machine.

## Building the Docker Image

To build the Docker image for the Soliver app, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/ahv1365/soliver_challenge.git
   cd soliver_challenge

   ```

2. docker build -t soliver-app .

# ------------------------------------------------

## Running the Docker Container

- docker run -d -p 8081:80 --name soliver soliver-app

## Stopping the Container

- docker stop soliver

## Removing the Container

- docker rm soliver

# ------------------------------------------------

# Update the container

## Pull the Latest Image

- docker pull soliver:soliver-app:latest

## Stop the Running Container

- docker stop soliver-app

## Remove the Old Container

- docker rm soliver-app

## Start a New Container with the Updated Image

- docker run -d --name soliver-app -p 8081:8081 soliver:soliver-app:latest

## Optional - Clean Up Old Images

-docker rmi soliver:soliver-app:<old_tag>
