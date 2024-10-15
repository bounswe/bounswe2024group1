# Use a base image with Maven to build the Spring Boot application
FROM maven:3.8.4 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy the Maven project file
COPY pom.xml .

# Download dependencies
RUN mvn -B dependency:go-offline

# Copy the entire project source
COPY src ./src

# Build the application JAR (Skip tests since they require db)
RUN mvn -B package -DskipTests

# Use a lighter base image for the runtime environment
FROM openjdk:23-ea-17-slim

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file from the previous stage
COPY --from=builder /app/target/ProgrammingLanguagesForum*.jar ./ProgrammingLanguagesForum.jar

EXPOSE 8080
# Command to run the application when the container starts
CMD ["java", "-jar", "ProgrammingLanguagesForum.jar"]
