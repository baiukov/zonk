package com.example.zonk.controllers.socket.websocket;


import com.example.zonk.controllers.socket.commands.*;
import com.example.zonk.enums.TaskStatuses;
import com.example.zonk.controllers.socket.commands.ICommand;
import com.example.zonk.services.AppService;
import org.glassfish.tyrus.server.Server;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.*;

@ServerEndpoint(value = "/websockets")
public class WebSocketServer {

    private HashSet<ICommand> registeredCommands = new HashSet<>();

    @OnMessage
    public void onMessage(String message, Session session) throws IOException {
        String[] separatedMessage = message.split(" ");
        String commandName = separatedMessage[0];
        String dataStr = separatedMessage[1];
        ICommand command = this.getCommand(commandName);
        String result = command.execute(dataStr);
        String status = command.getStatus();
        if (status.equals(TaskStatuses.UNEXECUTED)) return;
        session.getAsyncRemote().sendText(status + " " + result);
    }

    public void initCommands() {
        AppService appService = new AppService();

        ICommand loginCommand = new Login(appService);
        ICommand checkCommand = new Check(appService);
        ICommand checkCombinationCommand = new CheckCombination(appService);
        ICommand closeGameCommand = new CloseGame(appService);
        ICommand createGameCommand = new CreateGame(appService);
        ICommand getPlayersCommand = new GetPlayers(appService);
        ICommand getRoomCommand = new GetRoom(appService);
        ICommand getStateCommand = new GetState(appService);
        ICommand rerollCommand = new Reroll(appService);
        ICommand rollCommand = new Roll(appService);
        ICommand submitRollCommand = new SubmitRoll(appService);

        registeredCommands = new HashSet<>(Set.of(
                loginCommand,
                checkCommand,
                checkCombinationCommand,
                closeGameCommand,
                createGameCommand,
                getPlayersCommand,
                getRoomCommand,
                getStateCommand,
                rerollCommand,
                rollCommand,
                submitRollCommand
        ));
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
            while (true) {
                Thread.sleep(1);
            }
        } catch (Exception e) {
            System.err.println("Error starting WebSocket server: " + e.getMessage());
        }
    }
}