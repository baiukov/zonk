package com.example.zonk.entities;

import com.example.zonk.enums.Combinations;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class CombinationTest {

    private final Stream<Arguments> testCases = Stream.of(
            Arguments.of(
                    "Only one 1",
                    new int[]{1, 3, 3, 4, 4, 6},
                    new ArrayList<>(List.of(Combinations.ONE))
            ),
            Arguments.of(
                    "Only one 5",
                    new int[]{5, 3, 3, 4, 4, 6},
                    new ArrayList<>(List.of(Combinations.FIVE))
            ),
            Arguments.of(
                    "Only one 1",
                    new int[]{4, 3, 3, 1, 4, 6},
                    new ArrayList<>(List.of(Combinations.ONE))
            ),
            Arguments.of(
                    "Only one 5",
                    new int[]{3, 3, 5, 4, 4, 6},
                    new ArrayList<>(List.of(Combinations.FIVE))
            ),
            Arguments.of(
                    "Three 1",
                    new int[]{1, 1, 1, 4, 4, 6},
                    new ArrayList<>(List.of(Combinations.TRIPLE1))
            )
//            Arguments.of(
//                    "Six 1, all is combination",
//                    new int[]{1, 1, 1, 1, 1, 1},
//                    new ArrayList<>(List.of(Combinations.TRIPLE1DOUBLED, Combinations.ALLISCOMBINATION))
//            ),
//            Arguments.of(
//                    "One to six, all is combination",
//                    new int[]{1, 2, 3, 4, 5, 6},
//                    new ArrayList<>(List.of(Combinations.ONETOSIX, Combinations.ALLISCOMBINATION))
//            ),
//            Arguments.of(
//                    "Two to six",
//                    new int[]{2, 3, 4, 5, 6, 2},
//                    new ArrayList<>(List.of(Combinations.TWOTOSIX))
//            ),
//            Arguments.of(
//                    "Two to six, all is combination",
//                    new int[]{2, 3, 4, 5, 6, 5},
//                    new ArrayList<>(List.of(Combinations.TWOTOSIX, Combinations.ALLISCOMBINATION))
//            ),
//            Arguments.of(
//                    "One to five",
//                    new int[]{1, 2, 3, 4, 5, 3},
//                    new ArrayList<>(List.of(Combinations.ONETOFIVE))
//            ),
//            Arguments.of(
//                    "One to five, all is combinaiton",
//                    new int[]{1, 2, 3, 4, 5, 5},
//                    new ArrayList<>(List.of(Combinations.ONETOFIVE, Combinations.ALLISCOMBINATION))
//            )
    );

    private Stream<Arguments> getTestCases() {
        return testCases;
    }

    @ParameterizedTest
    @MethodSource("getTestCases")
    void givenDicesShouldReturnIfCombination(String message, int[] dices, List<Combinations> expectedValue) {
        System.out.println(message);
        Combination combination = new Combination();
        assertEquals(expectedValue, combination.getCombinations(dices));
    }
}
