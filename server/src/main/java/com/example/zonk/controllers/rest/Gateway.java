package com.example.zonk.controllers.rest;

import com.example.zonk.services.AppService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

/**
 * Třída pro nastavení brán pro komunikaci s klientem přes REST API.
 * Nastavují se mappingy koncových bodů a zpracují se synchronně.
 * Každý koncový bod má vstupní data a po zpracování, pokud se nenastane
 * chyba, pošle klientovi vystupní data
 *
 * @author Aleksei Baiukov
 * @version 30.03.2024
 */
@Component
@RestController()
@RequestMapping("/api")
@CrossOrigin
@Slf4j
public class Gateway {

    // uložení služby aplikace
    private final AppService appService = new AppService();

    /**
     * Tesotvý koncoví bod pro otestování dostupnosti komunikaci se serverem
     */
    @GetMapping("/test")
    public String test() {
        return "Test";
    }

    /**
     * Metoda pro zpracování koncového bodu pro získaní aktuálního stavu hry
     *
     * @param dataStr balík typu JSON řádku dat pro tento příkaz, získaný od klienta
     * @return status komunikaci a balík dat typu JSON řádku s odpovědí
     */
    @PostMapping("/getState")
    public ResponseEntity<String> getState(@RequestBody String dataStr) {
        try {
            String result = this.appService.getState(dataStr).toString();
            log.info("End point getState has been resolved. Input: " + dataStr + ". Output: " + result);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    /**
     * Metoda pro zpracování koncového bodu pro hazení kostkami hráčem
     *
     * @param dataStr balík typu JSON řádku dat pro tento příkaz, získaný od klienta
     * @return status komunikaci a null nebo chyba
     */
    @PostMapping("/roll")
    public ResponseEntity<String> roll(@RequestBody String dataStr) {
        try {
            this.appService.roll(dataStr);
            log.info("End point roll has been resolved. Input: " + dataStr);
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    /**
     * Metoda pro zpracování koncového bodu pro potvrzení aktuálního kola po hazení
     * kostkami hráčem
     *
     * @param dataStr balík typu JSON řádku dat pro tento příkaz, získaný od klienta
     * @return status komunikaci a null nebo chyba
     */
    @PostMapping("/submitRoll")
    public ResponseEntity<String> submitRoll(@RequestBody String dataStr) {
        try {
            this.appService.submitRoll(dataStr);
            log.info("End point submitRoll has been resolved. Input: " + dataStr);
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    /**
     * Metoda pro zpracování koncového bodu pro přehazení kostkami hráčem
     *
     * @param dataStr balík typu JSON řádku dat pro tento příkaz, získaný od klienta
     * @return status komunikaci a null nebo chyba
     */
    @PostMapping("/reroll")
    public ResponseEntity<String> reroll(@RequestBody String dataStr) {
        try {
            this.appService.reroll(dataStr);
            log.info("End point reroll has been resolved. Input: " + dataStr);
            return ResponseEntity.ok(null);
        } catch ( Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    /**
     * Metoda pro zpracování koncového bodu pro ověření vyhozeny kombinace kostek
     *
     * @param dataStr balík typu JSON řádku dat pro tento příkaz, získaný od klienta
     * @return status komunikaci a balík dat typu JSON řádku s odpovědí
     */
    @PostMapping("/checkCombination")
    public ResponseEntity<String> checkCombination(@RequestBody String dataStr) {
        try {
            String result = this.appService.checkCombination(dataStr).toString();
            log.info("End point checkCombination has been resolved. Input: " + dataStr + ". Output: " + result);
            return ResponseEntity.ok(result);
        } catch(Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    /**
     * Metoda pro zpracování koncového bodu pro uzavření hry po ukončení
     *
     * @param dataStr balík typu JSON řádku dat pro tento příkaz, získaný od klienta
     * @return status komunikaci a null nebo chyba
     */
    @PostMapping("/closeGame")
    public ResponseEntity<String> closeGame(@RequestBody String dataStr) {
        try {
            this.appService.closeGame(dataStr);
            log.info("End point closeGame has been resolved. Input: " + dataStr);
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    /**
     * Metoda pro zpracování koncového bodu pro získání lobby nebo vytváření jeho
     *
     * @param dataStr balík typu JSON řádku dat pro tento příkaz, získaný od klienta
     * @return status komunikaci a balík dat typu JSON řádku s odpovědí
     */
    @PostMapping("/getRoom")
    public ResponseEntity<String> getRoom(@RequestBody String dataStr) {
        try {
            String result = this.appService.getRoomByPlayerID(dataStr);
            log.info("End point getRoom has been resolved. Input: " + dataStr + ". Output: " + result);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    /**
     * Metoda pro zpracování koncového bodu pro získání seznamu hráčů
     *
     * @param dataStr balík typu JSON řádku dat pro tento příkaz, získaný od klienta
     * @return status komunikaci a balík dat typu JSON řádku s odpovědí
     */
    @PostMapping("/getPlayers")
    public ResponseEntity<String> getPlayers(@RequestBody String dataStr) {
        try {
            String result = this.appService.getPlayersByRoom(dataStr).toString();
            log.info("End point getPlayers has been resolved. Input: " + dataStr);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    /**
     * Metoda pro zpracování koncového bodu pro vytváření nové hry
     *
     * @param dataStr balík typu JSON řádku dat pro tento příkaz, získaný od klienta
     * @return status komunikaci a null nebo chyba
     */
    @PostMapping("/createGame")
    public ResponseEntity<String> createGame(@RequestBody String dataStr) {
        try {
            this.appService.createGame(dataStr);
            log.info("End point createGame has been resolved. Input: " + dataStr);
            return ResponseEntity.ok(null);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    /**
     * Metoda pro zpracování koncového bodu pro příhlášení nového hráče
     *
     * @param dataStr balík typu JSON řádku dat pro tento příkaz, získaný od klienta
     * @return status komunikaci a identifikáční číslo založeného uživatele
     */
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody String dataStr) {
        try {
            String id = this.appService.authorisePlayer(dataStr);
            log.info("End point login has been resolved. Input: " + dataStr + ". Output: " + id);
            return ResponseEntity.ok(id);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    /**
     * Metoda pro zpracování koncového bodu pro ověření stavu hráče
     *
     * @param dataStr balík typu JSON řádku dat pro tento příkaz, získaný od klienta
     * @return status komunikaci a balík dat typu JSON řádku s odpovědí
     */
    @PostMapping("/check")
    public ResponseEntity<String> check(@RequestBody String dataStr) {
        try {
            String status = this.appService.check(dataStr);
            log.info("End point check has been resolved. Input: " + dataStr + ". Output: " + status);
            return ResponseEntity.ok(status);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

}
