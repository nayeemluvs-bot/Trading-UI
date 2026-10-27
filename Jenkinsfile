pipeline {
  agent any

  tools {
    // Replace with the exact NodeJS installation name configured in Jenkins.
    nodejs 'Node-26'
  }

  options {
    timestamps()
    disableConcurrentBuilds()
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Environment') {
      steps {
        sh 'node --version'
        sh 'npm --version'
        sh 'test -f package.json'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh '''
          if [ -f package-lock.json ]; then
            npm ci
          else
            npm install
          fi
        '''
      }
    }

    stage('Test') {
      steps {
        sh '''
          node -e "const p=require('./package.json'); process.exit(p.scripts && p.scripts.test ? 0 : 1)"             && npm test -- --runInBand             || { echo "No compatible test script found, or tests failed; inspect package.json and adjust this stage."; exit 1; }
        '''
      }
    }

    stage('Build') {
      steps {
        sh '''
          export NODE_OPTIONS=--openssl-legacy-provider
          node -e "const p=require('./package.json'); process.exit(p.scripts && p.scripts.build ? 0 : 1)" \
          && npm run build \
          || { echo "No build script found, or build failed; inspect package.json and adjust this stage."; exit 1; }
        '''
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'dist/**,build/**,coverage/**', allowEmptyArchive: true
    }
    success {
      echo 'Trading-UI CI completed successfully.'
    }
    failure {
      echo 'Trading-UI CI failed. Review the first failing stage in Console Output.'
    }
  }
}
