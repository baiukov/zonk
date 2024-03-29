package com.example.zonk.controllers.socket.sockets;

import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

@Slf4j
public class SocketServer {

    public static void main(String[] args) {
        final int PORT = 8686;

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
