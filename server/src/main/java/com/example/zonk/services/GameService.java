package com.example.zonk.services;

import com.example.zonk.entities.Game;
import com.example.zonk.entities.Player;
import com.example.zonk.entities.Room;
import com.example.zonk.enums.PlayerStatuses;
import com.example.zonk.exeptions.GameException;
import com.example.zonk.exeptions.PlayerLoginException;
import lombok.extern.slf4j.Slf4j;

import java.util.*;

/**
 * Třída služby hry - je služba uchovavající entity potřebné pro hru:
 * seznam her, seznam vlaken se hrami.
 * Přesměruje požadavek od služby apliakce s naparsovanými daty
 * na další entity hry
 *
 * @author Aleksei Baiukov
 * @version 30.03.2024
 */
@Slf4j
public class GameService {

    // uložení seznamů aktuálních her
    private static final List<Game> games = new ArrayList<>();

    // uložení seznamu aktuálních vlaken
    private static final Map<Game, Thread> threads = new HashMap<>();

    /**
     * Metoda pro založení nové hry. Ještě jednou ověří získaná data, vytvoří novou
     * hru a nacpe do ní hráče z mistností
     *
     * @param roomName název mistnosti, pro kterou bude hra spuštěná
     * @param points cíl hry, počet bodů
     * @throws GameException vyjímka vyhozená při nenalezení mistnosti
     */
    public void create(String roomName, int points) throws GameException {
        RoomService roomService = new RoomService();
        Room room = roomService.getRoom(roomName);
        if (room == null) {
            String reason = "RoomDoesntExist";
            log.warn("Game hasn't been created successfully. Caused by: " + reason);
            throw new GameException(reason);
        }
        List<Player> playerList = room.getPlayers();
        for (Player player : playerList) {
            player.setStatus(PlayerStatuses.INGAME);
        }
        Game game = new Game(room, points);
        Thread gameThread = new Thread(game);
        gameThread.start();
        games.add(game);
        threads.put(game, gameThread);
        log.info("New game has been successfully created for room " + room);
    }

    /**
     * Metoda pro získání hry podle identifikáčního čísla hráče.
     * Pokud hra existuje, vrátí jí instanci, jinak vrátí null
     *
     * @param playerID identifikáční číslo hráče.
     * @return instance hry nebo null
     */
    public Game getGameByPlayerID(String playerID) {
        Optional<Game> game = games
            .stream()
            .filter(
                currentGame -> currentGame.getPlayers()
                    .stream()
                        .anyMatch(player -> player
                            .getSessionId()
                            .equals(playerID)
                        )
                )
            .findFirst();
        return game.orElse(null);
    }

    /**
     * Metoda pro získání hry podle názvu mistnosti, ke které přířazená.
     * Pokud hra existuje, vrátí jí instanci, jinak vrátí null
     *
     * @param roomName název mistnosti
     * @return instance hry nebo null
     */
    public Game getGameByRoomName(String roomName) {
        Optional<Game> game = games
                .stream()
                .filter(
                        currentGame -> currentGame
                                .getRoom()
                                .getName()
                                .equals(roomName)
                )
                .findFirst();
        return game.orElse(null);
    }

    /**
     * Metoda pro uzavření hry. Ověří jestli taková hra opravdu existuje a
     * byla už ukončená (hráče dostali výsledky a jsou přesměrováni zpět
     * do mistnosti, a pak zruší vlaknu, hru, obnoví data hráčů a
     * vymaže hru ze seznamu her
     *
     * @param game instance hry k ukončení
     * @return instance hry nebo null
     */
    public void closeGame(Game game) throws GameException {
        if (game == null) {
            String reason = "GameDoesn'tExist";
            log.warn("Game hasn't been closed properly. Caused by: " + reason);
            throw new GameException(reason);
        }
        if (!game.hasFinished()) {
            String reason = "GameHasntBeenFinished";
            log.warn("Game hasn't been closed properly. Caused by: " + reason);
            throw new GameException(reason);
        }
        Thread thread = threads.get(game);
        thread.interrupt();
        for (Player player : game.getPlayers()) {
            player.setStatus(PlayerStatuses.INLOBBY);
            player.setCurrentPoints(0);
            player.setTotalPoints(0);
        };
        game.setPlayers(null);
        games.remove(game);
        log.info("Game for room " + game.getRoom() + " has been closed.");
    }
}
