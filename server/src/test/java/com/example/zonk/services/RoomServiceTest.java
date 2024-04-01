package com.example.zonk.services;

import com.example.zonk.entities.Player;
import com.example.zonk.entities.Room;
import com.example.zonk.exeptions.RoomDoesntExist;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class RoomServiceTest {

    private final RoomService roomService = new RoomService();
    private final Room existingRoom;

    public RoomServiceTest() {
        existingRoom = roomService.addRoomIfAbsent("existingRoom");
    }

    @Test
    void givenRoomNameShouldReturnCreateOnlyOnce() {
        String roomName = "newRoom";
        Room room1 = roomService.addRoomIfAbsent(roomName);
        Room room2 = roomService.addRoomIfAbsent(roomName);
        assertEquals(room1, room2);
    }

    @Test
    void givenRoomWithPlayersReturnPlayerList() throws RoomDoesntExist {
        String roomName = "roomWithPlayers";
        Room room = roomService.addRoomIfAbsent(roomName);
        Player player1 = new Player("player1");
        Player player2 = new Player("player2");
        List<Player> playerList = new ArrayList<>(List.of(player1, player2));
        room.addPlayer(player1);
        room.addPlayer(player2);
        assertEquals(roomService.getPlayersByRoom(room.getName()), playerList);
    }

    @Test
    void givenRoomNameShouldReturnRoom() {
        assertEquals(roomService.getRoom("existingRoom"), existingRoom);
    }

    @Test
    void givenRoomNameShouldReturnNull() {
        assertNull(roomService.getRoom("unExistingRoom"));
    }

    @Test
    void givenPlayerIDShouldReturnRoomName() {
        Room room = roomService.addRoomIfAbsent("roomWithPlayer");
        Player player = new Player("player");
        String id = player.getSessionId();
        room.addPlayer(player);
        assertEquals(roomService.getRoomByPlayerID(id), room.getName());
    }


}
