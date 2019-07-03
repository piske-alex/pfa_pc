package com.pfa.mobileapp;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.util.Log;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class HttpGet extends Service {
    public HttpGet() {
    }
    public ReturnEntity sendGet(String urlAdress,String token) {

        try {
            URL url = new URL("https://koin-exchange.com/api/"+urlAdress);
            Log.e("hh","https://koin-exchange.com/api/"+urlAdress);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            //conn.setRequestMethod("GET");
            //conn.setRequestProperty("Content-Type", "application/json");
            //conn.setRequestProperty("Accept","application/json");
            if(!token.equals("")){
                conn.setRequestProperty("Authorization",token);
            }
            //conn.setDoOutput(true);

            BufferedReader br;
            if (200 <= conn.getResponseCode() && conn.getResponseCode() < 400) {
                br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            } else {
                br = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
            }
            //br = new BufferedReader(new InputStreamReader((conn.getInputStream())));
            StringBuilder sb = new StringBuilder();
            String output;
            while ((output = br.readLine()) != null) {
                sb.append(output);
            }
            ReturnEntity returnEntity = new ReturnEntity(conn.getResponseCode(),sb.toString());
            Log.e("sfdsfWQW",conn.getResponseMessage());
            Log.e("sfdsfWQW",sb.toString());

            conn.disconnect();

            return returnEntity;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ReturnEntity(502,"error");
    }

    public ReturnEntity sendGet2(String urlAdress,String token) {

        try {
            URL url = new URL(urlAdress);
            Log.e("hh",urlAdress);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            //conn.setRequestMethod("GET");
            //conn.setRequestProperty("Content-Type", "application/json");
            //conn.setRequestProperty("Accept","application/json");
            if(!token.equals("")){
                conn.setRequestProperty("Authorization",token);
            }
            //conn.setDoOutput(true);

            BufferedReader br;
            if (200 <= conn.getResponseCode() && conn.getResponseCode() < 400) {
                br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            } else {
                br = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
            }
            //br = new BufferedReader(new InputStreamReader((conn.getInputStream())));
            StringBuilder sb = new StringBuilder();
            String output;
            while ((output = br.readLine()) != null) {
                sb.append(output);
            }
            ReturnEntity returnEntity = new ReturnEntity(conn.getResponseCode(),sb.toString());
            Log.e("sfdsfWQW",conn.getResponseMessage());
            Log.e("sfdsfWQW",sb.toString());

            conn.disconnect();

            return returnEntity;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ReturnEntity(502,"error");
    }


    @Override
    public IBinder onBind(Intent intent) {
        // TODO: Return the communication channel to the service.
        throw new UnsupportedOperationException("Not yet implemented");
    }
}
