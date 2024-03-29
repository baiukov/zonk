package com.example.zonk.controllers.rest;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.logging.logback.LogbackLoggingSystem;

@Slf4j
@SpringBootApplication(exclude = LogbackLoggingSystem.class)
public class ServerApplication {

	public static void main(String[] args) {
		log.info("Spring server has been started");
		SpringApplication.run(ServerApplication.class, args);
	}

}
