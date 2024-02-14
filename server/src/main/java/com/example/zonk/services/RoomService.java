package com.example.zonk.services;

import com.example.zonk.entities.Room;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class RoomService {

    private final List<Room> rooms = new ArrayList<>();

    public Room addRoomIfAbsent(String name) {
        Room room = null;
        Optional<Room> optionalRoom = rooms
                .stream()
                .filter(currentRoom -> currentRoom.getName().equals(name))
                .findFirst();

        if (optionalRoom.isEmpty()) {
            room = new Room(name);
        }

        return room;
    }

}
