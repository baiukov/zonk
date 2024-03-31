package com.example.zonk.entities;

import com.example.zonk.enums.Combinations;
import lombok.extern.slf4j.Slf4j;

import java.util.*;

/**
 * Pomocní třída pro zpracování entity kombinací. Je bezstatová, neukládá
 * žádná dynamická data. Obsahuje pomocní metody pro řešení kombinací
 *
 * @author Aleksei Baiukov
 * @version 30.03.2024
 */
@Slf4j
public class Combination {

    // uložení všech kombinací s jejích cenami
    private final Map<Combinations, Integer> costs = new HashMap<>();

    /**
     * Konstruktor třídy, který vygeneruje dostupné kombinace s cenami
     */
    public Combination() {
        costs.put(Combinations.ONE, 100);
        costs.put(Combinations.FIVE, 50);
        costs.put(Combinations.TRIPLE1, 1000);
        costs.put(Combinations.TRIPLE1DOUBLED, 2000);
        costs.put(Combinations.TRIPLE2, 200);
        costs.put(Combinations.TRIPLE2DOUBLED, 400);
        costs.put(Combinations.TRIPLE3, 300);
        costs.put(Combinations.TRIPLE3DOUBLED, 600);
        costs.put(Combinations.TRIPLE4, 400);
        costs.put(Combinations.TRIPLE4DOUBLED, 800);
        costs.put(Combinations.TRIPLE5, 500);
        costs.put(Combinations.TRIPLE5DOUBLED, 1000);
        costs.put(Combinations.TRIPLE6, 600);
        costs.put(Combinations.TRIPLE6DOUBLED, 1200);
        costs.put(Combinations.ONETOSIX, 1500);
        costs.put(Combinations.TWOTOSIX, 750);
        costs.put(Combinations.ONETOFIVE, 500);
    }

    /**
     * Vrátí sadu kombinací, které obsahuje předané pole
     * kostek. Pokud žádná není, tak vrátí prazdný seznam
     *
     * @param arr pole kostek
     * @return seznam kombinací v poli
     */
    public List<Combinations> getCombinations(int[] arr) {
        int[] signature = this.getSignature(arr);

        List<Combinations> combinations = new ArrayList<>();

        if (this.isOneToSix(signature)) {
            combinations.add(Combinations.ONETOSIX);
            return combinations;
        }

        int pairs = 0;
        for (int num : signature) {
            if (num == 2) pairs++;
        }
        if (pairs == 3) {
            combinations.add(Combinations.THREEPAIRS);
            combinations.add(Combinations.ALLISCOMBINATION);
            return combinations;
        }

        if (this.isOneToFive(signature)) {
            combinations.add(Combinations.ONETOFIVE);
            signature[1]--; signature[5]--; signature[4]--;
            signature[2]--; signature[3]--;
        }

        if (this.isTwoToSix(signature)) {
            combinations.add(Combinations.TWOTOSIX);
            signature[6]--; signature[5]--; signature[4]--;
            signature[2]--; signature[3]--;
        }

        if (signature[1] == 1) { combinations.add(Combinations.ONE); signature[1]--; }
        if (signature[5] == 1) { combinations.add(Combinations.FIVE); signature[5]--;}

        if (signature[1] == 2) { combinations.add(Combinations.ONE); combinations.add(Combinations.ONE); signature[2] -= 2; }
        if (signature[5] == 2) { combinations.add(Combinations.FIVE); combinations.add(Combinations.FIVE); signature[5] -= 2; }

        if (signature[1] >= 4) { combinations.add(Combinations.TRIPLE1DOUBLED); signature[1] = 0; }
        if (signature[2] >= 4) { combinations.add(Combinations.TRIPLE2DOUBLED); signature[2] = 0; }
        if (signature[3] >= 4) { combinations.add(Combinations.TRIPLE3DOUBLED); signature[3] = 0; }
        if (signature[4] >= 4) { combinations.add(Combinations.TRIPLE4DOUBLED); signature[4] = 0; }
        if (signature[5] >= 4) { combinations.add(Combinations.TRIPLE5DOUBLED); signature[5] = 0; }
        if (signature[6] >= 4) { combinations.add(Combinations.TRIPLE6DOUBLED); signature[6] = 0; }

        if (signature[1] == 3) { combinations.add(Combinations.TRIPLE1); signature[1] = 0;}
        if (signature[2] == 3) { combinations.add(Combinations.TRIPLE2); signature[2] = 0;}
        if (signature[3] == 3) { combinations.add(Combinations.TRIPLE3); signature[3] = 0;}
        if (signature[4] == 3) { combinations.add(Combinations.TRIPLE4); signature[4] = 0;}
        if (signature[5] == 3) { combinations.add(Combinations.TRIPLE5); signature[5] = 0;}
        if (signature[6] == 3) { combinations.add(Combinations.TRIPLE6); signature[6] = 0;}

        boolean isAllACombination = true;
        for (int n : signature) {
            if (n != 0) isAllACombination = false;
        }
        if (isAllACombination) { combinations.add(Combinations.ALLISCOMBINATION); }

        log.info("Combination: " + Arrays.toString(arr) + " has been resolved as list of combinations: " + combinations);

        return combinations;
    }

    /**
     * Metoda přeparsuje pole s kostkami na více speciální pole,
     * prvky kterého obsahují počet bodů na kostkách
     *
     * Příklad: [3, 5, 5, 3, 1, 3] -> [0, 1, 0, 3, 0, 2]
     *
     * @param arr pole s kostkami
     * @return úpravené pole
     */
    private int[] getSignature(int[] arr) {
        int[] signature = new int[arr.length + 1];
        for (int num : arr) {
            signature[num]++;
        }
        return signature;
    }


    /**
     * Pomocí metoda, ověří jestli kombinací je od 1 do 6
     *
     * @param sign signature pole s kostkami
     * @return jestli je kombinací od 1 do 6
     */
    private boolean isOneToSix(int[] sign) {
        for (int i = 1; i < sign.length; i++) {
            if (sign[i] != 1) return false;
        }
        return true;
    }

    /**
     * Pomocí metoda, ověří jestli kombinací je od 2 do 6
     *
     * @param sign signature pole s kostkami
     * @return jestli je kombinací od 2 do 6
     */
    private boolean isTwoToSix(int[] sign) {
        for (int i = 2; i < sign.length; i++) {
            if (sign[i] != 1) return false;
        }
        return true;
    }

    /**
     * Pomocí metoda, ověří jestli kombinací je od 1 do 5
     *
     * @param sign signature pole s kostkami
     * @return jestli je kombinací od 1 do 5
     */
    private boolean isOneToFive(int[] sign) {
        for (int i = 1; i < sign.length - 1; i++) {
            if (sign[i] != 1) return false;
        }
        return true;
    }

    /**
     * Metoda pro spočítání bodů z kombinací.
     * Vezme si každou kombinaci ze seznamu a přičte
     * odpovídající počet bodu za ni. Pokud všechny kostky je
     * kombinací, zdvojnásobí výsledek
     *
     * @param combinations seznam kombinací
     * @return points počet bodů
     */
    public int countPoints(List<Combinations> combinations) {

        int points = 0;
        for (Combinations combination : combinations) {
            Integer price = this.costs.get(combination);
            points += price != null ? price : 0;
        }

        if (combinations.contains(Combinations.ALLISCOMBINATION)) {
            points *= 2;
        }

        return points;

    }

}
