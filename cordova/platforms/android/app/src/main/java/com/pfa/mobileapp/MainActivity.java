/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.pfa.mobileapp;

import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.Bundle;
import android.os.StrictMode;
import android.widget.Toast;

import org.apache.cordova.*;
import org.json.JSONObject;

class ReturnEntity{
    public int code;
    public JSONObject message;
    public String words;
    public ReturnEntity(int code, String message){
        this.code=code;
        try{
            this.message = new JSONObject(message) ;
        }catch (Exception e){
            e.printStackTrace();
        }
        this.words = message;

    }
}
class CheckNetClass {

    public static Boolean checknetwork(Context mContext) {

        NetworkInfo info = ((ConnectivityManager) mContext.getSystemService(Context.CONNECTIVITY_SERVICE))
                .getActiveNetworkInfo();
        if (info == null || !info.isConnected())
        {
            return false;
        }
        if (info.isRoaming()) {
            // here is the roaming option you can change it if you want to
            // disable internet while roaming, just return false
            return true;
        }

        return true;

    }
}

public class MainActivity extends CordovaActivity
{
    static String ver ="0.1";
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);
        // enable Cordova apps to be started in the background
        if(CheckNetClass.checknetwork(getApplicationContext())) {
            HttpGet hg = new HttpGet();
            ReturnEntity re = hg.sendGet2("https://fervent-leakey-f04231.netlify.com/ver.html","");
            if(!re.words.equals(ver)){
                String url = "https://fervent-leakey-f04231.netlify.com/app-release.apk";
                Intent i = new Intent(Intent.ACTION_VIEW);
                i.setData(Uri.parse(url));
                Context context = getApplicationContext();
                CharSequence text = "APP更新，已幫你下載新app，請安裝後再進來!";
                int duration = Toast.LENGTH_LONG;

                Toast toast = Toast.makeText(context, text, duration);
                toast.show();
                startActivity(i);

                this.finish();
            }
        }
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }

        // Set by <content src="index.html" /> in config.xml
        loadUrl(launchUrl);
    }
}
