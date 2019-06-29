import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import CookiesProvider from "react-cookie/cjs/CookiesProvider";
import 'antd-mobile/dist/antd-mobile.css';//antd样式引入
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { initweb3 } from "./public/js/blockchain-utils";
import { getEquipmentType } from "./public/js/utils";

initweb3();

const startApp = () => {
  ReactDOM.render(
    <CookiesProvider>
      <Router>
        <App />
      </Router>
    </CookiesProvider>,
    document.getElementById("root"),
  );

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
};

getEquipmentType();//Obtain equipment model

if (window.cordova) {
  document.addEventListener("deviceready", startApp, false);
} else {
  startApp();
}


