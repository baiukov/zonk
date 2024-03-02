package com.example.zonk.entities;

import com.example.zonk.enums.Combinations;
import com.example.zonk.enums.GameStatuses;
import com.example.zonk.exeptions.GameException;
import org.json.JSONObject;

import java.util.*;

public class Game implements Runnable {

    private final Room room;

    private int goal;

    private Player turn;

    private List<Player> players;

    private String status;

    private int[] dices = null;

    private boolean hasFinished = false;

    public Game(Room room, int goal) {
        this.room = room;
        this.goal = goal;
    }

    public Room getRoom() { return this.room; }

    public Player getTurn() { return this.turn; }

    public int[] getDices() { return this.dices; }

    public int getGoal() { return this.goal; }

    public String getStatus() { return this.status; }

    public List<Player> getPlayers() { return this.players; }

    public void setGoal(int goal) { this.goal = goal; }

    public void setTurn(Player player) { this.turn = player; }

    public void setPlayers(List<Player> players) { this.players = players; }

    public void setStatus(String status) { this.status = status; }

    public void setDices(int[] dices) {this.dices = dices;}

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
        state.put("status", this.status);
        state.put("dices", this.dices);
        state.put("bannedDices", turn.getBannedDices());
        state.put("winner", this.hasFinished ? this.turn.getName() : null);
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
        int[] bannedDices = turn.getBannedDices();
        for (int i = 0; i < bannedDices.length; i++) {
            if (bannedDices[i] == 0) continue;
            dices[i] = 0;
        }
        Combination combination = new Combination();
        List<Combinations> combinations = combination.getCombinations(dices);
        List<Combinations> bannedCombinations = combination.getCombinations(turn.getBannedDices());
        for (Combinations currentCombination : bannedCombinations) {
            combinations.remove(currentCombination);
        }
        turn.setCurrentPoints(combination.countPoints(combinations));
        status = GameStatuses.PENDING;
    }

    public void submitRoll() {
        Player player = this.turn;
        int points = player.getCurrentPoints();
        player.addTotalPoints(points);
        player.setCurrentPoints(0);
        player.setBannedDices(new int[6]);
        if (player.getTotalPoints() >= this.goal) {
            this.hasFinished = true;
        }
        int previousTurnID = players.indexOf(turn);
        int nextPlayerID = ++previousTurnID >= players.size() ? 0 : previousTurnID;
        turn = players.get(nextPlayerID);
        status = GameStatuses.WAITING;
    }

    public boolean isACombination(Map<Integer, Integer> dices, Player player) {
        Combination combination = new Combination();
        int[] diceValues = new int[6];

        for (int id : dices.keySet()) {
            diceValues[id] = dices.get(id);
        }
        List<Combinations> combinations = combination.getCombinations(diceValues);
        List<Combinations> bannedCombinations = combination.getCombinations(player.getBannedDices());
        for (Combinations currentCombination : bannedCombinations) {
            combinations.remove(currentCombination);
        }

        return !combinations.isEmpty();

    }

    public void reroll(Map<Integer, Integer> chosenDices) throws GameException, InterruptedException {
        Combination combination = new Combination();
        Player player = this.turn;

        int[] diceValues = new int[6];

        for (int id : chosenDices.keySet()) {
            diceValues[id] = chosenDices.get(id);
        }

        if (!this.isACombination(chosenDices, player)) {
            throw new GameException("DicesIsNotCombination");
        }

        List<Combinations> combinations = combination.getCombinations(diceValues);
        List<Combinations> bannedCombinations = combination.getCombinations(player.getBannedDices());
        for (Combinations currentCombination : bannedCombinations) {
            combinations.remove(currentCombination);
        }

        if (Arrays.equals(player.getBannedDices(), diceValues)) {
            throw new GameException("PlayedCombination");
        }

        player.setBannedDices(diceValues);
        this.status = GameStatuses.ROLLING;
        Rolling rolling = new Rolling(this);
        new Thread(rolling).start();
    }

    public void addPlayer(Player player) { this.players.add(player); }

    public Player removePlayer(Player player) {
        this.players.remove(player);
        return player;
    }

    public boolean isHasFinished() {
        return hasFinished;
    }

    public void setHasFinished(boolean hasFinished) {
        this.hasFinished = hasFinished;
    }
}
