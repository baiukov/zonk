package com.example.zonk.controllers.socket.sockets;

import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * Třída pro spuštění soketového serveru, připojování klientů a nastavení komunikací s nimi.
 *
 * @author Aleksei Baiukov
 * @version 30.03.2024
 */
@Slf4j
public class SocketServer {
    /**
     * Metoda pro nastartování aplikaci, resp. serveru, který bude spuštěn
     * na uvedeném portu a bude čekat na připojení klientů. Až se nějaký připojí
     * vytvoří pro něj nové vlakno, do kterého hodí nový posloucháč klientů, pokud se
     * žádná chyba nenastane
     *
     * @param args argumenty při spuštění této aplikaci v VM
     */
    public static void main(String[] args) {
        final int PORT = 8080;

        try (ServerSocket serverSocket = new ServerSocket(PORT)) {
            log.info("Server started. Waiting for clients...");

            while (true) {
                Socket clientSocket = serverSocket.accept();
                log.info("Client connected: " + clientSocket);

                Thread clientHandlerThread = new Thread(new ClientHandler(clientSocket));
                clientHandlerThread.start();
            }
        } catch (IOException e) {
            log.error(e.getMessage());
        }
    }
}
