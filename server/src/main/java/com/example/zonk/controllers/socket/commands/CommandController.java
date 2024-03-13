package com.example.zonk.controllers.socket.commands;

import com.example.zonk.controllers.socket.sockets.ClientHandler;
import com.example.zonk.controllers.socket.sockets.SocketServer;
import com.example.zonk.enums.TaskStatuses;
import com.example.zonk.services.AppService;
import org.json.JSONObject;

import javax.websocket.OnMessage;
import java.io.IOException;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

public class CommandController {

    private ClientHandler clientHandler;
    private HashSet<ICommand> registeredCommands = new HashSet<>();

    public CommandController(ClientHandler clientHandler) {
        this.clientHandler = clientHandler;
    };

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
        String taskID = data.getString("taskID");
        ICommand command = this.getCommand(commandName);
        command.setTaskID(taskID);
        String result = command.execute(dataStr);
        String status = command.getStatus();
        if (status.equals(TaskStatuses.UNEXECUTED)) return;
        this.clientHandler.sendMessage(result);
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
