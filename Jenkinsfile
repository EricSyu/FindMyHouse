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
npm run build'''
      }
    }

  }
}