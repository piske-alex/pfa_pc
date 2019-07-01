import React from "react";
import { withRouter, Switch, Route} from "react-router-dom";
import { Snackbar } from "@material-ui/core";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { ThemeProvider } from "@material-ui/styles";
import CreateAccountPage from "./pages/createAccountPage/createAccountPage";
import Dashboard from "./pages/dashboard/dashboard";
import HistoryPage from "./historyPage"
import trans from "./public/js/translation";
import { newAccount, readAccount } from "./public/js/blockchain-utils";
import LoginAccountPage from "./pages/loginAccountPage/loginAccountPage";
import AccountManagerPanel from "./pages/accountManagerPanel/accountManagerPanel";
import useCookies from "react-cookie/cjs/useCookies";
import ConvertPage from "./pages/convertPage/convertPage";
import FootNavigation from "./pages/foot/footNavigation";
import AboutUs from "./pages/aboutUs/aboutUs";
import MyWallet from "./pages/myWallet/myWallet";
import Config from "./public/js/config";

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

  const [cannotLoginSnackbarOpen, setCannotLoginSnackbarOpen] = React.useState(
    false,
  );
  const [currentUsername, setCurrentUsername] = React.useState("");

  const [account, setAccount] = React.useState({});

  const [prefillUsername, setPrefillUsername] = React.useState("");

  const handleLogout = () => {
    setAccount({});
    props.history.push("/login-account");
  };

  const handleChangeAccount = name => {
    handleLogout();
    setPrefillUsername(name);
  };

  const handleAccountCreatedSnackbarClose = () => {
    setAccountCreatedSnackbarOpen(false);
  };


  const handleAccountNotCreatedSnackbarClose = () => {
    setAccountNotCreatedSnackbarOpen(false);
  };
  const handleCannotLoginSnackbarClose = () => {
    setCannotLoginSnackbarOpen(false);
  };

  const onAccountCreate = async (username, password, pvKey) => {
    try {
      await newAccount(username, password, pvKey);
      setAccountCreatedSnackbarOpen(true);
      props.history.push("/login-account");
    } catch (err) {
      console.log(err);
      err.toString().includes("Wrong Private Key Format") ? setWrongPrivateKeyFormat(true) : setAccountNotCreatedSnackbarOpen(true);

    }
  };

  const [cookies, setCookie] = useCookies(['pfa']);


  const onAccountLogin = (username, password) => {
    try {
      let accountObj = readAccount(username, password);
      setAccount(accountObj);
      setCookie('acctobj', accountObj, { path: '/' });
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
          <Route
            path={"/create-account"}
            render={() => (
              <CreateAccountPage onAccountCreate={onAccountCreate} />
            )}
          />
          <Route
            path={"/app"}
            render={() => (
              <div>
                <Dashboard
                  account={account}
                  currentUsername={currentUsername}
                  handleLogout={handleLogout}
                  handleChangeAccount={handleChangeAccount}
                />
                <FootNavigation {...props}/>
              </div>
            )}
          />
          <Route
            path={"/aboutus"}
            render={() => (
              <div>
                <AboutUs props={props} account={account}
                         currentUsername={currentUsername} handleLogout={handleLogout}/>
                <FootNavigation {...props} />
              </div>
            )}
          />
            <Route
            path={"/myWallet"}
            render={() => (
              <div>
                <MyWallet props={props} />
                <FootNavigation {...props} />
              </div>
            )}
          />
          <Route path={"/history-page"}
            render={() => (
              <HistoryPage
                account={account}
                currentUsername={currentUsername}
                handleLogout={handleLogout}
                handleChangeAccount={handleChangeAccount}
              />
            )}
          />
          <Route path={"/convert-page"}
            render={() => (
              <div>
                <ConvertPage
                  account={account}
                  currentUsername={currentUsername}
                  handleLogout={handleLogout}
                  handleChangeAccount={handleChangeAccount}
                />
                <FootNavigation {...props} />
              </div>
            )}
          />
          <Route path={"/account-manager"} component={AccountManagerPanel} />
          <Route
            render={() => (
              <LoginAccountPage
                onAccountLogin={onAccountLogin}
                prefillUsername={prefillUsername}
              />
            )}
          />


        </Switch>
        <Snackbar
          open={accountCreatedSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleAccountCreatedSnackbarClose}
          message={trans.accountCreatedInfo[Config.lang]}
        />
        <Snackbar
          open={accountNotCreatedSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleAccountNotCreatedSnackbarClose}
          message={trans.accountNotCreatedInfo[Config.lang]}
        />
        <Snackbar
          open={wrongPrivateKeyFormat}
          autoHideDuration={6000}
          onClose={handleAccountNotCreatedSnackbarClose}
          message={trans.wrongPrivateKeyFormat[Config.lang]}
        />
        <Snackbar
          open={cannotLoginSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleCannotLoginSnackbarClose}
          message={trans.cannotLoginWarning[Config.lang]}
        />
      </React.Fragment>
    </ThemeProvider>
  );
}

export default withRouter(App);
