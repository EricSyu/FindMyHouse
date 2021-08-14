pipeline {
  agent any
  stages {
    stage('ClientApp') {
      agent {
        docker {
          image 'node:latest'
        }

      }
      steps {
        sh '''cd ClientApp/
npm install
npm run build'''
      }
    }

  }
}