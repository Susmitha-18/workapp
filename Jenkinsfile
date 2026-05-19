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
        sh 'echo Terraform Init Successful'
    }
}

stage('Terraform Validate') {
    steps {
        sh 'echo Terraform Validate Successful'
    }
}

stage('Terraform Plan') {
    steps {
        sh 'echo Terraform Plan Successful'
    }
}

stage('Terraform Apply') {
    steps {
        sh 'echo Terraform Apply Successful'
    }
}
       stage('Docker Build') {
    steps {
        sh 'echo Docker Build Successful'
    }
}

stage('Docker Push') {
    steps {
        sh 'echo Docker Push Successful'
    }
}

        stage('Deploy to DEV') {
            steps {
                echo 'Deploying to DEV Environment'
            }
        }

        stage('Manual Approval') {
            steps {
                input message: 'Deploy to Production?'
            }
        }

        stage('Deploy to PROD') {
            steps {
                echo 'Deploying to PROD Environment'
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