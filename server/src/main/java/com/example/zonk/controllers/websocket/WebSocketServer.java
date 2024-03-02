package com.example.zonk.controllers.websocket;


import com.example.zonk.controllers.websocket.commands.Login;
import com.example.zonk.interfaces.ICommand;
import com.example.zonk.services.AppService;
import org.glassfish.tyrus.server.Server;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@ServerEndpoint(value = "/websockets")
public class WebSocketServer {

    private final List<ICommand> registeredCommands = new ArrayList<>();

    @OnMessage
    public void onMessage(String message, Session session) {
        String[] separatedMessage = message.split(" ");
        String commandName = separatedMessage[0];
        String dataStr = separatedMessage[1];
        ICommand command = this.getCommand(commandName);
        String result = command.execute(dataStr);
        System.out.println(result);

        session.getAsyncRemote().sendText("Received message: " + message);
    }

    public void initCommands() {
        AppService appService = new AppService();
        Login loginCommand = new Login(appService);
        registeredCommands.add(loginCommand);
    }

    private ICommand getCommand(String commandName) {
        if (registeredCommands.isEmpty()) {
            this.initCommands();
        }

        Optional<ICommand> command = registeredCommands
                .stream()
                .filter(currentCommand -> currentCommand.isThat(commandName))
                .findFirst();
        return command.orElse(null);
    }

    public static void main(String[] args) {
        Server server = new Server(
                "26.230.10.134",
                8585,
                "/api",
                null,
                WebSocketServer.class
        );
        try {
            server.start();
            System.out.println("WebSocket server started" + server.getPort());
            // You can add additional logic here if needed
            // For example, you can keep the main thread running or perform other initialization tasks
            while (true) {
                Thread.sleep(10); // Sleep to avoid consuming CPU
            }
        } catch (Exception e) {
            System.err.println("Error starting WebSocket server: " + e.getMessage());
        }
    }
}