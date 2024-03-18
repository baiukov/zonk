package com.example.zonk.controllers.socket.sockets;

import com.example.zonk.controllers.socket.commands.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class ClientHandler extends Thread {
    private Socket clientSocket;
    private PrintWriter out;
    private CommandController commandController;
    private static final Logger logger = LogManager.getLogger(ClientHandler.class);

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
            logger.info("Thread for handling client messages has been created");
            while ((inputLine = in.readLine()) != null) {
                logger.info("Received from client: " + inputLine);
                this.commandController.onMessage(inputLine);
            }
        } catch (IOException e) {
            logger.error(e.getMessage());
        }
    }

    public void sendMessage(String message) {
        logger.info("Sent to client: " + message);
        this.out.println(message);
    }


}
