package com.example.zonk.entities;

import com.example.zonk.exeptions.GameException;
import org.json.JSONObject;

import java.util.*;

public class Game implements Runnable {

    private final Room room;

    private int goal;

    private Player turn;

    private List<Player> players;

    public Game(Room room, int goal) {
        this.room = room;
        this.goal = goal;
    }

    public Room getRoom() { return this.room; }

    public Player getTurn() { return this.turn; }

    public int getGoal() { return this.goal; }

    public List<Player> getPlayers() { return this.players; }

    public void setGoal(int goal) { this.goal = goal; }

    public void setTurn(Player player) { this.turn = player; }

    public void setPlayers(List<Player> players) { this.players = players; }

    @Override
    public void run() {
        this.init();
    }

    public void init() {
        this.players = new ArrayList<>(this.room.getPlayers());
        System.out.println(this.players);
        Collections.shuffle(this.players);
        this.players.forEach(player -> {
            player.setPoints(0);
        });
        Random random = new Random();
        this.turn = this.players.get(random.nextInt(players.size()));
    }

    public JSONObject getPlayerState(String playerID) throws GameException {
        System.out.println(this.players.get(0).getSessionId() + " " + playerID);
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
        return state;
    }
}
