package com.example.zonk.services;

import com.example.zonk.entities.Player;
import com.example.zonk.entities.Room;
import com.example.zonk.exeptions.PlayerLoginException;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class PlayerServiceTest {

    private final PlayerService playerService = new PlayerService();

    @Test
    void givenRoomAndPlayerNameShouldCreatePlayerAndAddToRoom() throws PlayerLoginException {
        Room room = new Room("newRoom");
        String playerName = "player";
        assertEquals(playerService.authorisePlayer(playerName, room).getName(), playerName);
    }

    @Test
    void givenIDShouldReturnPlayer() throws PlayerLoginException {
        Room room = new Room("newRoom1");
        String playerName = "player1";
        Player player = playerService.authorisePlayer(playerName, room);

        assertEquals(playerService.getPlayerByID(player.getSessionId()), player);
    }
}
