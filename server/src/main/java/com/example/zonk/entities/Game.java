package com.example.zonk.entities;

import com.example.zonk.enums.GameStatuses;
import com.example.zonk.exeptions.GameException;
import org.json.JSONObject;

import java.util.*;

public class Game implements Runnable {

    private final Room room;

    private int goal;

    private Player turn;

    private List<Player> players;

    private GameStatuses status;

    private int[] dices = null;

    public Game(Room room, int goal) {
        this.room = room;
        this.goal = goal;
    }

    public Room getRoom() { return this.room; }

    public Player getTurn() { return this.turn; }

    public int getGoal() { return this.goal; }

    public GameStatuses getStatus() { return this.status; }

    public List<Player> getPlayers() { return this.players; }

    public void setGoal(int goal) { this.goal = goal; }

    public void setTurn(Player player) { this.turn = player; }

    public void setPlayers(List<Player> players) { this.players = players; }

    public void setStatus(GameStatuses status) { this.status = status; }

    @Override
    public void run() {
        this.init();
    }

    public void init() {
        this.players = new ArrayList<>(this.room.getPlayers());
        Collections.shuffle(this.players);
        this.players.forEach(player -> {
            player.setTotalPoints(0);
            player.setCurrentPoints(0);
        });
        this.turn = this.players.get(0);
        this.status = GameStatuses.WAITING;
    }

    public JSONObject getPlayerState(String playerID) throws GameException {
        Optional<Player> optionalPlayer = this.players
                .stream()
                .filter(player -> player.getSessionId().equals(playerID))
                .findFirst();
        if (optionalPlayer.isEmpty()) {
            throw new GameException("PlayerDoesntExist");
        }
        JSONObject state = new JSONObject();
        Player player = optionalPlayer.get();
        state.put("turn", player.equals(this.turn));
        state.put("total", player.getTotalPoints());
        state.put("currentPoints", player.getCurrentPoints());
        state.put("players", this.players);
        state.put("goal", this.goal);
        state.put("isRolling", this.status == GameStatuses.ROLLING);
        state.put("isPending", this.status == GameStatuses.PENDING);
        state.put("dices", this.dices);
        return state;
    }

    public void roll() throws InterruptedException {
        status = GameStatuses.ROLLING;
        dices = null;
        Thread.sleep(5 * 1000);
        dices = new int[6];
        Random random = new Random();
        for (int i = 0; i < this.dices.length; i++) {
            dices[i] = random.nextInt(5) + 1;
        }
        Combination combination = new Combination();
        this.turn.setCurrentPoints(combination.countPoints(combination.getCombinations(dices)));
        status = GameStatuses.PENDING;
        int previousTurnID = players.indexOf(turn);
        int nextPlayerID = ++previousTurnID >= players.size() ? 0 : previousTurnID;
        this.turn = players.get(nextPlayerID);
    }

    public void addPlayer(Player player) { this.players.add(player); }

    public Player removePlayer(Player player) {
        this.players.remove(player);
        return player;
    }
}
