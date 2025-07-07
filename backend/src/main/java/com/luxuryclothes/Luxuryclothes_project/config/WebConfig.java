package com.luxuryclothes.Luxuryclothes_project.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Servir archivos estáticos desde la carpeta 'uploads' o 'media'
        registry.addResourceHandler("/products/**")
                .addResourceLocations("file:uploads/products/")
                .addResourceLocations("file:media/products/")
                .addResourceLocations("classpath:/static/products/");
        
        // También servir desde la carpeta de Django si está en la misma máquina
        registry.addResourceHandler("/media/**")
                .addResourceLocations("file:../adminpanel/media/")
                .addResourceLocations("file:./adminpanel/media/")
                .addResourceLocations("file:media/");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000", "http://localhost:5173") // React dev servers
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}