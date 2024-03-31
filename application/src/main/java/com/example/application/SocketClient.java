package com.example.application;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

/**
 * Třída pro nastavení socketa klienta, který je nutný
 * pro komunikaci se serverem
 *
 * @author Aleksei Baiukov
 * @version 31.03.24
 */
public class SocketClient {

    // uložení IP socketového serveru
    private static final String SERVER_IP = "127.0.0.1";

    // uložení portu socketového serveru
    private static final int SERVER_PORT = 8686;

    // uložení streamu pro posílání zpráv serveru
    private PrintWriter out;

    // uložení streamu pro získání zpráv od serveru
    private BufferedReader in;

    // uložení instance přesměrováče zpráv
    private MessageRouter messageRouter;

    // uložení instance logger
    private static final Logger logger = LogManager.getLogger(SocketClient.class);

    /**
     * Konstruktor třídy specifikující přesměrováče zpráv a komunikace s frontendem
     */
    public void setMessageRouter(MessageRouter messageRouter) {
        this.messageRouter = messageRouter;
    }

    /**
     * Metoda pro nastartování socketu klienta, který se pokusí připojít k uvedenému serveru
     * na uvedeném portu, až se k němu přípojí, vytovoří nové vlakno, které se bude se serverem komunikovat.
     * Až se nějakou zprávu dostane přesměruje ji přes přesměrováč zpráv na frontend,
     * pokud se zádná chyba nenastane
     *
     * @throws IOException chyba vstupu vystupu
     */
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

    /**
     * Metoda pro posílání zpráv serveru. Přes steam out, který byl vytvořen při nastartování socket
     * přepošle zprávu dostanou od frontendu, resp. od přesměrováče hned n server
     *
     * @param message zpráva pro server
     */
    public void sendMessage(Object message) {
        if (out != null) {
            out.println(message);
        }
        logger.info("Message prepared for server - \n" + message);
    }
}
