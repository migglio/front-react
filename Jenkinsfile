pipeline {
	agent {
		label 'master'
	}
	stages {
		stage('Deploy') {
			steps {
				sh 'heroku git:clone -a tesis-react-app'
				sh 'cd tesis-react-app'
				sh 'git add .'
				sh 'git commit -am "make it better"'
				sh 'git push heroku master'
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
