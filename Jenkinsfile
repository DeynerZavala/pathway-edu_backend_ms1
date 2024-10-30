pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', url: 'https://github.com/DeynerZavala/pathway-edu_backend_ms1.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ms1 .'
            }
        }

        stage('Copy Docker Image to VM') {
            steps {
                withCredentials([file(credentialsId: 'google-cloud-jenkins', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                    sh 'gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS'
                    sh 'docker save ms1 -o ms1.tar'
                    sh "gcloud compute scp ms1.tar ${GCP_INSTANCE}:/home/jenkins/ --zone=${GCP_ZONE} --project=${GCP_PROJECT}"
                }
            }
        }

        stage('Setup PostgreSQL Database and Run Microservice') {
            steps {
                withCredentials([file(credentialsId: 'google-cloud-jenkins', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                    sh 'gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS'
                    sh """
                        gcloud compute ssh ${GCP_INSTANCE} --project=${GCP_PROJECT} --zone=${GCP_ZONE} --command="
                            # Crear la red Docker si no existe
                            docker network create ${DOCKER_NETWORK};

                            docker start ${DB_HOST1};


                            # Esperar hasta que PostgreSQL esté listo
                            until docker exec ${DB_HOST1} pg_isready -U ${DB_USERNAME}; do
                                sleep 5;
                            done;

                            # Eliminar el contenedor de microservicio si ya existe y ejecutarlo de nuevo
                            docker stop ms1 && docker rm ms1;
                             
                            # Cargar y ejecutar el contenedor del microservicio
                            docker load -i /home/jenkins/ms1.tar;
                            docker run -d --name ms1 --network=${DOCKER_NETWORK} -p ${MS_PORT1}:3001 -e DB_HOST=${DB_HOST1} -e DB_PORT=5432 -e DB_USERNAME=${DB_USERNAME} -e DB_PASSWORD=${DB_PASSWORD} -e DB_DATABASE=${DB_NAME1} ms1;

                            # Eliminar archivo tar después de cargar la imagen
                            rm /home/jenkins/ms1.tar;
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
