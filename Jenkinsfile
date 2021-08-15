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
npm install
npm run build'''
      }
    }

    stage('deploy ClientApp') {
      steps {
        sh '''deploy_dir=\'/nginx_www/house_viewer/\'
rm -rfv $deploy_dir
cp -rv build/ $deploy_dir'''
      }
    }

  }
}