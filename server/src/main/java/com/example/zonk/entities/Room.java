package com.example.zonk.entities;

import java.util.ArrayList;
import java.util.List;

/**
 * Třída popisující entity místnosti pro seskupování hráčů a nastevení hry
 * před její spuštěním.
 *
 * @author Aleksei Baiukov
 * @version 30.03.2024
 */
public class Room {

    // uložení názevu místnosti
    private String name;

    // uložení seznamů hráčů v místnosti
    private final List<Player> players = new ArrayList<>();

    /**
     * Vrátí uložený název této místnosti
     *
     * @return název místnosti
     */
    public String getName() { return this.name; }

    /**
     * Vrátí uložený seznam hráčů v místnosti
     *
     * @return seznam hráčů
     */
    public List<Player> getPlayers() { return this.players; }

    /**
     * Nastaví nový název této místnosti
     *
     * @param name nový název místnosti
     */
    public void setName(String name) { this.name = name; }

    /**
     * Konstruktor třídy specifikující název místnosti
     */
    public Room(String name) {
        this.name = name;
    }

    /**
     * Metoda pro přídání hráče do místnosti a do seznamu hráčů
     *
     * @param player přídavaný hráč
     */
    public void addPlayer(Player player) { players.add(player); }

    /**
     * Metoda pro vymazání hráče z místnosti a ze seznamu hráčů
     *
     * @param player hráč k vymazání
     */
    public void removePlayer(Player player) {
        players.remove(player);
    }

    /**
     * Metoda vytvoření řádku z prvků třídy
     *
     * @return řádek obsahující prvky třídy
     */
    @Override
    public String toString() {
        return this.name;
    }
}
