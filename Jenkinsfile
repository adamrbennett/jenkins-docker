node {
  git 'git@github.com:adamrbennett/jenkins-docker.git'

  def nodejs = docker.image('node:7.4');

  stage('Unit Test') {
    nodejs.inside {
      sh 'npm -q install --prefix app'
      sh 'npm --prefix app test'
    }
    junit 'app/test-results.xml'
    publishHTML (target: [
      allowMissing: false,
      alwaysLinkToLastBuild: false,
      keepAll: false,
      reportDir: 'app/coverage',
      reportFiles: 'index.html',
      reportName: "Coverage Report"
    ])
  }

  stage('Acceptance Test') {
    nodejs.inside {
      sh 'npm -q install --prefix api'
      sh './api/node_modules/cucumber/bin/cucumber.js ./api/features --format=json > ./api/test-results.json'
      sh 'node ./api/test-report.js'
    }
    publishHTML (target: [
      allowMissing: false,
      alwaysLinkToLastBuild: false,
      keepAll: false,
      reportDir: 'api',
      reportFiles: 'test-results.html',
      reportName: "Acceptance Report"
    ])
  }

  docker.withRegistry('http://localhost:5000/') {
    def img

    stage('Build') {
      img = docker.build("localhost:5000/jenkins-docker-app:${env.BUILD_NUMBER}", '-f app/Dockerfile app')
    }

    stage('Publish') {
      img.push()
    }
  }
}
