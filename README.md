# Jenkins Docker Build Pipeline
> A demonstration of a build pipeline using Jenkins and Docker

## Overview
This project sets up a continuous integration environment to support continuous delivery for an app and its supporting api. Jenkins CI provides the continuous integration to perform tests, build Docker images and push them to a Docker registry upon successful build completion. This project uses Docker Compose to start the following containers:
1. Jenkins CI
1. Docker Registry
1. Docker Registry UI
1. Angular application
1. Node.js Express API

## Prerequisites
1. Docker
1. Docker Compose

## Getting Started
Since the Jenkins Docker container doesn't contain a Docker daemon of its own, it must be provided a Docker socket so that it can interact with the host's Docker daemon to build and push images, and run containers. Since the Docker Registry image included in this project is not setup for authentication (requires SSL certificate), you must instruct Docker to allow accessing an insecure registry. This is done by setting your `DOCKER_OPTS` with the appropriate arguments (see the [Docker documentation](https://docs.docker.com/engine/admin/#configuring-docker) for more details):
`DOCKER_OPTS="-H tcp://0.0.0.0:2375 -H unix:///var/run/docker.sock --insecure-registry localhost:5000"`

Jenkins must also check out source code from github during the build, and so it must be provided a valid SSH private key as well as a `known_hosts` file that whitelists github.com. Since it is unsecure to store the private key inside the Jenkins Docker container, it should be mounted as a volume to the container's `/root/.ssh` directory. It usually makes the most sense to just mount the host's `.ssh` directory, which will provide the host's SSH private key, as well as its `known_hosts` file (and any other ssh configuration used on the host).

### Start the build pipeline
1. Execute `docker-compose up jenkins registry registry-ui` to start the containers necessary to support the build pipeline.
1. Navigate to `http://localhost:8080` to access the Jenkins CI console and login as `abennett`/`letmein`, then build the `docker-pipeline` job.
> NOTE: The app and api containers do not need to be running to support the build pipeline. Jenkins will build the images and run the containers itself. However, the app and api containers are part of the compose file so they can be started with ease.

### Start the app and api
1. Execute `docker-compose up app api` to start the app and api containers.
1. Navigate to `http://localhost:2000` to access the app.

### Start everything
1. Execute `docker-compose up` to start all containers.

## Maintainer
Adam Bennett (adam.bennett@pointsource.com)
