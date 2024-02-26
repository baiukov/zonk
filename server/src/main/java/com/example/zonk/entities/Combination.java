package com.example.zonk.entities;

import com.example.zonk.enums.Combinations;

import java.util.ArrayList;
import java.util.List;

public class Combination {

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
            combinations.add(Combinations.THREEPAIRS1);
            return combinations;
        }

        if (this.isOneToFive(signature)) {
            combinations.add(Combinations.ONETOFIVE);
            signature[1]--; signature[5]--;
        }

        if (this.isTwoToSix(signature)) {
            combinations.add(Combinations.TWOTOSIX);
            signature[5]--;
        }

        if (signature[1] == 1) { combinations.add(Combinations.ONE); }
        if (signature[5] == 1) { combinations.add(Combinations.FIVE); }

        if (signature[1] == 2) { combinations.add(Combinations.ONE); combinations.add(Combinations.ONE); }
        if (signature[5] == 2) { combinations.add(Combinations.FIVE); combinations.add(Combinations.FIVE); }

        if (signature[1] >= 4) { combinations.add(Combinations.TRIPLE1DOUBLED); }
        if (signature[2] >= 4) { combinations.add(Combinations.TRIPLE2DOUBLED); }
        if (signature[3] >= 4) { combinations.add(Combinations.TRIPLE3DOUBLED); }
        if (signature[4] >= 4) { combinations.add(Combinations.TRIPLE4DOUBLED); }
        if (signature[5] >= 4) { combinations.add(Combinations.TRIPLE5DOUBLED); }
        if (signature[6] >= 4) { combinations.add(Combinations.TRIPLE6DOUBLED); }

        if (signature[1] == 3) { combinations.add(Combinations.TRIPLE1); }
        if (signature[2] == 3) { combinations.add(Combinations.TRIPLE2); }
        if (signature[3] == 3) { combinations.add(Combinations.TRIPLE3); }
        if (signature[4] == 3) { combinations.add(Combinations.TRIPLE4); }
        if (signature[5] == 3) { combinations.add(Combinations.TRIPLE5); }
        if (signature[6] == 3) { combinations.add(Combinations.TRIPLE6); }

        return combinations;
    }

    private int[] getSignature(int[] arr) {
        int[] signature = new int[arr.length + 1];
        for (int num : arr) {
            signature[num]++;
        }
        return signature;
    }


    private boolean isOneToSix(int[] sign) {
        for (int i = 1; i < sign.length; i++) {
            if (sign[i] != 1) return false;
        }
        return true;
    }

    private boolean isTwoToSix(int[] sign) {
        for (int i = 2; i < sign.length; i++) {
            if (sign[i] != 1) return false;
        }
        return true;
    }
    private boolean isOneToFive(int[] sign) {
        for (int i = 1; i < sign.length - 1; i++) {
            if (sign[i] != 1) return false;
        }
        return true;
    }

}
