# Use Eclipse Temurin for Java 21 on Alpine Linux (very small and secure)
FROM eclipse-temurin:21-jre-alpine

# Create a directory for our app
WORKDIR /app

# Copy the JAR from your target folder to the container
# IMPORTANT: Replace 'backend-0.0.1-SNAPSHOT.jar' with your actual filename
COPY target\service-registry-0.0.1-SNAPSHOT.jar app.jar

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]