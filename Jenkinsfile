pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

    stages {

        stage('Manual Git Clone') {
            steps {
                sh '''
                rm -rf project
                git clone -b develop https://github.com/Susmitha-18/workapp.git project
                '''
            }
        }

        stage('Check Files') {
            steps {
                dir('project') {
                    sh 'pwd'
                    sh 'ls -la'
                }
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