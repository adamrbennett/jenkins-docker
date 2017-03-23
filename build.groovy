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
      sh 'npm --prefix api test'
    }
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

// pipeline {
//   agent {
//     docker {
//       image 'node:7.4'
//     }
//   }
//
//   stages {
//     stage('Build App') {
//       steps {
//         withNPM(npmrcConfig: 'npmrc') {
//           echo "Performing npm build..."
//           sh 'npm -q install --prefix app'
//         }
//       }
//     }
//
//     stage('Unit Test') {
//       steps {
//         sh 'npm --prefix app test'
//         junit 'app/test-results.xml'
//         publishHTML (target: [
//           allowMissing: false,
//           alwaysLinkToLastBuild: false,
//           keepAll: false,
//           reportDir: 'app/coverage',
//           reportFiles: 'index.html',
//           reportName: "Coverage Report"
//         ])
//       }
//     }
//
//     def img
//     stage('Build Images') {
//       steps {
//         img = docker.build("localhost:5000/jenkins-docker-app:${env.BUILD_NUMBER}", '-f app/Dockerfile app')
//       }
//     }
//   }
// }

  // node {

    // docker.withRegistry('http://localhost:5000/') {
    //
    //   def prodImg
    //   def unitTestImg
    //
    //   stage('Build') {
    //     prodImg = docker.build("localhost:5000/jenkins-docker-app:${env.BUILD_NUMBER}", '-f app/Dockerfile app')
    //     unitTestImg = docker.build("localhost:5000/jenkins-docker-unit-test:${env.BUILD_NUMBER}", '-f app/Dockerfile.unit-test app')
    //   }
    //
    //   stage('Unit Test') {
    //     unitTestImg.withRun('-v app:/usr/src/app', 'npm test') {
    //       junit 'app/test-results.xml'
    //
    //       publishHTML (target: [
    //         allowMissing: false,
    //         alwaysLinkToLastBuild: false,
    //         keepAll: false,
    //         reportDir: 'app/coverage',
    //         reportFiles: 'index.html',
    //         reportName: "Coverage Report"
    //       ])
    //     }
    //   }
    //
    //   stage('Publish') {
    //     prodImg.push()
    //   }
    //
    // }
  // }
// }
