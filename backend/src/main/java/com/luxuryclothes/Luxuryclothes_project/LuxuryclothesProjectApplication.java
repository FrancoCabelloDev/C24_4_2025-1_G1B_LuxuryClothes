package com.luxuryclothes.Luxuryclothes_project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SpringBootApplication
public class LuxuryclothesProjectApplication {

    private static final Logger logger = LoggerFactory.getLogger(LuxuryclothesProjectApplication.class);

    public static void main(String[] args) {
        logger.info("Arrancando LuxuryclothesProjectApplication");
        SpringApplication.run(LuxuryclothesProjectApplication.class, args);
    }
}
