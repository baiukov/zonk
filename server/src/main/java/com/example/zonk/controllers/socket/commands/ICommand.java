package com.example.zonk.controllers.socket.commands;

import com.example.zonk.enums.TaskStatuses;

/**
 * Rozhrání nastavující proměnné a metody pro všechny příkazy.
 * Každý příkaz musí implementovat toto rozhrání a zahrnovat
 * všechna uvedená nastavení pro správné zpracování.
 *
 * @author Aleksei Baiukov
 * @version 30.03.2024
 */
public interface ICommand {
    // název příkazu
    String name = null;

    // identifikácní číslo příkazu
    String taskID = null;

    // aktuální status příkazu
    String status = TaskStatuses.UNEXECUTED;

    /**
     * Vrátí uložený název tohoto příkazu
     *
     * @return název příkazu
     */
    String getName();

    /**
     * Vrátí uložený status tohoto příkazu
     *
     * @return název příkazu
     */
    String getStatus();

    /**
     * Vrátí uložené identifikácní číslo tohoto příkazu
     *
     * @return název příkazu
     */
    String getTaskID();

    /**
     * Nastaví nové jméno příkazu. Jméno je potřeba pro správnou identifikaci
     * příkazu službou aplikace
     *
     * @param name název příkazu
     */
    void setName(String name);

    /**
     * Nastaví nový status příkazu. Status služí pro rozpoznavání stavu příkazu,
     * jestli už byl zpracován, nebo ne.
     *
     * @param status status příkazu
     */
    void setStatus(String status);

    /**
     * Nastaví nové identifikáční číslo příkazu. Identifikáční číslo slouží pro
     * jednoznačnou identifikaci konkretního příkazu kontrollerem příkazu
     *
     * @param taskID identifikáční číslo příkazu
     */
    void setTaskID(String taskID);

    /**
     * Metoda ověří, jestli se jedná o tento příkaz, nebo ne. Pokud hledaný příkaz má
     * shodné jméno s tadytím, tak se musí jednat o stejný příkaz.
     *
     * @param command název hledaného příkazu
     * @return jestli hledaný příkaz je tento
     */
    boolean isThat(String command);

    /**
     * Spustí se zpracování příkazu. Každý balík dat, který dostaneme po úpravení od kontrolera, obsahuje
     * status tohoto příkazu (nejspíš UNEXECUTED) a data pro zpracování. Toto se pak naparsuje do dvou entit,
     * status bude uložen a data se přepošlou na službu aplikace
     *
     * @param dataStr balík dat, získaný od klienta
     * @return řádek typu JSON s odpovědí obsahující vysledek provedeného příkazu, který se pak
     * naparsuje frontend klienta
     */
    String execute(String dataStr);
}
