package com.example.zonk.controllers.socket.commands;


import com.example.zonk.enums.TaskStatuses;
import com.example.zonk.services.AppService;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;

import java.util.Optional;

/**
 * Třída implementující rozhrání ICommand, pro nastavení příkazů.
 * Tento příkaz zpracuje potvrzení kola hry po hazení kostek
 *
 * @author Aleksei Baiukov
 * @version 30.03.2024
 */
@Slf4j
public class SubmitRoll implements ICommand {
    // uložení služby aplikace
    private final AppService appService;

    // název příkazu
    private String name = "api/submitRoll";

    // identifikácní číslo příkazu
    private String taskID;

    // aktuální status příkazu
    private String status = TaskStatuses.UNEXECUTED;

    /**
     * Konstruktor třídy specifikující službu aplikace
     */
    public SubmitRoll(AppService appService) {
        this.appService = appService;
    }

    /**
     * Vrátí uložený název tohoto příkazu
     *
     * @return název příkazu
     */
    public String getName() {
        return name;
    }

    /**
     * Vrátí uložený status tohoto příkazu
     *
     * @return název příkazu
     */
    public String getStatus() { return this.status; }

    /**
     * Vrátí uložené identifikácní číslo tohoto příkazu
     *
     * @return název příkazu
     */
    public String getTaskID() { return this.taskID; }

    /**
     * Nastaví nové jméno příkazu. Jméno je potřeba pro správnou identifikaci
     * příkazu službou aplikace
     *
     * @param name název příkazu
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Nastaví nový status příkazu. Status služí pro rozpoznavání stavu příkazu,
     * jestli už byl zpracován, nebo ne.
     *
     * @param status status příkazu
     */
    public void setStatus(String status) { this.status = status;}

    /**
     * Nastaví nové identifikáční číslo příkazu. Identifikáční číslo slouží pro
     * jednoznačnou identifikaci konkretního příkazu kontrollerem příkazu
     *
     * @param taskID identifikáční číslo příkazu
     */
    public void setTaskID(String taskID) { this.taskID = taskID; }

    /**
     * Metoda ověří, jestli se jedná o tento příkaz, nebo ne. Pokud hledaný příkaz má
     * shodné jméno s tadytím, tak se musí jednat o stejný příkaz.
     *
     * @param command název hledaného příkazu
     * @return jestli hledaný příkaz je tento
     */
    public boolean isThat(String command) {
        return this.name.equals(command);
    }

    /**
     * Spustí se zpracování příkazu. Každý balík dat, který dostaneme po úpravení od kontrolera, obsahuje
     * status tohoto příkazu (nejspíš UNEXECUTED) a data pro zpracování. Toto se pak naparsuje do dvou entit,
     * status bude uložen a data se přepošlou na službu aplikace
     *
     * @param dataStr balík dat, získaný od klienta
     * @return řádek typu JSON s odpovědí obsahující vysledek provedeného příkazu, který se pak
     * naparsuje frontend klienta
     */
    @Override
    public String execute(String dataStr) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("taskID", this.taskID);
        try {
            this.status = TaskStatuses.SUCCESS;
            this.appService.submitRoll(dataStr);
            jsonObject.put("status", TaskStatuses.SUCCESS);
            jsonObject.put("data", Optional.ofNullable(null));
            log.info("Command executed: " + name + "DataProviden: " + dataStr + "Result: " + jsonObject);
            return jsonObject.toString();
        } catch (Exception e) {
            this.status = TaskStatuses.ERROR;
            jsonObject.put("status", TaskStatuses.ERROR);
            jsonObject.put("data", e.getMessage());
            log.error("Command failed: " + name + "DataProviden: " + dataStr + "Result: " + jsonObject);
            return jsonObject.toString();
        }
    }
}
