# Use official Java 17 image
FROM eclipse-temurin:17-jdk

# Set working directory
WORKDIR /app

# Copy Maven wrapper and pom
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Download dependencies
RUN ./mvnw dependency:go-offline

# Copy source
COPY src src

# Build app
RUN ./mvnw clean package -DskipTests

# Expose port
EXPOSE 8080

# Run Spring Boot jar
CMD ["java", "-jar", "target/*.jar"]
