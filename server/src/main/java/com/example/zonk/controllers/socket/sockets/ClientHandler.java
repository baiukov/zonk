package com.example.zonk.controllers.socket.sockets;

import com.example.zonk.controllers.socket.commands.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class ClientHandler extends Thread {
    private Socket clientSocket;
    private PrintWriter out;
    private CommandController commandController;

    public ClientHandler(Socket clientSocket) {
        this.clientSocket = clientSocket;
        this.commandController = new CommandController(this);
    }

    @Override
    public void run() {
        try (
                PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);
                BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()))
        ) {
            this.out = out;
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                System.out.println("Received from client: " + inputLine);
//                out.println("Server received: " + inputLine);
                this.commandController.onMessage(inputLine);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void sendMessage(String message) {
        this.out.println(message);
    }


}
