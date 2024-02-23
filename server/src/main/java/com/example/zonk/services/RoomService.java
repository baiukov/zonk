package com.example.zonk.services;

import com.example.zonk.entities.Player;
import com.example.zonk.entities.Room;
import com.example.zonk.exeptions.RoomDoesntExist;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class RoomService {

    private static final List<Room> rooms = new ArrayList<>();

    public Room addRoomIfAbsent(String name) {
        Room room = null;
        Optional<Room> optionalRoom = rooms
                .stream()
                .filter(currentRoom -> currentRoom.getName().equals(name))
                .findFirst();

        if (optionalRoom.isEmpty()) {
            room = new Room(name);
            rooms.add(room);
        } else {
            room = optionalRoom.get();
        }


        return room;
    }

    public List<Player> getPlayersByRoom(String roomName) throws RoomDoesntExist {
        Room room = this.getRoom(roomName);


        if (room == null) {
            throw new RoomDoesntExist("RoomDoesntExist");
        }

        return room.getPlayers();
    }

    public Room getRoom(String name) {
        Optional<Room> room =  rooms
                .stream()
                .filter(currentRoom -> currentRoom.getName().equals(name))
                .findFirst();
        return room.orElse(null);
    }
    public String getRoomByPlayerID(String id) {
        for (Room room : rooms) {
            List<Player> players = room.getPlayers();
            for (Player player : players) {
                if (player.getSessionId().equals(id)) {
                    return room.getName();
                }
            }
        }
        return null;
    }
}
