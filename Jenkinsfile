pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/your-org/pathway-edu-backend-ms1.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${GCR_REGISTRY}/microservice1 .'
            }
        }

        stage('Push Docker Image to GCR') {
            steps {
                withCredentials([file(credentialsId: 'google-cloud-jenkins', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                    sh 'gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS'
                    sh 'gcloud auth configure-docker'
                    sh 'docker push ${GCR_REGISTRY}/microservice1'
                }
            }
        }

        stage('Deploy to Google Cloud VM') {
            steps {
                withCredentials([file(credentialsId: 'google-cloud-jenkins', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                    sh 'gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS'
                    sh """
                        gcloud compute ssh ${GCP_INSTANCE} --project=${GCP_PROJECT} --zone=${GCP_ZONE} \
                        --command="docker run -d --network=${DOCKER_NETWORK} --name ms1 -p 3001:3001 \
                                   -e DB_HOST=db -e DB_PORT=5432 -e DB_USERNAME=postgres -e DB_PASSWORD=admin123 -e DB_DATABASE=PathwayEduM1 ${GCR_REGISTRY}/microservice1"
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Microservice 1 deployment successful!'
        }
        failure {
            echo 'Microservice 1 deployment failed.'
        }
    }
}

