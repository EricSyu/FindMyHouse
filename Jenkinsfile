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
        sh '''pwd
cd ClientApp/
mkdir build/
echo ss > build/ss.txt
ls
pwd'''
        sh '''pwd
ls
cd ClientApp/
ls build/
ls /
ls /nginx_www/
'''
      }
    }

  }
}