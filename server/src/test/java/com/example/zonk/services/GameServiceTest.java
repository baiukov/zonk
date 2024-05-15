package com.example.zonk.services;

import com.example.zonk.entities.Game;
import com.example.zonk.entities.Player;
import com.example.zonk.entities.Room;
import com.example.zonk.exeptions.GameException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.*;

@TestInstance(TestInstance.Lifecycle.PER_METHOD)
public class GameServiceTest {

    private final GameService gameService = new GameService();
    private final RoomService roomService = new RoomService();

    @Test
    void givenRoomNameAndPointsShouldCreateAGame() throws GameException, InterruptedException {
        String roomName = "room";
        roomService.addRoomIfAbsent(roomName);
        gameService.create(roomName, 1000);
        Thread.sleep(2);
        assertNotNull(gameService.getGameByRoomName(roomName));
    }

    @Test
    void givenGameAndRoomNameShouldReturnGame() throws GameException, InterruptedException {
        String roomName = "room3";
        Room room = roomService.addRoomIfAbsent(roomName);
        Player player = new Player("player");
        room.addPlayer(player);
        gameService.create(roomName, 1000);
        Game g = gameService.getGameByRoomName(roomName);
        Thread.sleep(2);
        Game game = gameService.getGameByPlayerID(player.getSessionId());
        assertEquals(gameService.getGameByRoomName(roomName), game);
    }

    @Test
    void givenGameAndUnrealRoomNameShouldReturnGame() {
        assertNotNull(gameService.getGameByRoomName("randomRoomName")); ;
    }

    @Test
    void givenGameWithPlayersAndPlayerIDShouldReturnPlayer() throws GameException, InterruptedException {
        String roomName = "room2";
        Room room = roomService.addRoomIfAbsent(roomName);
        Player player = new Player("player");
        room.addPlayer(player);
        room.addPlayer(new Player("player2"));
        gameService.create(roomName, 1000);
        Thread.sleep(2);
        Game game = gameService.getGameByRoomName(roomName);
        assertEquals(gameService.getGameByPlayerID(player.getSessionId()), game);
    }

    @Test
    void givenGameWithPlayersAndUnExistingPlayerIDShouldReturnPlayer() throws GameException {
        assertNull(gameService.getGameByPlayerID("randomPlayerID"));
    }

    @Test
    void givenFinishedGameToCloseShouldCloseTheGame() throws GameException, InterruptedException {
        String roomName = "room4";
        roomService.addRoomIfAbsent(roomName);
        gameService.create(roomName, 1000);
        Thread.sleep(2);
        Game game = gameService.getGameByRoomName(roomName);
        game.setHasFinished(true);
        gameService.closeGame(game);
        assertNull(gameService.getGameByRoomName(roomName));
    }

    @ParameterizedTest
    @ValueSource(ints = {1234, 5678})
    void givenFinishedGameToCloseShouldResetPlayersTotalScore(int points) throws GameException, InterruptedException {
        String roomName = "room" + points;
        Room room = roomService.addRoomIfAbsent(roomName);
        Player player = new Player("player");
        player.setTotalPoints(points);
        room.addPlayer(player);
        gameService.create(roomName, 1000);
        Thread.sleep(2);
        Game game = gameService.getGameByRoomName(roomName);
        game.setHasFinished(true);
        gameService.closeGame(game);

        assertEquals(player.getTotalPoints(), 0);
    }

    @ParameterizedTest
    @ValueSource(ints = {1234, 5678})
    void givenFinishedGameToCloseShouldResetPlayersCurrentScore(int points) throws GameException, InterruptedException {
        String roomName = "room" + points;
        Room room = roomService.addRoomIfAbsent(roomName);
        Player player = new Player("player");
        player.setCurrentPoints(points);
        room.addPlayer(player);
        gameService.create(roomName, 1000);
        Thread.sleep(2);
        Game game = gameService.getGameByRoomName(roomName);
        game.setHasFinished(true);
        gameService.closeGame(game);

        assertEquals(player.getCurrentPoints(), 0);
    }

}
