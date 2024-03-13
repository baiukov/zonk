package com.example.application;

import org.cef.browser.CefBrowser;
import org.cef.browser.CefFrame;
import org.cef.callback.CefQueryCallback;
import org.cef.handler.CefMessageRouterHandlerAdapter;

public class MessageRouter extends CefMessageRouterHandlerAdapter {

    private SocketClient socketClient;

    private CefBrowser browser_;

    public MessageRouter(SocketClient socketClient, CefBrowser browser) {
        this.socketClient = socketClient;
        this.browser_ = browser;
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
        System.out.println(request);
        socketClient.sendMessage(request);
        return false;
    }

    public void sendMessage(String message) {
        System.out.println(message);
        browser_.executeJavaScript("window.receiveMessageFromJava('" + message + "')", browser_.getURL(), 0);
    }
}
