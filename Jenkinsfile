pipeline {
	agent {
		label 'master'
	}
	stages {
		stage('Deploy') {
			steps {
				sh 'ls'
			}
		}
		stage('Clean up') {
			steps {
				script {
					currentBuild.result = 'SUCCESS'
				}
			}
		}
	}
	post {
		failure {
			script {
				currentBuild.result = 'FAILURE'
			}
		}
	}
}
