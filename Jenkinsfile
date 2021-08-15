pipeline {
  agent any
  stages {
    stage('build ClientApp') {
      agent {
        docker {
          image 'node:latest'
          args '-v /nginx_www:/nginx_www'
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
ls /nginx_www/
'''
      }
    }

  }
}