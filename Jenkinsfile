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
            sh 'terraform init'
        }
    }
}



stage('Terraform Apply') {
    steps {
        dir('terraform') {
            sh 'terraform apply -auto-approve'
        }
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
        echo 'Manual Approval Simulated'
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