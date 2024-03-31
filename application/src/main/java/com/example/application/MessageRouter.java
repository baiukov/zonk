package com.example.application;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.cef.browser.CefBrowser;
import org.cef.browser.CefFrame;
import org.cef.callback.CefQueryCallback;
import org.cef.handler.CefMessageRouterHandlerAdapter;

/**
 * Třída pro přesměrování zpráv a komunikaci s klientem, tzv. most
 * Pokud dostane od frontendu zprávu, tak ji přepošle na serveru, pokud zpráva
 * přijde ze serveru hned odeslána frontendu
 *
 * @author Aleksei Baiukov
 * @version 31.03.24
 */
public class MessageRouter extends CefMessageRouterHandlerAdapter {

    // uložení socketu klienta
    private final SocketClient socketClient;

    // uložení prohlížeče, ve kterém frontend běží
    private final CefBrowser browser_;

    // uložení loggeru
    private static final Logger logger = LogManager.getLogger(MessageRouter.class);

    /**
     * Konstruktor třídy specifikující socket klienta a prohlížeč s frontendovou
     * aplikací
     */
    public MessageRouter(SocketClient socketClient, CefBrowser browser) {
        this.socketClient = socketClient;
        this.browser_ = browser;
        logger.debug("Message router has been created");
    }

    /**
     * Metoda vyvolána z frontendu pro posílání na klienta (sem)
     * zpráv
     *
     * @param browser prohlížeč s frontendovou apliakcí
     * @param frame okno prohlížeče
     * @param queryId identifikáční číslo zprávy (automaticky vygenerované)
     * @param request obsah zprávy
     * @param persistent stav zpráv, její pevnost
     * @param callback metoda vyvolána pro zpětnou vazbu
     */
    @Override
    public boolean onQuery(
            CefBrowser browser,
            CefFrame frame,
            long queryId,
            String request,
            boolean persistent,
            CefQueryCallback callback
    ) {
        logger.info("Message got from frontend - " + request);
        socketClient.sendMessage(request);
        return false;
    }

    /**
     * Metoda pro posílání zpráv na frontendovou aplikaci.
     * Pošle ji tak, že zavolá javascriptovou metodu, uloženou do
     * hlávní globální proměnné window a předá jí zprávu
     *
     * @param message obsah zprávy
     */
    public void sendMessage(String message) {
        browser_.executeJavaScript("window.receiveMessageFromJava('" + message + "')", browser_.getURL(), 0);
        logger.info("Message prepared sent to frontend - " + message);
    }
}
