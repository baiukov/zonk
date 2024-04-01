package com.example.zonk.enums;

/**
 *  Dostuné stavy hry
 */
public class GameStatuses {
    /**
     *  Děje se proces hazení
     */
    public static String ROLLING = "Rolling";

    /**
     *  Čekání na hazení kostkami hrajícím hráčem
     */
    public static String WAITING = "Waiting";

    /**
     *  Čekání na rozhodnutí hrajícího hráče ohledně přehazení
     */
    public static String PENDING = "Pending";

    /**
     *  Hra je ukončená, ale nemusí být ještě zavřená
     */
    public static String FINISHED = "Finished";

}
