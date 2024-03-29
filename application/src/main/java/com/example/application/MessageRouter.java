package com.example.application;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.cef.browser.CefBrowser;
import org.cef.browser.CefFrame;
import org.cef.callback.CefQueryCallback;
import org.cef.handler.CefMessageRouterHandlerAdapter;

public class MessageRouter extends CefMessageRouterHandlerAdapter {

    private SocketClient socketClient;

    private CefBrowser browser_;

    private static final Logger logger = LogManager.getLogger(MessageRouter.class);

    public MessageRouter(SocketClient socketClient, CefBrowser browser) {
        this.socketClient = socketClient;
        this.browser_ = browser;
        logger.debug("Message router has been created");
    }

    @Override
    public boolean onQuery(
            CefBrowser browser,
            CefFrame frame,
            long queryId,
            String request,
            boolean persistent,
            CefQueryCallback callback
    ) {
        logger.info("Message got from client - " + request);
        socketClient.sendMessage(request);
        return false;
    }

    public void sendMessage(String message) {
        browser_.executeJavaScript("window.receiveMessageFromJava('" + message + "')", browser_.getURL(), 0);
        logger.info("Message prepared sent to client - " + message);
    }
}
