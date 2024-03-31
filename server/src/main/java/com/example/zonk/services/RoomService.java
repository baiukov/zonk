package com.example.zonk.services;

import com.example.zonk.entities.Player;
import com.example.zonk.entities.Room;
import com.example.zonk.exeptions.PlayerLoginException;
import com.example.zonk.exeptions.RoomDoesntExist;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Třída služby mistností - je služba uchovavající entity potřebné pro správu mistností:
 * seznam mistností
 * Přesměruje požadavek od služby apliakce s naparsovanými daty
 * na další entity mistností
 *
 * @author Aleksei Baiukov
 * @version 30.03.2024
 */
@Slf4j
public class RoomService {

    // uložení seznamu mistností
    private static final List<Room> rooms = new ArrayList<>();

    /**
     * Metoda pro založení nové mistnosti nebo vyhledání existující.
     * Pokud mistnost se zadaným názvem existuje, vrátí ji, jinak založí novou,
     * a pak ji vrátí
     *
     * @param name název mistnosti
     * @return instance mistnosti
     */
    public Room addRoomIfAbsent(String name) {
        Room room;
        Optional<Room> optionalRoom = rooms
                .stream()
                .filter(currentRoom -> currentRoom.getName().equals(name))
                .findFirst();

        if (optionalRoom.isEmpty()) {
            room = new Room(name);
            rooms.add(room);
            log.info("Room " + name + " has been successfully created");
        } else {
            room = optionalRoom.get();
        }

        return room;
    }

    /**
     * Metoda pro získání hráčů v mistnosti, podle názvu. Ověří, jestli
     * taková mistnost existuje a vrátí z ní hráči, jinak vyhodí chybu
     *
     * @param roomName název mistnosti
     * @throws RoomDoesntExist vyjímka vyvolána, pokud mistnost neexistuje
     * @return seznam hráčů v mistnosti
     */
    public List<Player> getPlayersByRoom(String roomName) throws RoomDoesntExist {
        Room room = this.getRoom(roomName);
        if (room == null) {
            throw new RoomDoesntExist("RoomDoesntExist");
        }
        return room.getPlayers();
    }

    /**
     * Metoda pro získání mistnosti, podle názvu. Ověří, jestli
     * taková mistnost existuje a vrátí ji, jinak vyhodí null
     *
     * @param name název mistnosti
     * @return instance mistnosti nebo null
     */
    public Room getRoom(String name) {
        Optional<Room> room =  rooms
                .stream()
                .filter(currentRoom -> currentRoom.getName().equals(name))
                .findFirst();
        return room.orElse(null);
    }

    /**
     * Metoda pro získání názvu mistnosti podle identifikáčního čísla hráče v ni.
     * Ověří, jestli taková mistnost existuje a vrátí ji, jinak vrátí null
     *
     * @param id identifikáční číslo hráče
     * @return název mistnosti nebo null
     */
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
