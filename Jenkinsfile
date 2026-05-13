pipeline {
agent any

```
stages {

    stage('Clone Repository') {
        steps {
            git branch: 'develop',
            url: 'https://github.com/Susmitha-18/workapp'
        }
    }

    stage('Build Docker Images') {
        steps {
            sh 'docker build -t workspace-frontend ./frontend'
            sh 'docker build -t workspace-backend ./backend'
        }
    }

    stage('Deploy to DEV') {
        steps {
            sh 'docker-compose up -d'
        }
    }

    stage('Manual Approval for PROD') {
        steps {
            input message: 'Deploy to Production?'
        }
    }

    stage('Deploy to PROD') {
        steps {
            echo 'Production Deployment Successful'
        }
    }
}
```

}
