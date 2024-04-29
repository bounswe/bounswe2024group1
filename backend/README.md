# Setting up Backend App and Build
* Here we will setup the backend app and build the app.
## Requirements
* Java 17.0.5 or higher
* Maven 3.6.1 or higher
* IDE (IntelliJ IDEA, Eclipse, NetBeans, etc.) IntelliJ IDEA is recommended.
* Postman or any other tool to test the app.
* Git
* Command Line Interface (CLI) or Terminal
* MYSQL Server (for now, DB requirments can be changed in the future. Please keep track development notes.)
* Docker 
* Docker Compose
## Setup and Build
1. Clone the repository using the following command:
`git   clone <REPO_URL> `
2. Change the directory to the cloned repository:
` cd <REPO_NAME>`
3. Change the directory to the backend directory:
` cd backend`
4. To build app, run the following command:
`mvn clean install`
5. To run the app, run the following command:
`mvn spring-boot:run` or you can run the jar file generated in the target directory using the following command:
`java -jar target/<JAR_FILE_NAME>.jar` And also you can run the app with run button in your IDE.
6. To debug the app, you are encouraged to use the IDE debugger. (You can also use the command line debugger, but it is not recommended.)
7. To test the app, you can use the Postman tool or the any other tool you prefer.
8. To stop the app, you can use the stop button in your IDE or you can use the following command:
`Ctrl + C`
9. To clean the previous build, you can use the following command:
`mvn clean` (This will clean the target directory.However, if you want to build from scratch, you can use the following command: `mvn clean install`)
10. To run tests, you can use the following command:
`mvn test` But when you run or build the app, the tests will be run automatically.

## Docker
1. To build and run the docker  in container, make sure that you are in the backend directory and run the following command:
`docker compose up --build`
2. To stop the docker container, run the following command:
`docker compose down`
3. To remove the docker container, run the following command:
`docker compose rm <CONTAINER_NAME>`
4. To remove the volume, run the following command:
`docker volume rm <VOLUME_NAME>`
5. To list the docker containers, run the following command:
`docker ps` or , `docker ps -a` to list all containers.

## Notes
**Note:** Make sure that you have installed the docker and docker compose in your machine. If not, please install them before running the above commands.

**Note:** Make sure that you enabled environment variables in your machine. If not, please enable them before running the above commands.

**Note:** Make sure that you have installed the MYSQL Server in your machine. If not, please install it before running the above commands.

**Note:** Make sure that before running backend-app in your local machine, you have to run the MYSQL Server in your local machine. If not, please run it before running the backend-app.

**Note:** Make sure that before running backend-app in your local machine,you have to rearrange application.properties file in the src/main/resources directory(db USERNAME, PASSWORD, port if not default one etc). If not, please rearrange it before running the backend-app.

## Resources

* [About Maven Commands ](https://www.geeksforgeeks.org/maven-lifecycle-and-basic-maven-commands/)

