pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/DeynerZavala/pathway-edu_backend_ms1.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ms1 ."
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

        stage('Load and Run Docker Image on VM') {
            steps {
                withCredentials([file(credentialsId: 'google-cloud-jenkins', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                    sh 'gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS'
                    sh """
                        gcloud compute ssh ${GCP_INSTANCE} --project=${GCP_PROJECT} --zone=${GCP_ZONE} --command="
                            if ! docker network inspect ${DOCKER_NETWORK} &> /dev/null; then
                                docker network create ${DOCKER_NETWORK};
                            fi;
                            if [ \$(docker ps -q -f name=ms1) ]; then
                                docker stop ms1 && docker rm ms1;
                            fi;
                            docker load -i /home/jenkins/ms1.tar;
                            docker run -d --name ms1 --network=${DOCKER_NETWORK} -p ${MS1_PORT}:3000 ms1;
                            rm /home/jenkins/ms1.tar;
                        "
                    """
                }
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
