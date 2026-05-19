pipeline {
    agent any

    environment {
        IMAGE_NAME = "susmitha18/workapp:latest"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'develop',
                url: 'https://github.com/Susmitha-18/workapp.git'
            }
        }

        stage('Terraform Init') {
            steps {
                dir('terraform') {
                    bat '"C:\\ProgramData\\chocolatey\\bin\\bin\\terraform.exe" init'
                }
            }
        }

        stage('Terraform Validate') {
            steps {
                dir('terraform') {
                    bat '"C:\\ProgramData\\chocolatey\\bin\\bin\\terraform.exe" validate'
                }
            }
        }

        stage('Terraform Plan') {
            steps {
                dir('terraform') {
                    bat '"C:\\ProgramData\\chocolatey\\bin\\bin\\terraform.exe" plan'
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                dir('terraform') {
                    bat '"C:\\ProgramData\\chocolatey\\bin\\bin\\terraform.exe" apply -auto-approve'
                }
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t %IMAGE_NAME% .'
            }
        }

        stage('Docker Push') {
            steps {
                bat 'docker push %IMAGE_NAME%'
            }
        }

        stage('Deploy to DEV') {
            steps {
                echo 'Deploying Workspace Booking System to DEV Environment'
            }
        }

        stage('Manual Approval') {
            steps {
                input message: 'Deploy to Production?'
            }
        }

        stage('Deploy to PROD') {
            steps {
                echo 'Deploying Workspace Booking System to Production Environment'
            }
        }
    }

    post {

        success {
            echo 'Pipeline Executed Successfully'
        }

        failure {
            echo 'Pipeline Failed'
        }
    }
}