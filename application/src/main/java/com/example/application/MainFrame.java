package com.example.application;

import me.friwi.jcefmaven.CefAppBuilder;
import me.friwi.jcefmaven.CefInitializationException;
import me.friwi.jcefmaven.MavenCefAppHandlerAdapter;
import me.friwi.jcefmaven.UnsupportedPlatformException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.cef.CefApp;
import org.cef.CefApp.CefAppState;
import org.cef.CefClient;
import org.cef.browser.CefBrowser;
import org.cef.browser.CefMessageRouter;
import org.cef.handler.CefFocusHandlerAdapter;

import javax.swing.*;
import java.awt.*;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.io.IOException;


/**
 * Toto je aplikace využívající JCEF pro spuštění interního prohlížeče v applikaci.
 * Používá se pro jako hlávní trída pro spuštění deskotopové aplikace. Je nutné
 * využít Cef, protože standardní prohlížeč JavaFx neobsahuje podstatné prvky, potřebné
 * pro korektné zpracování frontendu
 * Zobrazuje JFrame v jeho horní části a CefBrowser uprostřed.
 * Počet použitých tříd JCEF je snížen téměř na minimum.
 *
 * @author Aleksei Baiukov
 * @version 31.03.24
 */
public class MainFrame extends JFrame {

    // nastavení pozoru na prohlížeč
    private boolean browserFocus_ = true;

    // uložení instanci loggeru
    private static final Logger logger = LogManager.getLogger(MainFrame.class);

    /**
     * Konstruktor třídy specifikující odkaz na stránku hry, nastavení prohlížeče další nastavení
     * argumentů při spuštění hlávní metody
     *
     * @param useOSR obnovení okna prohlížeče, když je stahováno
     * @param isTransparent nastavení průhlednosti prohlížeče
     * @throws UnsupportedPlatformException spušteno na nepodporované platformě
     * @throws CefInitializationException vyjímka initializace prohlížeče
     * @throws IOException vyjímka vstupu, vystupu
     * @throws InterruptedException vyjímka porušení vlakna
     *
     */
    private MainFrame(String startURL, boolean useOSR, boolean isTransparent, String[] args)
            throws UnsupportedPlatformException, CefInitializationException, IOException, InterruptedException
    {

        // instance builderu aplikace
        CefAppBuilder builder = new CefAppBuilder();

        // nastavení OSR prohlížeče
        builder.getCefSettings().windowless_rendering_enabled = useOSR;

        // nastavení ukončení procesu, pokud okno je zavřeno
        builder.setAppHandler(new MavenCefAppHandlerAdapter() {
            @Override
            public void stateHasChanged(org.cef.CefApp.CefAppState state) {
                if (state == CefAppState.TERMINATED) System.exit(0);
            }
        });

        // nastavení dalších parametru, které jsou zadány při nastartování aplikace
        if (args.length > 0) {
            builder.addJcefArgs(args);
        }

        // zbuildována aplikace
        CefApp cefApp_ = builder.build();

        // vytvoření nového klienta
        CefClient client_ = cefApp_.createClient();

        // vytvoření prohlížeče pro klienta
        CefBrowser browser_ = client_.createBrowser(startURL, useOSR, isTransparent);
        Component browerUI_ = browser_.getUIComponent();

        // nastavení poslouchače focusu, pokud uživatel klikne na něco, kde je potřeba
        // vytvořit klávesnici, tak to mu ji zobrází a nebo zruší
        client_.addFocusHandler(new CefFocusHandlerAdapter() {
            @Override
            public void onGotFocus(CefBrowser browser) {
                if (browserFocus_) return;
                browserFocus_ = true;
                KeyboardFocusManager.getCurrentKeyboardFocusManager().clearGlobalFocusOwner();
                browser.setFocus(true);
            }

            @Override
            public void onTakeFocus(CefBrowser browser, boolean next) {
                browserFocus_ = false;
            }
        });

        // nastavení okna javaFXové aplikace
        getContentPane().add(browerUI_, BorderLayout.CENTER);
        pack();
        setSize(800, 600);
        setVisible(true);

        // nastavení přesměrováče zpráv
        CefMessageRouter messageRouter = CefMessageRouter.create();
        MessageRouter customRouter = new MessageRouter(browser_);
        messageRouter.addHandler(customRouter, true);
        client_.addMessageRouter(messageRouter);

        // při kliknutí křížku uzavře okno
        addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                CefApp.getInstance().dispose();
                dispose();
            }
        });
    }

    /**
     * Hlavní metoda aplikace pro spuštění. Vyvolá konstruktor hlávního okna, který pak
     * vytvoří i prohlížeč a připojí se k socketovému serveru
     *
     * @param args argumenty zadány při spuštění applikace
     *
     */
    public static void main(String[] args)
            throws UnsupportedPlatformException, CefInitializationException, IOException, InterruptedException
    {
        boolean useOsr = false;
        new MainFrame("http://26.230.10.134:5500", useOsr, false, args);
        logger.info("The application has been started");
    }
}