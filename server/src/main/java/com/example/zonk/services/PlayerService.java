package com.example.zonk.services;

import com.example.zonk.entities.Player;
import com.example.zonk.entities.Room;
import com.example.zonk.enums.PlayerStatuses;
import com.example.zonk.exeptions.PlayerLoginException;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Třída služby hráče - je služba uchovavající entity potřebné pro hráče:
 * seznam hráčů
 * Přesměruje požadavek od služby apliakce s naparsovanými daty
 * na další entity hráčů
 *
 * @author Aleksei Baiukov
 * @version 30.03.2024
 */
@Slf4j
public class PlayerService {

    // uložení seznamu hráčů
    private static final List<Player> players = new ArrayList<>();

    /**
     * Metoda pro založení nového hráče. Ještě jednou ověří získaná data, vytvoří nového
     * hráče, pokud ještě takový neexistuje
     *
     * @param name jméno hráče
     * @param room název mistnosti, do které bude hráč přesměrován
     * @throws PlayerLoginException vyjímka vyhozená při nalezení existujícího hráče
     */
    public Player authorisePlayer(String name, Room room) throws PlayerLoginException {
        Optional<Player> optionalPlayer = room.getPlayers().stream()
                .filter(currentPlayer -> currentPlayer.getName().equals(name))
                .findFirst();
        if (optionalPlayer.isPresent()) {
            String reason = "playerAlreadyExists";
            log.error("Cannot log in new player. Caused by: " + reason);
            throw new PlayerLoginException(reason);
        }
        Player newPlayer = new Player(name);
        players.add(newPlayer);
        newPlayer.setStatus(PlayerStatuses.INLOBBY);
        log.info("Player " + name + " has been authorised to room " + room.getName());
        return newPlayer;
    }

    /**
     * Metoda pro zíkání hráče podle identifikáčního čísla
     *
     * @param id identifikáční číslo
     * @return hrač nebo null
     */
    public Player getPlayerByID(String id) {
        Optional<Player> player = players
                .stream()
                .filter(currentPlayer -> currentPlayer.getSessionId().equals(id))
                .findFirst();
        return player.orElse(null);
    }

}
