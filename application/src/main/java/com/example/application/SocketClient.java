package com.example.application;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class SocketClient {
    private static final String SERVER_IP = "127.0.0.1";
    private static final int SERVER_PORT = 8686;
    private PrintWriter out;
    private BufferedReader in;
    private MessageRouter messageRouter;
    private static final Logger logger = LogManager.getLogger(SocketClient.class);

    public void setMessageRouter(MessageRouter messageRouter) {
        this.messageRouter = messageRouter;
    }

    public void start() {
        try {
            Socket socket = new Socket(SERVER_IP, SERVER_PORT);
            out = new PrintWriter(socket.getOutputStream(), true);
            in = new BufferedReader(new InputStreamReader(socket.getInputStream()));

            Thread readerThread = new Thread(() -> {
                try {
                    String serverResponse;
                    while ((serverResponse = in.readLine()) != null) {
                        logger.info("Message got from the server - " + serverResponse);
                        if (messageRouter != null) {
                            messageRouter.sendMessage(serverResponse);
                        }
                    }
                } catch (IOException ex) {
                    logger.error("Exception occurred at reader thread start \n" + ex.getMessage());
                }
            });
            readerThread.start();
            logger.info("Client has been connected to server " + SERVER_IP + ":" + SERVER_PORT);
        } catch (IOException ex) {
            logger.error("Exception occurred at client socket start \n" + ex.getMessage());
        }
    }

    public void sendMessage(Object message) {
        if (out != null) {
            out.println(message);
        }
        logger.info("Message prepared for server - \n" + message);
    }
}
