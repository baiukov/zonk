package com.example.zonk.entities;

import com.example.zonk.enums.PlayerStatuses;
import lombok.extern.slf4j.Slf4j;

import java.util.UUID;

/**
 * Třída popisující entitu hráče. Ukládá a zpracová jeho data
 * a aktuální stavy dat
 *
 * @author Aleksei Baiukov
 * @version 30.03.2024
 */
@Slf4j
public class Player {

    // uložení jména hráče
    private String playerName;

    // uložení identifikáčního čísla hráče
    private final String sessionId;

    // uložení celkového skóre hráče. Na začátku hry je 0
    private int totalPoints = 0;

    // uložení momentálního skóre hráče za kolo. Na začátku hry je 0
    private int currentPoints = 0;

    // uložení stavu hráče. Než se příhlasí je nepříhlašený
    private String status = PlayerStatuses.UNAUTHORIZED;

    // uložení seznamu odehráných kostek, již nemůže použít pro přehazení
    private int[] bannedDices = new int[6];

    /**
     * Konstruktor třídy specifikující jméno hráče a jeho identifikáční číslo
     */
    public Player(String name) {
        this.playerName = name;
        sessionId = UUID.randomUUID().toString();
        log.info("New player has been created. Name: " + name + ". SessionID: " + sessionId);
    }

    /**
     * Vrátí uložené jmého tohoto hráče
     *
     * @return jméno hráče
     */
    public String getName() { return this.playerName; }

    /**
     * Vrátí uložené identifikáční číslo tohoto hráče
     *
     * @return identifikáční číslo hráče
     */
    public String getSessionId() { return sessionId; }

    /**
     * Vrátí součet celkového scóre hráče
     *
     * @return celkový scóre
     */
    public int getTotalPoints() { return this.totalPoints; }

    /**
     * Vrátí součet momentálního scóre za kolo
     *
     * @return momentální scóre
     */
    public int getCurrentPoints() { return this.currentPoints; }

    /**
     * Vrátí aktuální stav hráče
     *
     * @return stav hráče
     */
    public String getStatus() { return this.status; }

    /**
     * Vrátí pole zablokovaných kostek, které hráč dále nemůže použít v tomto
     * kole pro přehazení
     *
     * @return pole zablokovaných kostek
     */
    public int[] getBannedDices() {
        return bannedDices;
    }

    /**
     * Nastaví nové jméno tohoto hráče
     *
     * @param name nové jméno hráče
     */
    public void setName(String name) {this.playerName = name; }

    /**
     * Nastaví nové celkové scóre tomuto hráči
     *
     * @param pts nové celkové scóre
     */
    public void setTotalPoints(int pts) { this.totalPoints = pts; }

    /**
     * Nastaví nové momentální scóre za kolo tomuto hráči
     *
     * @param pts nové momentální scóre
     */
    public void setCurrentPoints(int pts) { this.currentPoints = pts; }

    /**
     * Nastaví nový stav tomuto hráči
     *
     * @param status nový stav
     */
    public void setStatus(String status) {this.status = status; }

    /**
     * Nastaví nové pole zablokovaných kostek, které hráč dále nemůže použít v tomto
     * kole pro přehazení
     *
     * @param bannedDices nové pole zablokovaných kostek
     */
    public void setBannedDices(int[] bannedDices) {
        this.bannedDices = bannedDices;
    }

    /**
     * Přídá počet bodů k celkovému scóre hráče
     *
     * @param points počet bodů
     */
    public void addTotalPoints(int points) {
        this.totalPoints += points;
    }

    /**
     * Přídá počet bodů k momentálnímu scóre hráče za kolo
     *
     * @param points počet bodů
     */
    public void addCurrentPoints(int points) { this.currentPoints += points; }

    /**
     * Odebere počet bodů z celkového scóre hráče
     *
     * @param points počet bodů
     */
    public void withdrawTotalPoints(int points) {
        this.totalPoints -= points;
    }

    /**
     * Odebere počet bodů z momentálního scóre hráče za kolo
     *
     * @param points počet bodů
     */
    public void withdrawCurrentPoints(int points) { this.currentPoints -= points; }
}
