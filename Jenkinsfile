pipeline {
    agent any

    stages {

        stage('Build Docker Images') {
            steps {
                sh 'pwd'
                sh 'ls -la'
            }
        }

        stage('Deploy to DEV') {
            steps {
                echo 'DEV Deployment Stage'
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
}