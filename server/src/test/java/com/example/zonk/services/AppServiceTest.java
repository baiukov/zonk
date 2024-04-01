package com.example.zonk.services;

import com.example.zonk.entities.Player;
import com.example.zonk.enums.GameStatuses;
import com.example.zonk.enums.PlayerStatuses;
import com.example.zonk.exeptions.GameException;
import com.example.zonk.exeptions.PlayerLoginException;
import com.example.zonk.exeptions.RoomDoesntExist;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

public class AppServiceTest {

    private final AppService appService = new AppService();

    @Test
    void givenJSONWithPlayerAndRoomShouldReturnPlayerSessionID() throws JSONException, PlayerLoginException {
        JSONObject json = new JSONObject();
        json.put("name", "playerName");
        json.put("room", "roomName");
        assertNotNull(appService.authorisePlayer(json.toString()));
    }

    @Test
    void givenRoomWithPlayersShouldReturnPlayerList()
            throws PlayerLoginException, JSONException, RoomDoesntExist
    {
        String roomName = "roomName1";
        String playerName = "playerName1";
        JSONObject data = new JSONObject();
        data.put("name", playerName);
        data.put("room", roomName);
        String id = appService.authorisePlayer(data.toString());
        Player player = new Player(playerName);
        player.setSessionId(id);
        player.setStatus(PlayerStatuses.INLOBBY);

        JSONObject request = new JSONObject();
        request.put("room", roomName);

        JSONObject expected = new JSONObject();
        expected.put("players", new ArrayList<>(List.of(player)));
        expected.put("isInGame", false);

        assertEquals(expected.toString(), appService.getPlayersByRoom(request.toString()).toString());
    }

    @Test
    void givenRoomWithPlayersAndPlayerIDShouldReturnRoomName()
            throws PlayerLoginException, JSONException
    {
        String roomName = "roomName2";
        String playerName = "playerName2";
        JSONObject data = new JSONObject();
        data.put("name", playerName);
        data.put("room", roomName);
        String id = appService.authorisePlayer(data.toString());
        Player player = new Player(playerName);
        player.setSessionId(id);
        player.setStatus(PlayerStatuses.INLOBBY);

        JSONObject request = new JSONObject();
        request.put("id", id);

        assertEquals(roomName, appService.getRoomByPlayerID(request.toString()));
    }

    @Test
    void givenPlayerIDInRoomShouldCreateGame()
            throws PlayerLoginException, JSONException, GameException {
        String roomName = "roomName3";
        String playerName = "playerName3";
        JSONObject data = new JSONObject();
        data.put("name", playerName);
        data.put("room", roomName);
        String id = appService.authorisePlayer(data.toString());

        JSONObject request = new JSONObject();
        request.put("id", id);
        request.put("points", 1000);
        appService.createGame(request.toString());

        boolean isGameRunning = !appService.getState(request.toString()).isEmpty();

        assertTrue(isGameRunning);
    }

    @Test
    void givenRunningGameAndPlayerIDShouldReturnPlayerState()
            throws PlayerLoginException, JSONException, GameException
    {
        String roomName = "roomName4";
        String playerName = "playerName4";
        JSONObject data = new JSONObject();
        data.put("name", playerName);
        data.put("room", roomName);
        String id = appService.authorisePlayer(data.toString());
        Player player = new Player(playerName);
        player.setSessionId(id);
        player.setStatus(PlayerStatuses.INGAME);

        JSONObject request = new JSONObject();
        request.put("id", id);
        request.put("points", 1000);
        appService.createGame(request.toString());

        JSONObject expectedValue = new JSONObject();
        expectedValue.put("turn", true);
        expectedValue.put("total", 0);
        expectedValue.put("currentPoints", 0);
        expectedValue.put("players", new ArrayList<>(List.of(player)));
        expectedValue.put("goal", 1000);
        expectedValue.put("status", GameStatuses.WAITING);
        expectedValue.put("bannedDices", new int[6]);

        assertEquals(expectedValue.toString(), appService.getState(request.toString()).toString());
    }

    @Test
    void givenPlayerIDFromInGameShouldRollForHim()
            throws PlayerLoginException, JSONException, GameException
    {
        String roomName = "roomName5";
        String playerName = "playerName5";
        JSONObject data = new JSONObject();
        data.put("name", playerName);
        data.put("room", roomName);
        String id = appService.authorisePlayer(data.toString());
        Player player = new Player(playerName);
        player.setSessionId(id);
        player.setStatus(PlayerStatuses.INGAME);

        JSONObject request = new JSONObject();
        request.put("id", id);
        request.put("points", 1000);
        appService.createGame(request.toString());

        JSONObject expectedValue = new JSONObject();
        expectedValue.put("turn", true);
        expectedValue.put("total", 0);
        expectedValue.put("currentPoints", 0);
        expectedValue.put("players", new ArrayList<>(List.of(player)));
        expectedValue.put("goal", 1000);
        expectedValue.put("status", GameStatuses.ROLLING);
        expectedValue.put("bannedDices", new int[6]);

        appService.roll(request.toString());

        assertEquals(expectedValue.toString(), appService.getState(request.toString()).toString());
    }

    @Test
    void givenPlayerIDInLobbyShouldStatusInLobby()
            throws PlayerLoginException, JSONException, GameException
    {
        String roomName = "roomName6";
        String playerName = "playerName6";
        JSONObject data = new JSONObject();
        data.put("name", playerName);
        data.put("room", roomName);
        String id = appService.authorisePlayer(data.toString());
        Player player = new Player(playerName);
        player.setSessionId(id);

        JSONObject request = new JSONObject();
        request.put("id", id);

        assertEquals(PlayerStatuses.INLOBBY, appService.check(request.toString()));
    }

    @Test
    void givenUnknownPlayerShouldReturnUnknown() throws JSONException {
        JSONObject data = new JSONObject();
        data.put("id", "randomPlayerID");
        assertEquals(PlayerStatuses.UNKNOWN, appService.check(data.toString()));
    }

    @Test
    void givenPlayerIDAfterRollingShouldChangeTotalScore()
            throws PlayerLoginException, JSONException, GameException, InterruptedException
    {
        String roomName = "roomName7";
        String playerName = "playerName7";
        JSONObject data = new JSONObject();
        data.put("name", playerName);
        data.put("room", roomName);
        String id = appService.authorisePlayer(data.toString());
        Player player = new Player(playerName);
        player.setSessionId(id);
        player.setStatus(PlayerStatuses.INGAME);

        JSONObject request = new JSONObject();
        request.put("id", id);
        request.put("points", 1000);
        appService.createGame(request.toString());

        appService.roll(request.toString());
        Thread.sleep(6 * 1000);
        appService.submitRoll(request.toString());

        JSONObject result = appService.getState(request.toString());
        boolean didPlayerSubmittedRoll = !Objects.equals(result.get("dices"), new int[6])
                && result.get("status") != GameStatuses.ROLLING && result.getInt("currentPoints") == 0;

        assertTrue(didPlayerSubmittedRoll);
    }

    @Test
    void givenGameWithDicesCombinationAndPlayerIDShouldReroll() throws PlayerLoginException, GameException {
        String roomName = "roomName8";
        String playerName = "playerName8";
        JSONObject data = new JSONObject();
        data.put("name", playerName);
        data.put("room", roomName);
        String id = appService.authorisePlayer(data.toString());
        Player player = new Player(playerName);
        player.setSessionId(id);
        player.setStatus(PlayerStatuses.INGAME);

        JSONObject request = new JSONObject();
        request.put("id", id);
        request.put("points", 1000);
        request.put("chosenDices", new HashMap<>(Map.of(0, 1)));
        appService.createGame(request.toString());

        appService.reroll(request.toString());
        JSONObject state = appService.getState(request.toString());
        assertEquals(GameStatuses.ROLLING, state.get("status"));
    }

    @Test
    void givenDicesCombinationStringShouldRemapIntoMap() throws PlayerLoginException, GameException {
        Map<Integer, Integer> expectedValue = new HashMap<>(Map.of(
                0, 1,
                1, 1,
                2, 1,
                3, 1,
                4, 1,
                5, 1,
                6, 1
        ));

        JSONObject request = new JSONObject();
        request.put("chosenDices", expectedValue);

        assertEquals(expectedValue, appService.getDicesMapped(request));
    }

    @Test
    void givenGameWithPlayersAndGameRunningUntilFinishesShouldCloseGame()
            throws PlayerLoginException, GameException, InterruptedException
    {
        String roomName = "roomName9";
        String playerName = "playerName9";
        JSONObject data = new JSONObject();
        data.put("name", playerName);
        data.put("room", roomName);
        String id = appService.authorisePlayer(data.toString());
        Player player = new Player(playerName);
        player.setSessionId(id);
        player.setStatus(PlayerStatuses.INGAME);

        JSONObject request = new JSONObject();
        request.put("id", id);
        request.put("points", 1);
        request.put("chosenDices", new HashMap<>(Map.of(0, 1)));
        appService.createGame(request.toString());

        JSONObject state;
        boolean isFinished;
        do {
            appService.roll(request.toString());
            Thread.sleep(5100);
            appService.submitRoll(request.toString());
            state = appService.getState(request.toString());
            isFinished = state.get("status") == GameStatuses.FINISHED;
        } while (!isFinished);

        assertDoesNotThrow(() -> appService.closeGame(request.toString()));
    }

    @Test
    void givenGameWithPlayersShouldAndAnotherPlayerShouldAddPlayerToTheGame()
            throws PlayerLoginException, GameException
    {
        String roomName = "roomName10";
        String playerName = "playerName10";
        JSONObject data = new JSONObject();
        data.put("name", playerName);
        data.put("room", roomName);
        String id = appService.authorisePlayer(data.toString());
        Player player = new Player(playerName);
        player.setSessionId(id);
        player.setStatus(PlayerStatuses.INGAME);

        JSONObject request = new JSONObject();
        request.put("id", id);
        request.put("points", 1);
        request.put("chosenDices", new HashMap<>(Map.of(0, 1)));
        appService.createGame(request.toString());

        Player player2 = new Player(playerName + "2");
        data = new JSONObject();
        data.put("name", playerName + "2");
        data.put("room", roomName);

        JSONObject request2 = new JSONObject();
        request2.put("name", player2.getName());
        request2.put("room", "anotherRoom");
        String id2 = appService.authorisePlayer(data.toString());

        JSONObject request3 = new JSONObject();
        request3.put("id", id2);
        request3.put("room", roomName);
        appService.addPlayer(request3.toString());

        List<Object> playerList = appService.getState(request.toString()).getJSONArray("players").toList();

        assertTrue(playerList.size() >= 2);
    }
}
