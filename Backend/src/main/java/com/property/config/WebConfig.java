package com.property.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // addCorsMappings has been REMOVED to let SecurityConfig handle CORS.

    /**
     * Configures static resource handling for uploaded files.
     * This allows the frontend to access files stored in the 'uploads' directory.
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Get the absolute path to the 'uploads' directory on your server
        String uploadDir = Paths.get("uploads").toFile().getAbsolutePath();
        
        // This maps the web path /uploads/** to the physical file: path
        // e.g., a request to http://localhost:8081/uploads/properties/1/image.jpg
        // will be served from C:/.../your-project/uploads/properties/1/image.jpg
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:/" + uploadDir + "/");
    }
}