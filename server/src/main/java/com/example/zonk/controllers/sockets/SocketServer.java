package com.example.zonk.controllers.sockets;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

public class SocketServer {

    public static void main(String[] args) {
        final int PORT = 8686;

        try (ServerSocket serverSocket = new ServerSocket(PORT)) {
            System.out.println("Server started. Waiting for clients...");

            while (true) {
                Socket clientSocket = serverSocket.accept();
                System.out.println("Client connected: " + clientSocket);

                // Handle client in a new thread
                Thread clientHandlerThread = new Thread(new ClientHandler(clientSocket));
                clientHandlerThread.start();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
