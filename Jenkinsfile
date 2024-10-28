pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/your-org/pathway-edu-backend-ms1.git'
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

        stage('Deploy Database and Microservice') {
            steps {
                withCredentials([file(credentialsId: 'google-cloud-jenkins', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                    sh 'gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS'
                    sh """
                        gcloud compute ssh ${GCP_INSTANCE} --project=${GCP_PROJECT} --zone=${GCP_ZONE} --command="
                            # Crear contenedor de PostgreSQL si no está en ejecución
                            if [ ! \$(docker ps -q -f name=db1) ]; then
                                docker run -d --name db1 --network=${DOCKER_NETWORK} -e POSTGRES_USER=${DB_USERNAME} -e POSTGRES_PASSWORD=${DB_PASSWORD} -e POSTGRES_DB=${DB_NAME1} -v db1_data:/var/lib/postgresql/data postgres;
                            fi

                            # Reiniciar el contenedor del microservicio si está en ejecución
                            if [ \$(docker ps -q -f name=ms1) ]; then
                                docker stop ms1 && docker rm ms1;
                            fi

                            # Iniciar Microservicio
                            docker run -d --network=${DOCKER_NETWORK} --name ms1 -p 3001:3001 \
                                -e DB_HOST=db1 -e DB_PORT=5432 -e DB_USERNAME=${DB_USERNAME} \
                                -e DB_PASSWORD=${DB_PASSWORD} -e DB_DATABASE=${DB_NAME1} \
                                ${GCR_REGISTRY}/microservice1:latest
                        "
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
