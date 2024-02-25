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

    private int[] dices = new int[]{1, 2, 3, 4, 5};

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
            player.setPoints(0);
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
        state.put("total", player.getPoints());
        state.put("players", this.players);
        state.put("goal", this.goal);
        state.put("isRolling", this.status == GameStatuses.ROLLING);
        state.put("dices", this.dices);
        return state;
    }

    public void roll() throws InterruptedException {
        System.out.println(status);
        status = GameStatuses.ROLLING;
        dices = null;
        Thread.sleep(5 * 1000);
        dices = new int[5];
        Random random = new Random();
        for (int i = 0; i < this.dices.length; i++) {
            dices[i] = random.nextInt(4) + 1;
        }
        status = GameStatuses.WAITING;
        int previousTurnID = players.indexOf(turn);
        int nextPlayerID = ++previousTurnID >= players.size() ? 0 : previousTurnID;
        this.turn = players.get(nextPlayerID);
        System.out.println(turn.getName());
        System.out.println(Arrays.toString(dices));
    }

    public void addPlayer(Player player) { this.players.add(player); }
    public Player removePlayer(Player player) {
        this.players.remove(player);
        return player;
    }
}
