pipeline {
  agent any
  stages {
    stage('build') {
      parallel {
        stage('ClientApp') {
          agent {
            docker {
              image 'node:latest'
              args '-v /var/jenkins_home/publish:/publish -e TZ=Asia/Taipei'
            }

          }
          steps {
            sh '''cd ClientApp/
npm install
npm run build
cd build/
tar -zcvf /publish/HouseViewer_ClientApp_$(date \'+%Y%m%d%H%M\').tar.gz .
'''
          }
        }

        stage('WebApi') {
          agent any
          steps {
            sh '''cd WebApi/
IMG_NAME=\'house-viewer-webapi\'
docker build -t $IMG_NAME .
docker save $IMG_NAME:latest | gzip > /var/jenkins_home/publish/HouseViewer_WebApi_$(date \'+%Y%m%d%H%M\').tar.gz
docker rmi $(docker images -q $IMG_NAME)
'''
          }
        }

      }
    }

    stage('complete') {
      steps {
        echo 'complete to build and package to publish directory'
      }
    }

  }
}