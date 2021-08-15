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
        sh '''deploy_dir=\'/nginx_www/house_viewer/\'
ls
ls $deploy_dir'''
      }
    }

  }
}