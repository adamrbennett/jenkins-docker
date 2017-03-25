# Jenkins Docker Build Pipeline
> A demonstration of a build pipeline using Jenkins and Docker

## Overview
This project sets up a continuous integration environment to support continuous delivery for an app and its supporting api. Jenkins CI provides the continuous integration to perform tests, build Docker images and push them to a Docker registry upon successful build completion. This project uses Docker Compose to start the following containers:
1. Jenkins CI
1. Docker Registry
1. Docker Registry UI
1. Angular application (app)
1. Node.js Express API (api)

## Prerequisites
1. [Docker](https://docs.docker.com/engine/installation/)
1. [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started
Since the Jenkins Docker container doesn't contain a Docker daemon of its own, it must be provided a socket to the Docker API, as well as necessary permissions, so that it can interact with the host's Docker daemon to build and push images, and run containers. The Docker Compose configuration attempts to grant the Jenkins container permissions to interact with the host's Docker daemon, by assigning the container process to the host group `docker` using the well known group id (999). If the `docker` group on the host uses a different id, then the compose file will need to be modified to match its group id. See the [Docker documentation](https://docs.docker.com/engine/reference/run/#additional-groups) for more details.

Since the Docker Registry image included in this project is not setup for authentication (requires SSL certificate), you must instruct Docker to allow accessing an insecure registry. This is done by setting your `DOCKER_OPTS` with the appropriate arguments (see the [Docker documentation](https://docs.docker.com/engine/admin/#configuring-docker) for more details):
`DOCKER_OPTS="-H tcp://0.0.0.0:2375 -H unix:///var/run/docker.sock --insecure-registry localhost:5000"`

Jenkins must also check out source code from github during the build, and so it must be provided a valid SSH private key as well as a `known_hosts` file that whitelists github.com. Since it is insecure to store the private key inside the Jenkins Docker container, it should be mounted as a volume to the container's `/root/.ssh` directory. It usually makes the most sense to just mount the host's `.ssh` directory, which will provide the host's SSH private key, as well as its `known_hosts` file (and any other ssh configuration used on the host). Make sure the mount specified in the compose file is appropriate for your environment and points to a valid `.ssh` directory.

#### Start the build pipeline
1. Execute `docker-compose up jenkins registry registry-ui` from the repository root to start the containers necessary to support the build pipeline.
1. Navigate to `http://localhost:8080` to access the Jenkins CI console and login as `abennett`/`letmein`, then build the `docker-pipeline` job.
1. Navigate to `http://localhost:8088` to access the Docker registry web UI.
> NOTE: The app and api containers do not need to be running to support the build pipeline. Jenkins will build the images and run the containers itself. However, the app and api containers are part of the compose file so they can be started with ease for testing and development.

#### Start the app and api
1. Execute `docker-compose up app api` from the repository root to start the app and api containers.
1. Navigate to `http://localhost:2000` to access the app.

#### Start everything
1. Execute `docker-compose up` from the repository root to start all containers.

## The Pipeline
The Jenkins build pipeline consists of a series of steps which prepares the code for release and tests various functions of the app and api, as the code moves through stages of increasingly production-like environments. The pipeline definition is declared in the `Jenkinsfile` at the root of this repository, and is read by Jenkins when performing a build -- this is a good place to start if you want a deeper understanding of all that is involved in testing and releasing.

#### Unit Test Step
> At the moment, only the app has unit tests. Unit tests for the api will be added later.

This step executes unit tests against the Angular app using Karma with PhantomJS for DOM mocking, and Mocha, Chai and Sinon for test running, assertion and mocking. The results are stored in a JUnit xml format, using the `junit` Karma reporter, and are integrated with Jenkins by the `junit` plugin. The results are available in Jenkins on a build page (not the job), under the Test Result link. Tests results for the life of the job can be found on the job page, under the Test Results Analyzer menu link.

In addition, code coverage is performed at this step by Karma, using the `coverage` pre-processor and corresponding reporter (istanbul-backed). The code coverage results are then published in Jenkins by the `htmlreporter` plugin, and are accessible in Jenkins on the job page, under the Code Coverage Report link.

#### Acceptance Test Step
> At the moment, only the api has acceptance tests. Acceptance tests for the app may be added later.

This step executes acceptance tests against the api, using Cucumber.js and feature specifications that use the Gherkin syntax. The results are output as JSON, and the `test-report.js` script is executed to generate an HTML report from the JSON output using the `cucumber-html-reporter` npm module. The HTML report is then published in Jenkins with the `htmlreporter` plugin. The report is available in Jenkins on the job page, under the Acceptance Test Results link.

#### Build Step
This step builds the Docker images for the app and api using their respective Dockerfiles. If the images are successfully built, they are then used for the remaining steps in the pipeline. It is at this stage the code is ready for deployment, and subsequent testing will be performed against the deployed artifacts.

#### Integration Test Step
This step runs the api Docker container and binds it to host port 3000. Then the integration tests are executed using the `jenkins-mocha` npm module which generates a JUnit test result xml file which is then provided to the Jenkins `junit` plugin. The results are combined with any other test results and made available in the Test Result link on the build page (not the job page).

#### Benchmark Test Step
*To be implemented.*

Benchmark tests execute a fixed, pre-determined load against the containers, in a controlled environment, to measure various things like throughput, response time, etc. Any negative deviations from the established benchmark would fail the build and alert the necessary parties (i.e.: the committer).

#### Publish Step
If the pipeline makes it to this stage, then all of the tests have passed and the app and api images are pushed to the Docker registry. The images are tagged with the current Jenkins build number and "latest". Once the images are pushed to the registry, they will be visible in the Docker registry UI at `http://localhost:8088`.

#### Staging Step
*To be implemented.*

Containers deployed to a staging environment, similar to production, where further tests can be performed.

#### Load Test Step
*To be implemented.*

Load tests execute against the containers running in the staging environment to gather metrics under various loads and ensure the acceptable thresholds for performance are met.

#### Documentation Step
*To be implemented.*

Documentation is generated from code artifacts (e.g.: tests, feature specifications, JSDoc, Swagger, etc) and published.

#### Release Step
*To be implemented.*

Containers deployed to production, and any other actions necessary for release are performed.

## Notes

1. Most of the things you might want to change are declared in the `docker-compose.yml` file located at the repository root. Items such as ports and URLs are declared here and can be changed to suit your environment, for example to resolve port conflicts.

## Maintainer
Adam Bennett (adam.bennett@pointsource.com)
