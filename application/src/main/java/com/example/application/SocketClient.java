package com.example.application;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class SocketClient {
    private static final String SERVER_IP = "127.0.0.1"; // Change to server's IP
    private static final int SERVER_PORT = 8686; // Change to server's port
    private PrintWriter out;
    private BufferedReader in;

    public void start() {
        try {
            Socket socket = new Socket(SERVER_IP, SERVER_PORT);
            out = new PrintWriter(socket.getOutputStream(), true);
            in = new BufferedReader(new InputStreamReader(socket.getInputStream()));

            Thread readerThread = new Thread(() -> {
                try {
                    String serverResponse;
                    while ((serverResponse = in.readLine()) != null) {
                        System.out.println("Server: " + serverResponse + "\n");
                    }
                } catch (IOException ex) {
                    ex.printStackTrace();
                }
            });
            readerThread.start();
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    public void sendMessage(String message) {
        if (out != null) {
            out.println(message);
        }
    }

}
