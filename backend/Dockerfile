# Use the official OpenJDK image as the base image
FROM openjdk:17-jdk

# Copy the built artifact into the image
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

# Set the port the container will listen on
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java","-jar","/app.jar"]
