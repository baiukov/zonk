package com.example.zonk.entities;

import com.example.zonk.enums.Combinations;
import com.example.zonk.enums.GameStatuses;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Random;

/**
 * Třída popisující entitu procesu házení kostkami ve vymezeném
 * vlakně. Při hazení kostkami, vytovří, změní se stav hry, pak se
 * vytvoří nové vlakno pro tuto třídu a proces se nastartuje. Až
 * se proces hazení ukončí třída svou čínnost ukončí a zruší vlakno.
 *
 * @author Aleksei Baiukov
 * @version 30.03.2024
 */
@Slf4j
public class Rolling implements Runnable {

    // uložení instanci hry, ve které probíhá hazení
    Game game;

    /**
     * Konstruktor třídy specifikující hru ve které číní hazení
     */
    public Rolling(Game game) {
        this.game = game;
    }

    /**
     * Metoda pro provádění procesu hazení kostkami. Počká 5 sekud než se zpracuje,
     * pak zjistí který hráč teď hazí a jaký má stav a vygeneruje pro něj sadu nových
     * kostek kromě těch, co jsou zablokovány, to jsou ty, které vybral pro přehazení (pokud
     * jde o přehazení). Potom zjistí jaké a jestli jsou kombinace v nově vygenerováné sadě
     * kostek a vymaže kombinace odehrané. Na konec přídá hráči aktuální scóre a ukončí vlakno
     *
     */
    @Override
    public void run() {
        try {
            game.setDices(null);
            Thread.sleep(5 * 1000);
            int[] dices = new int[6];
            Player turn = game.getTurn();
            Random random = new Random();
            int[] bannedDices = turn.getBannedDices();
            for (int i = 0; i < dices.length; i++) {
                if (bannedDices[i] != 0) {
                    dices[i] = bannedDices[i];
                    continue;
                };
                dices[i] = random.nextInt(5) + 1;
            }
            int[] dicesCopy = dices.clone();
            for (int i = 0; i < bannedDices.length; i++) {
                if (bannedDices[i] == 0) continue;
                dicesCopy[i] = 0;
            }
            Combination combination = new Combination();
            List<Combinations> combinations = combination.getCombinations(dicesCopy);
            List<Combinations> bannedCombinations = combination.getCombinations(turn.getBannedDices());
            for (Combinations currentCombination : bannedCombinations) {
                combinations.remove(currentCombination);
            }

            turn.addCurrentPoints(combination.countPoints(combinations));
            game.setDices(dices);
            game.setStatus(GameStatuses.PENDING);
            if (combinations.isEmpty()) {
                turn.setCurrentPoints(0);
            }

            Thread.currentThread().interrupt();
        } catch (InterruptedException e) {
            log.error(e.getMessage());
        }
    }
}
