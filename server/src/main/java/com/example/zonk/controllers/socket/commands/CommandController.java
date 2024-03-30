package com.example.zonk.controllers.socket.commands;

import com.example.zonk.controllers.socket.sockets.ClientHandler;
import com.example.zonk.enums.TaskStatuses;
import com.example.zonk.services.AppService;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;

import javax.websocket.OnMessage;
import java.io.IOException;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

/**
 * Třída, která zpracová zpracování příkazu tak, že dostane zparsovány název příkazu a data
 * od klienta a pokusí se vyhledat a zpracovat příkaz
 *
 * @author Aleksei Baiukov
 * @version 30.03.2024
 */
@Slf4j
public class CommandController {

    // uložení posloucháče klientů
    private final ClientHandler clientHandler;

    // seznam znamých příkazů
    private HashSet<ICommand> registeredCommands = new HashSet<>();

    /**
     * Konstruktor třídy specifikující posloucháče klientů
     */
    public CommandController(ClientHandler clientHandler) {
        this.clientHandler = clientHandler;
    };

    /**
     * Metoda pro initializaci příkazů a uložení je do seznamů znamých
     * příkazů
     */
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
        ICommand addPlayer = new AddPlayer(appService);

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
                submitRollCommand,
                addPlayer
        ));
        log.info("Commands have been implemented. Commands List: " + registeredCommands);
    }

    /**
     * Metoda vyvolána po získání zprávy od klienta. Zpráva obsahuje balík dat
     * prostřednictvím JSON řádku. Tato metoda naparsuje je do tří entit: data pro
     * předání ke zpracování, identifikáční číslo úkolu a název příkazu, podle názvu
     * se pak zkusí vyhledat příkaz v seznamu znamých příkazů, zpracovat tento příkaz a
     * poslat odpověď klientovi
     *
     * @param message zpráva od klienta JSON řádkem
     *
     */
    @OnMessage
    public void onMessage(String message) {
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
        log.info("Message has been resolved. Input: " + message + ". Output: " + result);
    }

    /**
     * Metoda pro vyhledávání příkazů ze seznamu znamých příkazů.
     * Pokud seznam je prazdny, vyvolá initializaci tohoto seznamu,
     * jinak vrátí instanci příkazu nebo null
     *
     * @param commandName název příkazu pro vyhledání
     * @return instance hledáného příkazu nebo null
     */
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
