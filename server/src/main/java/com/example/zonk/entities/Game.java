package com.example.zonk.entities;

import com.example.zonk.enums.Combinations;
import com.example.zonk.enums.GameStatuses;
import com.example.zonk.exeptions.GameException;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;

import java.util.*;

/**
 * Třída popisující entitu hry. Ukládá a zpracová její data
 * a aktuální stavy dat. Hra se spouští ve zvlaštním vlakně,
 * aby místnost byla schopna pracovat s několika hry najednou.
 * Provádí klíčové akce hry jako je: hodit kostkami, přehodit kostkami,
 * ukončit kolo, přídat a vyhodit hráče.
 *
 * @author Aleksei Baiukov
 * @version 30.03.2024
 */
@Slf4j
public class Game implements Runnable {

    // uložení místnosti pro kterou se hra bude dít
    private final Room room;

    // uložení nastavení cíle hry (počtu bodu pro výhru)
    private int goal;

    // uložení hráče, který momentálně hraje
    private Player turn;

    // uložení seznamu hráčů ve hře
    private List<Player> players;

    // uložení stavu hry
    private String status;

    // uložení pole kostek, které jsou momentálně vyhozeny na desce
    private int[] dices = null;

    // uložení nastavení, jestli hra skončila
    private boolean hasFinished = false;

    /**
     * Konstruktor třídy specifikující místnost, pro kterou se
     * hra bude dít a cíle (počtu bodů pro výhru)
     */
    public Game(Room room, int goal) {
        this.room = room;
        this.goal = goal;
    }

    /**
     * Vrátí uloženou místnost
     *
     * @return instance místnosti
     */
    public Room getRoom() { return this.room; }

    /**
     * Vrátí momentálně hrajícího hráče
     *
     * @return instance hráče
     */
    public Player getTurn() { return this.turn; }

    /**
     * Vrátí pole kostek, které jsou vyhozeny na desce
     *
     * @return pole s kostkami
     */
    public int[] getDices() { return this.dices; }

    /**
     * Vrátí počet bodu nutných pro výhru.
     *
     * @return cíl hry
     */
    public int getGoal() { return this.goal; }

    /**
     * Vrátí aktuální stav hry
     *
     * @return stav hry
     */
    public String getStatus() { return this.status; }

    /**
     * Vrátí uložený seznam hráčů ve hře
     *
     * @return seznam hráčů
     */
    public List<Player> getPlayers() { return this.players; }

    /**
     * Vrátí jestli hra byla už ukončená
     *
     * @return jestli hra skončila
     */
    public boolean hasFinished() {
        return hasFinished;
    }

    /**
     * Nastaví nový cíl hry. Počet bodů nutných pro výhru
     *
     * @param goal nový cíl hry
     */
    public void setGoal(int goal) { this.goal = goal; }

    /**
     * Nastaví dalšího hráče, který bude těd hrát.
     *
     * @param player hráč
     */
    public void setTurn(Player player) { this.turn = player; }

    /**
     * Nastaví nový seznam hráčů ve hře
     *
     * @param players seznam hráčů
     */
    public void setPlayers(List<Player> players) { this.players = players; }

    /**
     * Nastaví nový aktuální stav hry.
     *
     * @param status stav hry
     */
    public void setStatus(String status) { this.status = status; }

    /**
     * Nastaví nové pole kostek, které jsou vyhozeny na desce
     *
     * @param dices pole kostek
     */
    public void setDices(int[] dices) {this.dices = dices; }

    /**
     * Nastaví jestli je hra ukončena.
     *
     * @param hasFinished jestli hra skončila
     */
    public void setHasFinished(boolean hasFinished) {
        this.hasFinished = hasFinished;
    }

    /**
     * Metoda vyvolaná při spuštění vlakna. Nastavuje začáteční parametry hry,
     * stavy dat a data všem připojeným hráčům
     */
    @Override
    public void run() {
        players = new ArrayList<>(this.room.getPlayers());
        Collections.shuffle(this.players);
        players.forEach(player -> {
            player.setTotalPoints(0);
            player.setCurrentPoints(0);
        });
        this.turn = this.players.get(0);
        this.status = GameStatuses.WAITING;
        log.info("New game has been initialized. Players list: " + players);
    }

    /**
     * Metoda pro získání aktuálního stavu hry pro konkretního hráče, resp.
     * data hráče spojené s touto hrou, pokud takový hráč existuje.
     * Jestli teď hraje, kolik má scóre, seznam spoluhráčů, stav, cíl hry,
     * momentální sada kostek na desce, zablokovány kostky pro hráče, vítěz hry.
     *
     * @param playerID identifikáční číslo hráče, pro kterého zjišťuje stav
     * @throws GameException vyjímka vyhozená, pokud hráč nebyl nalezen
     * @return balík dat typu JSON objektu ohledně stavu tohoto hráče v této hře
     */
    public JSONObject getPlayerState(String playerID) throws GameException {
        Optional<Player> optionalPlayer = this.players
                .stream()
                .filter(player -> player.getSessionId().equals(playerID))
                .findFirst();
        if (optionalPlayer.isEmpty()) {
            log.error("The request is for player, who doesn't exist. ID: " + playerID);
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
        state.put("bannedDices", player.getBannedDices());
        state.put("winner", this.hasFinished ? this.turn.getName() : null);
        log.info("Player " + player.getName() + " has current game state: " + state);
        return state;
    }

    /**
     * Metoda pro házení kostkami. Změní stav hry, pak vytvoří zvlaštní vlakno, do
     * kterého přídá instance speciální třídy zpracující proces hazení a spustí ho.
     */
    public void roll() {
        status = GameStatuses.ROLLING;
        Rolling rolling = new Rolling(this);
        rolling.run();
//        to be deleted
//        dices = null;
//        Thread.sleep(5 * 1000);
//        dices = new int[6];
//        Random random = new Random();
//        for (int i = 0; i < this.dices.length; i++) {
//            dices[i] = random.nextInt(5) + 1;
//        }
//        int[] bannedDices = turn.getBannedDices();
//        for (int i = 0; i < bannedDices.length; i++) {
//            if (bannedDices[i] == 0) continue;
//            dices[i] = 0;
//        }
//        Combination combination = new Combination();
//        List<Combinations> combinations = combination.getCombinations(dices);
//        List<Combinations> bannedCombinations = combination.getCombinations(turn.getBannedDices());
//        for (Combinations currentCombination : bannedCombinations) {
//            combinations.remove(currentCombination);
//        }
//        turn.setCurrentPoints(combination.countPoints(combinations));
//        status = GameStatuses.PENDING;
    }

    /**
     * Metoda pro ukončení aktuálního kola, potvrzení počtu bodů za kolo a předání
     * kola dalšímu hráči. Vymaže počet aktuálních bodů, přepíše je k celkovému scóre,
     * a ověří jestli už hru nevyhrál (jestli nemá počet bodu shodný s cílem), pokud ano, tak
     * hru ukončí, jinak předa roli hráče dalšímu hráči
     */
    public void submitRoll() {
        Player player = this.turn;
        int points = player.getCurrentPoints();
        player.addTotalPoints(points);
        player.setCurrentPoints(0);
        player.setBannedDices(new int[6]);
        if (player.getTotalPoints() >= this.goal) {
            this.hasFinished = true;
            log.info("The game for room: " + room.getName() + " has been finished. Winner: "
                    + player.getName() + " his total score is " + player.getTotalPoints() + " points!");
            return;
        }
        int currentTurnID = players.indexOf(turn);
        int nextPlayerID = (currentTurnID + 1) >= players.size() ? 0 : currentTurnID + 1;
        turn = players.get(nextPlayerID);
        status = GameStatuses.WAITING;
        log.info("Player " + player.getName() + " has submitted his roll");
    }

    /**
     * Metoda pro zjištění kombinací sady kostek po hazení.
     * Získá seznam kombinací mezi vyhozenými kostkami, vymezí to zablokovánými
     * kombinacemi, ty co jsou už odehrány a pak vrátí jestli alespoň nějaká kombinace
     * mezi kostkami je.
     *
     * @param dices namapováné kostky typu id kostky, počet bodu na kostce
     * @param  player aktuální hráč
     * @return jestli kombinace je
     */
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

    /**
     * Metoda pro přehazení kostkami. Ověří, jestli mezi vybránými kostky kombinace
     * jsou, pokud ne vyhodí klientovi chybu, jinak vytvoří vlakno a vhodí do něj
     * instance třídy procesu hazení, resp. přehazení a spustí ho.
     *
     * @param chosenDices namapováné vybráné kostky typu id kostky, počet bodu na kostce
     * @throws GameException vyjímka vyhozená, není aspoň jedna kombinace vybrána
     */
    public void reroll(Map<Integer, Integer> chosenDices) throws GameException {
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

    /**
     * Metoda přídá nového hráče ke hře.
     *
     * @param player nový hráč
     */
    public void addPlayer(Player player) { this.players.add(player); }

    /**
     * Metoda vyhodí hráče ze hry
     *
     * @param player hráč k vyhození
     */
    public Player removePlayer(Player player) {
        this.players.remove(player);
        return player;
    }
}
