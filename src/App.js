import React from "react";
import useCookies from "react-cookie/cjs/useCookies";
import { withRouter, Switch, Route} from "react-router-dom";
import { Snackbar } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import trans from "./public/js/translation";
import config from "./public/js/config";
import { newAccount, getUSDTWallet, createDepositWallet } from "./public/js/blockchain-utils";
/* pages */
import Dashboard from "./pages/dashboard/dashboard";
import About from "./pages/about/about";
import Account from "./pages/account/account";
import Exchange from "./pages/exchange/exchange";
import Details from "./pages/details/details";
import FootNavigation from "./pages/foot/footNavigation";
import LoginPage from "./pages/login/login";
import Wallet from "./pages/wallet/wallet";
import News from "./pages/news/news";
import RegisterPage from "./pages/register/register";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#0d47a1" },
    secondary: { main: "#0288d1" },
    type: "dark",
  },
  overrides: {
    MuiFormLabel: {
      root: {
        "&$focused": { color: "white"}
      },
    },
  },
});

function App(props) {
  const [cookies, setCookie]                  = useCookies(['pfa']);   // cookies state
  const [acCreatedSB, setAcCreatedSB]         = React.useState(false); // account Created Snackbar state
  const [acNCreatedSB, setAcNCreatedSB]       = React.useState(false); // account NOT Created Snackbar state
  const [invalidPkSB, setInvalidPkSB]         = React.useState(false); // wrong private key format state
  const [invalidMobileSB, setInvalidMobileSB] = React.useState(false); // wrong mobile warning snackbar state
  const [loginFailedSB, setLoginFailedSB]     = React.useState(false); // login failed snackbar state
  const [account, setAccount]                 = React.useState({});    // account state
  const [currentUsername, setCurrentUsername] = React.useState("");    // current username state
  const [prefillUsername, setPrefillUsername] = React.useState("");    // prefill username state

  (() => {
    if(localStorage.getItem("lang") != null)
      config.lang = localStorage.getItem("lang")
  })();

  /* invalid mobile snackbar handle */
  const invalidMobileSBOpen   = () => setInvalidMobileSB(true);
  const invalidMobileSBClose  = () => setInvalidMobileSB(false);

  /* account created snackbar handle */
  const acCreatedSBClose      = () => setAcCreatedSB(false);

  /* account not created snackbar handle */
  const acNCreatedSBClose     = () => setAcNCreatedSB(false);

  /* login failed snackbar handle */
  const loginFailedSBClose    = () => setLoginFailedSB(false);

  /* on account change handle */
  const onAccChange = name => {
    onLogout();
    setPrefillUsername(name);
  };

  /* on register handle */
  const onRegister = async (regionCode, mobile, accessCode, pvKey) => {
    try {
      await newAccount(regionCode, mobile, accessCode, pvKey);
      setAcCreatedSB(true);

      props.history.push("/login-account");
    } catch (err) {
      console.log(err);
      err.toString().includes("Wrong Private Key Format") ? setInvalidPkSB(true) : setAcNCreatedSB(true);
    }
  };

  /* on login handle */
  // ray.li.bot : username = region + mobile, password = access code
  const onLogin = async (username, password) => {
    try {
      // Seperate Region Code + Mobile
      const values = username.trim().split(' ');
      if (values.length !== 2) {
        throw new Error('invalid phone formatting');
      }

      const regionCode = values[0].replace('+', '');
      const phone = values[1];

      let accountObj = await getUSDTWallet(regionCode, phone, password);
      let depositAddr = await createDepositWallet(accountObj.address);
      accountObj.USDTaddress = depositAddr.address;
      if (accountObj.error) {
        throw new Error('account not found');
      }
      setAccount(accountObj);
      setCookie('acctobj', accountObj, { path: '/' });
      console.log(cookies.acctobj);
      setCurrentUsername(username);
      setCookie('username', username, { path: '/' });
      props.history.push("/app");
     
    } catch (err) {
      console.log(err);
      setLoginFailedSB(true);
    }
  };

  /* on logout handle */
  const onLogout = () => {
    setAccount({});
    setCookie('acctobj', {}, { path: '/' });
    setCurrentUsername('');
    setCookie('username', '', { path: '/' });
    props.history.push("/login-account");
  };

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Switch>
          <Route path={"/create-account"}
            render={() => (
              <RegisterPage 
                onRegister={onRegister} 
                popMobileWarning={invalidMobileSBOpen} />
            )}
          />
          <Route path={"/app"}
            render={() => (
              <div>
                <Dashboard
                  account={account}
                />
                <FootNavigation {...props}/>
              </div>
            )}
          />
          <Route path={"/about"}
            render={() => (
              <div>
                <About
                  props={props} account={account} onLogout={onLogout}/>
                <FootNavigation {...props} />
              </div>
            )}
          />
          <Route path={"/details"}
            render={() => (
              <div>
                <Details props={props} account={account} />
                <FootNavigation {...props} />
              </div>
            )}
          />
          <Route path={"/wallet"}
            render={() => (
              <div>
                <Wallet props={props} account={account}/>
                <FootNavigation {...props} />
              </div>
            )}
          />
          <Route path={"/exchange"}
            render={() => (
              <div>
                <Exchange
                  account={account}
                />
                <FootNavigation {...props} />
              </div>
            )}
          />
          <Route path={"/news"}
          render={() => (
            <div>
              <News props={props} />
              <FootNavigation {...props} />
            </div>
          )}
        />
          <Route path={"/account"} component={Account} />
          <Route
            render={() => (
              <LoginPage
                onLogin={onLogin}
                prefillUsername={prefillUsername}
                onAccChange={onAccChange}
              />
            )}
          />
        </Switch>

        <Snackbar
          open={acCreatedSB}
          autoHideDuration={6000}
          onClose={acCreatedSBClose}
          message={trans.accountCreatedInfo[config.lang]}
        />

        <Snackbar
          open={acNCreatedSB}
          autoHideDuration={6000}
          onClose={acNCreatedSBClose}
          message={trans.accountNotCreatedInfo[config.lang]}
        />

        <Snackbar
          open={invalidPkSB}
          autoHideDuration={6000}
          onClose={acNCreatedSBClose}
          message={trans.wrongPrivateKeyFormat[config.lang]}
        />

        <Snackbar
          open={loginFailedSB}
          autoHideDuration={6000}
          onClose={loginFailedSBClose}
          message={trans.cannotLoginWarning[config.lang]}
        />

        <Snackbar
          open={invalidMobileSB}
          autoHideDuration={6000}
          onClose={invalidMobileSBClose}
          message={trans.mobileWarning[config.lang]}
        />
      </React.Fragment>
    </ThemeProvider>
  );
}

export default withRouter(App);
