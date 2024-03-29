package com.example.zonk.services;

import com.example.zonk.entities.Game;
import com.example.zonk.entities.Player;
import com.example.zonk.entities.Room;
import com.example.zonk.enums.GameStatuses;
import com.example.zonk.enums.PlayerStatuses;
import com.example.zonk.exeptions.GameException;
import com.example.zonk.exeptions.RoomDoesntExist;
import lombok.extern.slf4j.Slf4j;

import java.util.*;

@Slf4j
public class GameService {

    private static final List<Game> games = new ArrayList<>();
    private static final Map<Game, Thread> threads = new HashMap<>();

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

    public void closeGame(Game game) throws GameException {
        if (game == null) {
            String reason = "GameDoesn'tExist";
            log.warn("Game hasn't been closed properly. Caused by: " + reason);
            throw new GameException(reason);
        }
        if (!game.isHasFinished()) {
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
