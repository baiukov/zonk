// Copyright (c) 2014 The Chromium Embedded Framework Authors. All rights
// reserved. Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE file.

package com.example.application;

import me.friwi.jcefmaven.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.cef.CefApp;
import org.cef.CefApp.CefAppState;
import org.cef.CefClient;
import org.cef.browser.CefBrowser;
import org.cef.browser.CefFrame;
import org.cef.browser.CefMessageRouter;
import org.cef.handler.CefDisplayHandlerAdapter;
import org.cef.handler.CefFocusHandlerAdapter;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.io.IOException;


/**
 * This is a simple example application using JCEF.
 * It displays a JFrame with a JTextField at its top and a CefBrowser in its
 * center. The JTextField is used to enter and assign an URL to the browser UI.
 * No additional handlers or callbacks are used in this example.
 *
 * The number of used JCEF classes is reduced (nearly) to its minimum and should
 * assist you to get familiar with JCEF.
 *
 * For a more feature complete example have also a look onto the example code
 * within the package "tests.detailed".
 */
public class MainFrame extends JFrame {
    private static final long serialVersionUID = -5570653778104813836L;
    private final JTextField address_;
    private final CefApp cefApp_;
    private final CefClient client_;
    private final CefBrowser browser_;
    private final Component browerUI_;
    private boolean browserFocus_ = true;
    private static final Logger logger = LogManager.getLogger(MainFrame.class);

    private MainFrame(String startURL, boolean useOSR, boolean isTransparent, String[] args) throws UnsupportedPlatformException, CefInitializationException, IOException, InterruptedException {

        CefAppBuilder builder = new CefAppBuilder();

        builder.getCefSettings().windowless_rendering_enabled = useOSR;

        builder.setAppHandler(new MavenCefAppHandlerAdapter() {
            @Override
            public void stateHasChanged(org.cef.CefApp.CefAppState state) {
                if (state == CefAppState.TERMINATED) System.exit(0);
            }
        });

        if (args.length > 0) {
            builder.addJcefArgs(args);
        }

        cefApp_ = builder.build();

        client_ = cefApp_.createClient();

        browser_ = client_.createBrowser(startURL, useOSR, isTransparent);
        browerUI_ = browser_.getUIComponent();

        address_ = new JTextField(startURL, 100);
        address_.addActionListener(e -> browser_.loadURL(address_.getText()));

        client_.addDisplayHandler(new CefDisplayHandlerAdapter() {
            @Override
            public void onAddressChange(CefBrowser browser, CefFrame frame, String url) {
                address_.setText(url);
            }
        });

        address_.addFocusListener(new FocusAdapter() {
            @Override
            public void focusGained(FocusEvent e) {
                if (!browserFocus_) return;
                browserFocus_ = false;
                KeyboardFocusManager.getCurrentKeyboardFocusManager().clearGlobalFocusOwner();
                address_.requestFocus();
            }
        });

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

        getContentPane().add(address_, BorderLayout.NORTH);
        getContentPane().add(browerUI_, BorderLayout.CENTER);
        pack();
        setSize(800, 600);
        setVisible(true);

        SocketClient socketClient = new SocketClient();
        socketClient.start();

        CefMessageRouter messageRouter = CefMessageRouter.create();
        MessageRouter customRouter = new MessageRouter(socketClient, browser_);
        messageRouter.addHandler(customRouter, true);
        socketClient.setMessageRouter(customRouter);
        client_.addMessageRouter(messageRouter);

        addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                CefApp.getInstance().dispose();
                dispose();
            }
        });
    }

    public static void main(String[] args) throws UnsupportedPlatformException, CefInitializationException, IOException, InterruptedException {

        boolean useOsr = false;
        new MainFrame("http://localhost:5500", useOsr, false, args);
        logger.info("The application has been started");
    }
}