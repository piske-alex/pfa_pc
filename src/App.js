import React from "react";
import useCookies from "react-cookie/cjs/useCookies";
import { withRouter, Switch, Route} from "react-router-dom";
import { Snackbar } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import trans from "./public/js/translation";
import config from "./public/js/config";
import { newAccount, getUSDTWallet, createDepositWallet } from "./public/js/blockchain-utils";
import Dashboard from "./pages/dashboard/dashboard";
import About from "./pages/about/about";
import AccountManagerPanel from "./pages/accountManagerPanel/accountManagerPanel";
import Exchange from "./pages/exchange/exchange";
import Details from "./pages/details/details";
import FootNavigation from "./pages/foot/footNavigation";
import LoginPage from "./pages/login/login";
import Wallet from "./pages/wallet/wallet";
import News from "./pages/news/news";
import RegisterPage from "./pages/register/register";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0d47a1",
    },
    secondary: {
      main: "#0288d1",
    },
    type: "dark",
  },
  overrides: {
    MuiFormLabel: {
      root: {
        "&$focused": {
          // increase the specificity for the pseudo class
          color: "white",
        },
      },
    },
  },
});

function App(props) {

  (() => {
    if(localStorage.getItem("lang") != null) {
      config.lang = localStorage.getItem("lang")
    }
  })();

  const [
    accountCreatedSnackbarOpen,
    setAccountCreatedSnackbarOpen,
  ] = React.useState(false);
  const [
    accountNotCreatedSnackbarOpen,
    setAccountNotCreatedSnackbarOpen,

  ] = React.useState(false);
  const [
    wrongPrivateKeyFormat,
    setWrongPrivateKeyFormat,

  ] = React.useState(false);
  const [
    wrongMobileWarning,
    setWrongMobileWarningSnackbarOpen,
  ] = React.useState(false);

  const [cannotLoginSnackbarOpen, setCannotLoginSnackbarOpen] = React.useState(
    false,
  );
  const [currentUsername, setCurrentUsername] = React.useState("");

  const [account, setAccount] = React.useState({});

  const [prefillUsername, setPrefillUsername] = React.useState("");

  const handleLogout = () => {
    setAccount({});
    setCookie('acctobj', {}, { path: '/' });
    setCurrentUsername('');
    setCookie('username', '', { path: '/' });
    props.history.push("/login-account");
  };

  const handleChangeAccount = name => {
    handleLogout();
    setPrefillUsername(name);
  };

  const handleAccountCreatedSnackbarClose = () => {
    setAccountCreatedSnackbarOpen(false);
  };

  const handleWrongMobileWarningClose = () => {
    setWrongMobileWarningSnackbarOpen(false);
  }
  const popMobileWarning = () => {
    setWrongMobileWarningSnackbarOpen(true);
  };


  const handleAccountNotCreatedSnackbarClose = () => {
    setAccountNotCreatedSnackbarOpen(false);
  };
  const handleCannotLoginSnackbarClose = () => {
    setCannotLoginSnackbarOpen(false);
  };

  const onRegister = async (regionCode, mobile, accessCode, pvKey) => {
    try {
      await newAccount(regionCode, mobile, accessCode, pvKey);
      setAccountCreatedSnackbarOpen(true);

      props.history.push("/login-account");
    } catch (err) {
      console.log(err);
      err.toString().includes("Wrong Private Key Format") ? setWrongPrivateKeyFormat(true) : setAccountNotCreatedSnackbarOpen(true);
    }
  };

  const [cookies, setCookie] = useCookies(['pfa']);


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
      setCannotLoginSnackbarOpen(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Switch>
          <Route path={"/create-account"}
            render={() => (
              <RegisterPage 
                onRegister={onRegister} 
                popMobileWarning={popMobileWarning} />
            )}
          />
          <Route path={"/app"}
            render={() => (
              <div>
                <Dashboard
                  account={account}
                  currentUsername={currentUsername}
                />
                <FootNavigation {...props}/>
              </div>
            )}
          />
          <Route path={"/about"}
            render={() => (
              <div>
                <About
                  props={props} account={account}
                  currentUsername={currentUsername} handleLogout={handleLogout}/>
                <FootNavigation {...props} />
              </div>
            )}
          />
          <Route path={"/details"}
            render={() => (
              <div>
                <Details props={props} account={account}
                         currentUsername={currentUsername} handleLogout={handleLogout}/>
                <FootNavigation {...props} />
              </div>
            )}
          />
          <Route path={"/wallet"}
            render={() => (
              <div>
                <Wallet account={account} currentUsername={currentUsername} props={props} />
                <FootNavigation {...props} />
              </div>
            )}
          />
          <Route path={"/exchange"}
            render={() => (
              <div>
                <Exchange
                  account={account}
                  currentUsername={currentUsername}
                  handleLogout={handleLogout}
                  handleChangeAccount={handleChangeAccount}
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
          <Route path={"/account-manager"} component={AccountManagerPanel} />
          <Route
            render={() => (
              <LoginPage
                onLogin={onLogin}
                prefillUsername={prefillUsername}
              />
            )}
          />


        </Switch>
        <Snackbar
          open={accountCreatedSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleAccountCreatedSnackbarClose}
          message={trans.accountCreatedInfo[config.lang]}
        />
        <Snackbar
          open={accountNotCreatedSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleAccountNotCreatedSnackbarClose}
          message={trans.accountNotCreatedInfo[config.lang]}
        />
        <Snackbar
          open={wrongPrivateKeyFormat}
          autoHideDuration={6000}
          onClose={handleAccountNotCreatedSnackbarClose}
          message={trans.wrongPrivateKeyFormat[config.lang]}
        />
        <Snackbar
          open={cannotLoginSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleCannotLoginSnackbarClose}
          message={trans.cannotLoginWarning[config.lang]}
        />
        <Snackbar
          open={wrongMobileWarning}
          autoHideDuration={6000}
          onClose={handleWrongMobileWarningClose}
          message={trans.mobileWarning[config.lang]}
        />
      </React.Fragment>
    </ThemeProvider>
  );
}

export default withRouter(App);
