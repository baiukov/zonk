package com.example.zonk.controllers.rest;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.logging.logback.LogbackLoggingSystem;

/**
 * Třída pro nastartování Spring serveru a jeho posluchání
 * na dotazování koncových bodů uživateli
 *
 * @author Aleksei Baiukov
 * @version 30.03.2024
 */
@Slf4j
@SpringBootApplication(exclude = LogbackLoggingSystem.class)
public class ServerApplication {

	/**
	 * Metoda pro nastartování aplikaci, resp. serveru, který bude spuštěn
	 * na uvedeném portu a bude čekat na dotazy od klientu. Až se nějaký dostane
	 * zaparsuje ho do konkretního mappingu, pokud dotazovaný konvový bod
	 * existuje
	 *
	 * @param  args argumenty při spuštění této aplikaci v VM
	 */
	public static void main(String[] args) {
		log.info("Spring server has been started");
		SpringApplication.run(ServerApplication.class, args);
	}

}
