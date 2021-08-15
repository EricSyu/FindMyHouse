pipeline {
  agent any
  stages {
    stage('build&publish ClientApp') {
      agent {
        docker {
          image 'node:latest'
          args '-v /var/jenkins_home/publish:/publish'
        }

      }
      steps {
        sh '''cd ClientApp/
npm install
npm run build
tar -zcvf /publish/HouseViewer_ClientApp_$(date \'+%Y%m%d%H%M\').tar.gz build'''
      }
    }

  }
}