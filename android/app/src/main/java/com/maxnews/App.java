package com.maxnews;

import android.app.Application;

/**
 * Created by jsun on 16/6/21.
 */
public class App extends Application {
    public static String MAXLEAP_APPID = "your_maxleap_appId";
    public static String MAXLEAP_CLIENTKEY = "your_maxleap_clientKey";

    @Override
    public void onCreate() {
        super.onCreate();
        com.maxleap.MaxLeap.initialize(this, MAXLEAP_APPID, MAXLEAP_CLIENTKEY, com.maxleap.MaxLeap.REGION_CN);
    }
}
