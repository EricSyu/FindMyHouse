pipeline {
  agent any
  stages {
    stage('build ClientApp') {
      agent {
        docker {
          image 'node:latest'
        }

      }
      steps {
        sh '''cd ClientApp/
'''
      }
    }

    stage('deploy ClientApp') {
      steps {
        sh '''cd ClientApp/
deploy_dir=\'/nginx_www/house_viewer/\'
ls build/
ls /nginx_www/'''
      }
    }

  }
}