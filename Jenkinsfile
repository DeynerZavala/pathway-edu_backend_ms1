pipeline {
    agent any

    environment {
        GOOGLE_APPLICATION_CREDENTIALS = credentials('google-cloud-jenkins')
        GCP_PROJECT = 'your-gcp-project-id'
        GCP_ZONE = 'your-gcp-zone'
        GCP_INSTANCE = 'your-instance-name'
        DOCKER_NETWORK = 'my-network'
        GCR_REGISTRY = "gcr.io/${GCP_PROJECT}"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/your-org/pathway-edu-backend-ms1.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Construye y etiqueta la imagen para GCR
                sh 'docker build -t ${GCR_REGISTRY}/microservice1 .'
            }
        }

        stage('Push Docker Image to GCR') {
            steps {
                script {
                    // Autenticación con Google Cloud para acceder a GCR
                    sh 'gcloud auth configure-docker'
                    // Enviar la imagen a GCR
                    sh 'docker push ${GCR_REGISTRY}/microservice1'
                }
            }
        }

        stage('Deploy to Google Cloud VM') {
            steps {
                sh """
                    gcloud compute ssh ${GCP_INSTANCE} --project=${GCP_PROJECT} --zone=${GCP_ZONE} \
                    --command="docker run -d --network=${DOCKER_NETWORK} --name ms1 -p 3001:3001 \
                               -e DB_HOST=db -e DB_PORT=5432 -e DB_USERNAME=postgres -e DB_PASSWORD=admin123 -e DB_DATABASE=PathwayEduM1 ${GCR_REGISTRY}/microservice1"
                """
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
