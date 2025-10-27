pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:${env.PATH}"
    }

    stages {
        stage('Parando los servicios...') {
            steps {
                sh '''
                    docker compose -p SGU-LSFT-10B down || true
                '''
            }
        }

        stage('Eliminando imágenes anteriores...') {
            steps {
                sh '''
                    IMAGES=$(docker images --filter "label=com.docker.compose.project=SGU-LSFT-10B" -q)
                    if [ -z "$IMAGES" ]; then
                        echo "No hay imágenes por eliminar"
                    else
                        docker rmi -f $IMAGES || true
                        echo "Imágenes eliminadas correctamente"
                    fi
                '''
            }
        }

        stage('Obteniendo actualización...') {
            steps {
                checkout scm
            }
        }

        stage('Construyendo y desplegando servicios...') {
            steps {
                sh '''
                    docker compose up --build -d
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline ejecutado con éxito'
        }
        failure {
            echo 'Hubo un error al ejecutar el pipeline'
        }
        always {
            echo 'Pipeline finalizado'
        }
    }
}