package com.example.zonk.services;

import com.example.zonk.entities.Game;
import com.example.zonk.entities.Player;
import com.example.zonk.entities.Room;
import com.example.zonk.enums.PlayerStatuses;
import com.example.zonk.exeptions.GameException;
import com.example.zonk.exeptions.PlayerLoginException;
import com.example.zonk.exeptions.RoomDoesntExist;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Třída služby aplikace - je služba uchovavající další potřebné
 * služby: hry, hráče, místnosti atd.
 * Přesměruje příkazový požadavek požadavek na další službu
 *
 * @author Aleksei Baiukov
 * @version 30.03.2024
 */
@Component
@Slf4j
public class AppService {

    // uložení instance služby hry
    private final GameService gameService = new GameService();

    // uložení instance služby hráče
    private final PlayerService playerService = new PlayerService();

    // uložení instance služby mistnosti
    private final RoomService roomService = new RoomService();

    /**
     * Metoda pro založení nového hráče. Pokud už je v mistnosti hráč se stejném jménem,
     * tak vyhlasí se chyba, jinak hráč bude založen a přesměrován do lobby
     *
     * @param dataStr balík dat typu JSON řádku získaný od příkazu nebo gatewaye
     * @throws PlayerLoginException vyjímka vyhozená při existujícím hráči
     */
    public String authorisePlayer(String dataStr) throws PlayerLoginException {
        JSONObject data = new JSONObject(dataStr);
        String name = data.getString("name");
        String roomName = data.getString("room").replaceAll("\"", "");
        Room room = roomService.addRoomIfAbsent(roomName);
        if (room.getPlayers().size() >= 4) {
            String reason = "roomIsFull";
            log.warn("Player " + name + " hasn't been authorised to room " + roomName + " successfully. " +
                    "Caused by: " + reason);
            throw new PlayerLoginException(reason);
        }
        Player player = this.playerService.authorisePlayer(name, room);
        room.addPlayer(player);
        return player.getSessionId();
    }

    public String removePlayer(String dataStr) throws PlayerLoginException, RoomDoesntExist {
        JSONObject data = new JSONObject(dataStr);
        String id = data.getString("id").replaceAll("\"", "");
        String roomName = roomService.getRoomByPlayerID(id);
        List<Player> players = roomService.getPlayersByRoom(roomName);
        Player player = playerService.getPlayerByID(id);
        try {
            Game game = gameService.getGameByPlayerID(id);
            game.removePlayer(player);
        } catch (Exception ignored) { }
        players.remove(player);
        return null;
    }

    /**
     * Metoda pro získání seznamu hráčů podle názvu mistnosti
     *
     * @param dataStr balík dat typu JSON řádku získaný od příkazu nebo gatewaye
     * @throws RoomDoesntExist vyjímka vyhozená při nenalezení mistnosti
     */
    public JSONObject getPlayersByRoom(String dataStr) throws RoomDoesntExist {
        JSONObject data = new JSONObject(dataStr);
        String roomName = data.getString("room").replaceAll("\"", "");
        Game game = this.gameService.getGameByRoomName(roomName);
        List<Player> playerList =  this.roomService.getPlayersByRoom(roomName);
        JSONObject json = new JSONObject();
        json.put("players", playerList);
        json.put("isInGame", game != null);
        return json;
    }

    /**
     * Metoda pro získání mistnosti podle hráče
     *
     * @param dataStr balík dat typu JSON řádku získaný od příkazu nebo gatewaye
     */
    public String getRoomByPlayerID(String dataStr) {
        JSONObject data = new JSONObject(dataStr);
        String id = data.getString("id").replaceAll("\"", "");
        return this.roomService.getRoomByPlayerID(id);
    }

    /**
     * Metoda pro založení nové hry. Požadavek s naparsovanými daty se přesměruje
     * na služby hry, pokud existuje hledaná mistrnost a neexistuje už v ni hra
     *
     * @param dataStr balík dat typu JSON řádku získaný od příkazu nebo gatewaye
     * @throws GameException vyjímka vyhozená při nenalezení mistnosti nebo nalezení hry
     */
    public void createGame(String dataStr) throws GameException {
        JSONObject data = new JSONObject(dataStr);
        String playerID = data.getString("id").replaceAll("\"", "");
        int points = data.getInt("points");
        String room = this.roomService.getRoomByPlayerID(playerID);
        Game game = this.gameService.getGameByPlayerID(playerID);
        game = game != null ? game : this.gameService.getGameByRoomName(room);
        if (game != null) {
            String reason = "GameDoesAlreadyExist";
            log.warn("Game hasn't been created successfully. Caused by: " + reason);
            throw new GameException(reason);
        }
        if (room == null) {
            String reason = "RoomDoesntExist";
            log.warn("Game hasn't been created successfully. Caused by: " + reason);
            throw new GameException(reason);
        }
        this.gameService.create(room, points);
    }

    /**
     * Metoda pro získání aktuálního stavu hry pro konkretního hráče. Požadavek
     * se přesměruje na službu hry, pokud hra existuje, jinak vyhodí chybu
     *
     * @param dataStr balík dat typu JSON řádku získaný od příkazu nebo gatewaye
     * @throws GameException vyjímka vyhozená při nenalezení hry
     */
    public JSONObject getState(String dataStr) throws GameException {
        JSONObject data = new JSONObject(dataStr);
        String playerID = data.getString("id").replaceAll("\"", "");
        Game game = this.gameService.getGameByPlayerID(playerID);
        if (game == null) {
            String reason = "GameDoesntExist";
            log.warn("Cannot get game state. Caused by: " + reason);
            throw new GameException(reason);
        }
        return game.getPlayerState(playerID);
    }

    /**
     * Metoda pro zpracování požadavku o hazení kostkami. Požadavek
     * se přesměruje na službu hry, pokud hra existuje, jinak vyhodí chybu
     *
     * @param dataStr balík dat typu JSON řádku získaný od příkazu nebo gatewaye
     * @throws GameException vyjímka vyhozená při nenalezení hry
     */
    public void roll(String dataStr) throws GameException {
        JSONObject data = new JSONObject(dataStr);
        String playerID = data.getString("id").replaceAll("\"", "");
        Game game = this.gameService.getGameByPlayerID(playerID);
        if (game == null) {
            String reason = "GameDoesntExist";
            log.warn("Cannot get game state. Caused by: " + reason);
            throw new GameException(reason);
        }
        game.roll();
    }

    /**
     * Metoda pro ověření aktuálního stavu hráče. Pokud hráč nebyl nalezen, vrátí
     * stav, že takový hráč je neznámý
     *
     * @param dataStr balík dat typu JSON řádku získaný od příkazu nebo gatewaye
     */
    public String check(String dataStr) {
        JSONObject data = new JSONObject(dataStr);
        String id = data.getString("id").replaceAll("\"", "");
        Player player = this.playerService.getPlayerByID(id);
        if (player == null) {
            log.warn("Cannot properly get player status. Caused by: player doesn't exist");
            return PlayerStatuses.UNKNOWN;
        }
        return player.getStatus();
    }

    /**
     * Metoda pro zpracování požadavku o potvrzení kola po hazení kostkami.
     * Zpracuje se, pokud hra existuje, jinak vyhodí chybu
     *
     * @param dataStr balík dat typu JSON řádku získaný od příkazu nebo gatewaye
     * @throws GameException vyjímka vyhozená při nenalezení hry
     */
    public void submitRoll(String dataStr) throws GameException {
        JSONObject data = new JSONObject(dataStr);
        String id = data.getString("id").replaceAll("\"", "");
        Game game = this.gameService.getGameByPlayerID(id);
        if (game == null) {
            String reason = "GameDoesntExist";
            log.warn("Cannot get game state. Caused by: " + reason);
            throw new GameException(reason);
        }
        game.submitRoll();
    }

    /**
     * Metoda pro zpracování požadavku o přehazení kostkami. Požadavek
     * se přesměruje na službu hry, pokud hra existuje, jinak vyhodí chybu
     *
     * @param dataStr balík dat typu JSON řádku získaný od příkazu nebo gatewaye
     * @throws GameException vyjímka vyhozená při nenalezení hry
     */
    public void reroll(String dataStr) throws GameException {
        JSONObject data = new JSONObject(dataStr);
        String id = data.getString("id").replaceAll("\"", "");
        Map<Integer, Integer> dices = getDicesMapped(data);
        Game game = this.gameService.getGameByPlayerID(id);
        if (game == null) {
            String reason = "GameDoesntExist";
            log.warn("Cannot get game state. Caused by: " + reason);
            throw new GameException(reason);
        }
        game.reroll(dices);
    }

    /**
     * Metoda pro ověření kombinací vybrané hračem. Zpracuje se, pokud
     * existuje hra, jinak vyhodí chybu
     *
     * @param dataStr balík dat typu JSON řádku získaný od příkazu nebo gatewaye
     * @throws GameException vyjímka vyhozená při nenalezení hry
     */
    public JSONObject checkCombination(String dataStr) throws GameException {
        JSONObject data = new JSONObject(dataStr);
        String id = data.getString("id").replaceAll("\"", "");
        Game game = this.gameService.getGameByPlayerID(id);
        if (game == null) {
            String reason = "GameDoesntExist";
            log.warn("Cannot get game state. Caused by: " + reason);
            throw new GameException(reason);
        }
        Player player = this.playerService.getPlayerByID(id);
        boolean result = game.isACombination(this.getDicesMapped(data), player);
        JSONObject json = new JSONObject();
        json.put("result", result);
        return json;
    }

    /**
     * Metoda pro přemapování kostek. Získá původní mapping kostek, a přemapuje je
     * na typ klíč hodnota - číslo kostky, hodnota kostky v bodech.
     * Zpracuje se, jestli náhodně nebude změněn seznam za dobu běhu, jinak vyhodí chybu
     *
     * @param data balík dat typu JSON řádku získaný od příkazu nebo gatewaye
     * @throws GameException vyjímka vyhozená při změně seznamu
     */
    public Map<Integer, Integer> getDicesMapped(JSONObject data) throws GameException {
        JSONObject dicesMap = data.getJSONObject("chosenDices");
        Map<String, Object> dicesStr = dicesMap.toMap();
        Map<Integer, Integer> dices = new HashMap<>();
        try {
            for (String key : dicesStr.keySet()) {
                Integer diceID = Integer.parseInt(key);
                Integer diceValue = (Integer) dicesStr.get(key);
                dices.put(diceID, diceValue);
            }
        } catch (Exception e) {
            log.error("Cannot remap dices. Caused by: " + e.getMessage());
            throw new GameException(e.getMessage());
        }
        return dices;
    }

    /**
     * Metoda pro zpracování požadavku o uzavření hry. Požadavek
     * se přesměruje na službu hry, pokud hra existuje, jinak vyhodí chybu
     *
     * @param dataStr balík dat typu JSON řádku získaný od příkazu nebo gatewaye
     * @throws GameException vyjímka vyhozená při nenalezení hry
     */
    public void closeGame(String dataStr) throws GameException {
        JSONObject data = new JSONObject(dataStr);
        String id = data.getString("id").replaceAll("\"", "");
        Game game = this.gameService.getGameByPlayerID(id);
        this.gameService.closeGame(game);
    }

    /**
     * Metoda pro zpracování požadavku o přídání dalšího hráče. Požadavek
     * se přesměruje na službu hry, pokud hra a hráč existují, jinak vyhodí chybu
     *
     * @param dataStr balík dat typu JSON řádku získaný od příkazu nebo gatewaye
     * @throws GameException vyjímka vyhozená při nenalezení hry
     * @throws PlayerLoginException vyjímka vyhozená při nenalezení hráče
     */
    public void addPlayer(String dataStr) throws GameException, PlayerLoginException {
        JSONObject data = new JSONObject(dataStr);
        String roomName = data.getString("room");
        String id = data.getString("id");
        Game game = this.gameService.getGameByRoomName(roomName);
        Player player = this.playerService.getPlayerByID(id);
        if (game == null) {
            String reason = "GameDoesntExist";
            log.warn("Cannot get game state. Caused by: " + reason);
            throw new GameException(reason);
        }
        if (player == null) {
            String reason = "PlayerDoesntExist";
            log.warn("Cannot get game state. Caused by: " + reason);
            throw new PlayerLoginException(reason);
        }
        game.addPlayer(player);
        log.info("Player " + player.getName() + " has been added to room " + roomName);
    }
}
