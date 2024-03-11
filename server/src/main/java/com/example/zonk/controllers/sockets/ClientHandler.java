package com.example.zonk.controllers.sockets;

import com.example.zonk.controllers.commands.*;
import com.example.zonk.enums.TaskStatuses;
import com.example.zonk.interfaces.ICommand;
import com.example.zonk.services.AppService;
import org.json.JSONObject;

import javax.websocket.OnMessage;
import javax.websocket.Session;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

public class ClientHandler extends Thread {
    private Socket clientSocket;
    private HashSet<ICommand> registeredCommands = new HashSet<>();

    public ClientHandler(Socket clientSocket) {
        this.clientSocket = clientSocket;
    }

    @Override
    public void run() {
        try (
                PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);
                BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()))
        ) {
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
//                System.out.println("Received from client: " + inputLine);
//                out.println("Server received: " + inputLine);
                this.onMessage(inputLine);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
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

    @OnMessage
    public void onMessage(String message) throws IOException {
        JSONObject data = new JSONObject(message);
        String commandName = data.getString("commandName");
        String dataStr = data.getString("data");
        System.out.println(data);
        ICommand command = this.getCommand(commandName);
        String result = command.execute(dataStr);
        String status = command.getStatus();
        if (status.equals(TaskStatuses.UNEXECUTED)) return;
        //session.getAsyncRemote().sendText(status + " " + result);
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
}
