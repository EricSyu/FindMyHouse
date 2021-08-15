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
mkdir build/
echo ss > ss.txt'''
      }
    }

    stage('deploy ClientApp') {
      steps {
        sh '''pwd
cd ClientApp/
ls build/
ls /
ls /nginx_www/'''
      }
    }

  }
}