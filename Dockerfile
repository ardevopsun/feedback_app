# Use a lightweight OpenJDK image
#FROM openjdk:17-jdk-slim

# Set working directory
#WORKDIR /app

# Copy jar file
#COPY target/feedback_app-1.0.0.jar app.jar

# Expose port
#EXPOSE 8080

# Run the Spring Boot application
#ENTRYPOINT ["java", "-jar", "app.jar"]

# Stage 1: Build the Spring Boot app
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Stage 2: Run the app with a slim runtime
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]

