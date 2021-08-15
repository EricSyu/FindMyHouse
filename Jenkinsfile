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
echo ss > build/ss.txt'''
      }
    }

    stage('deploy ClientApp') {
      steps {
        sh '''pwd
ls
cd ClientApp/
ls build/
ls /
ls /nginx_www/'''
      }
    }

  }
}