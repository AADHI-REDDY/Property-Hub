# Stage 1: Build the .war file using Maven
FROM maven:3.8-eclipse-temurin-17 AS builder

WORKDIR /app

# Copy project files
COPY . .

# 🔥 Add missing SpringBootServletInitializer automatically (if not present)
RUN mkdir -p src/main/java/com/property && \
    if [ ! -f src/main/java/com/property/PropertyManagementApplication.java ]; then \
        echo "package com.property;" > src/main/java/com/property/PropertyManagementApplication.java && \
        echo "import org.springframework.boot.SpringApplication;" >> src/main/java/com/property/PropertyManagementApplication.java && \
        echo "import org.springframework.boot.autoconfigure.SpringBootApplication;" >> src/main/java/com/property/PropertyManagementApplication.java && \
        echo "import org.springframework.boot.builder.SpringApplicationBuilder;" >> src/main/java/com/property/PropertyManagementApplication.java && \
        echo "import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;" >> src/main/java/com/property/PropertyManagementApplication.java && \
        echo "@SpringBootApplication public class PropertyManagementApplication extends SpringBootServletInitializer {" >> src/main/java/com/property/PropertyManagementApplication.java && \
        echo "public static void main(String[] args) { SpringApplication.run(PropertyManagementApplication.class, args); }" >> src/main/java/com/property/PropertyManagementApplication.java && \
        echo "@Override protected SpringApplicationBuilder configure(SpringApplicationBuilder app) { return app.sources(PropertyManagementApplication.class); }}" >> src/main/java/com/property/PropertyManagementApplication.java ; \
    fi

# Build WAR file
RUN mvn -B -DskipTests package

# Stage 2: Deploy to Tomcat
FROM tomcat:10.1-jdk17-temurin

RUN rm -rf /usr/local/tomcat/webapps/*

COPY --from=builder /app/target/*.war /usr/local/tomcat/webapps/ROOT.war

EXPOSE 8080
