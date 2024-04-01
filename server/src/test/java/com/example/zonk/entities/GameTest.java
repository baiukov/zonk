package com.example.zonk.entities;

import com.example.zonk.enums.GameStatuses;
import com.example.zonk.exeptions.GameException;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class GameTest {

    private Player player;

    private Room room;

    private Game game;

    private final List<Map<Integer, Integer>> combinations = new ArrayList<>(List.of(
            new HashMap<>(Map.of(1, 1)),
            new HashMap<>(Map.of(1, 5)),
            new HashMap<>(Map.of(
                    1, 2,
                    2, 2,
                    3, 2
            )),
            new HashMap<>(Map.of(
                    1, 3,
                    2, 3,
                    3, 3
            )),
            new HashMap<>(Map.of(
                    1, 4,
                    2, 4,
                    3, 4
            )),
            new HashMap<>(Map.of(
                    1, 6,
                    2, 6,
                    3, 6
            ))
    ));

    private final List<Map<Integer, Integer>> notACombinations = new ArrayList<>(List.of(
            new HashMap<>(Map.of(1, 2)),
            new HashMap<>(Map.of(1, 3)),
            new HashMap<>(Map.of(
                    1, 2,
                    2, 3,
                    3, 2
            )),
            new HashMap<>(Map.of(
                    1, 3,
                    2, 4,
                    3, 3
            )),
            new HashMap<>(Map.of(
                    0, 4,
                    1, 6,
                    2, 3,
                    3, 2,
                    4, 3,
                    5, 4
            )),
            new HashMap<>(Map.of(
                    0, 2,
                    1, 3,
                    2, 6,
                    3, 4,
                    4, 6,
                    5, 2
            ))
    ));

    private Stream<Map<Integer, Integer>> getCombinations() {
        return combinations.stream();
    }

    private Stream<Map<Integer, Integer>> getNotCombinations() {
        return notACombinations.stream();
    }

    @BeforeEach
    void init() {
        player = new Player("player");
        room = new Room("room");
        room.addPlayer(player);
        game = new Game(room, 1000);
        new Thread(game).start();
    }

    @Test
    void givenGameShouldStart() {
        assertEquals(GameStatuses.WAITING, game.getStatus());
    }

    @Test
    void givenGameAndPlayerIDShouldReturnPlayerState() throws GameException {
        new Thread(game).start();
        JSONObject expectedState = new JSONObject();
        expectedState.put("turn", true);
        expectedState.put("total", 0);
        expectedState.put("currentPoints", 0);
        expectedState.put("players", new ArrayList<>(List.of(player)));
        expectedState.put("goal", 1000);
        expectedState.put("status", GameStatuses.WAITING);
        expectedState.put("bannedDices", new int[6]);

        assertEquals(expectedState.toString(), game.getPlayerState(player.getSessionId()).toString());
    }

    @Test
    void givenGameShouldChangeDicesAfterFiveSecs() throws InterruptedException {
        int[] dices = game.getDices();
        game.roll();
        Thread.sleep(6 * 1000);
        assertNotEquals(dices, game.getDices());
    }

    @Test
    void givenGameAndLastTotalPointsShouldChangeTotalPoints() throws InterruptedException {
        int total = player.getTotalPoints();
        game.submitRoll();
        assertEquals(total, player.getTotalPoints());
    }

    @ParameterizedTest
    @MethodSource("getCombinations")
    void givenCombinationsReturnTrue(Map<Integer, Integer> combination) {
        assertTrue(game.isACombination(combination, player));
    }

    @ParameterizedTest
    @MethodSource("getNotCombinations")
    void givenCombinationsReturnFalse(Map<Integer, Integer> combination) {
        assertFalse(game.isACombination(combination, player));
    }

    @Test
    void givenGameAndCombinationShouldChangeDicesAfterFiveSecs() throws InterruptedException, GameException {
        int[] dices = game.getDices();
        game.reroll(getCombinations().findFirst().get());
        Thread.sleep(6 * 1000);
        assertNotEquals(dices, game.getDices());
    }

    @Test
    void givenGameShouldAddPlayer() {
        Player player2 = new Player("player2");
        game.addPlayer(player2);
        assertTrue(game.getPlayers().contains(player2));
    }

    @Test
    void givenGameShouldRemovePlayer() {
        game.removePlayer(player);
        assertFalse(game.getPlayers().contains(player));
    }

}
