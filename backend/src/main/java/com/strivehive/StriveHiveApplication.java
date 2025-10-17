package com.strivehive;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class StriveHiveApplication {

    public static void main(String[] args) {
        SpringApplication.run(StriveHiveApplication.class, args);
        System.out.println("StriveHive Backend started successfully on port 8081!");
    }
}