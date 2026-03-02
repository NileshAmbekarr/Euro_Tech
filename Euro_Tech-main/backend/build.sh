#!/bin/bash
# Render Build Script

echo "Starting build process..."

# Install Maven if not present
if ! command -v mvn &> /dev/null; then
    echo "Installing Maven..."
    apt-get update
    apt-get install -y maven
fi

# Clean and build the project
echo "Building Spring Boot application..."
mvn clean package -DskipTests

echo "Build completed successfully!"
