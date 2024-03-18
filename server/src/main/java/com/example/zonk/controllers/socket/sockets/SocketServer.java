package com.example.zonk.controllers.socket.sockets;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

public class SocketServer {

    private static final Logger logger = LogManager.getLogger(SocketServer.class);

    public static void main(String[] args) {
        final int PORT = 8686;

        try (ServerSocket serverSocket = new ServerSocket(PORT)) {
            logger.info("Server started on port " + PORT + ". Waiting for clients...");

            while (true) {
                Socket clientSocket = serverSocket.accept();
                logger.info("Client connected: " + clientSocket);

                Thread clientHandlerThread = new Thread(new ClientHandler(clientSocket));
                clientHandlerThread.start();
            }
        } catch (IOException e) {
            logger.error("Exception at server thread start" + e.getMessage());
        }
    }
}
