package com.example.zonk.entities;

import com.example.zonk.enums.Combinations;
import com.example.zonk.enums.GameStatuses;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Random;

@Slf4j
public class Rolling implements Runnable {

    Game game;

    public Rolling(Game game) {
        this.game = game;
    }

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
