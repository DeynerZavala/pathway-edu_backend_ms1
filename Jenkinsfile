pipeline {
    agent any

    environment {
        GOOGLE_APPLICATION_CREDENTIALS = credentials('google-cloud-jenkins')
        GCP_PROJECT = 'your-gcp-project-id'
        GCP_ZONE = 'your-gcp-zone'
        GCP_INSTANCE = 'your-instance-name'
        DOCKER_NETWORK = 'my-network'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/your-org/pathway-edu-api-gateway.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t your-repo/api-gateway .'
            }
        }

        stage('Push Docker Image') {
            steps {
                sh 'docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD'
                sh 'docker push your-repo/api-gateway'
            }
        }

        stage('Deploy to Google Cloud VM') {
            steps {
                sh """
                    gcloud compute ssh ${GCP_INSTANCE} --project=${GCP_PROJECT} --zone=${GCP_ZONE} \
                    --command="docker run -d --network=${DOCKER_NETWORK} --name api-gateway -p 3000:3000 your-repo/api-gateway"
                """
            }
        }
    }

    post {
        success {
            echo 'API Gateway deployment successful!'
        }
        failure {
            echo 'API Gateway deployment failed.'
        }
    }
}
