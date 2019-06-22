import React from "react";
import { Route } from "react-router-dom";
import CreateAccountPage from "./createAccountPage";
import Dashboard from "./dashboard";
import { Snackbar } from "@material-ui/core";
import HistoryPage from "./historyPage"
import trans from "./translation";
import { newAccount, readAccount } from "./blockchain-utils";
import { withRouter, Switch } from "react-router-dom";
import LoginAccountPage from "./loginAccountPage";
import AccountManagerPanel from "./accountManagerPanel";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { ThemeProvider } from "@material-ui/styles";
import useCookies from "react-cookie/cjs/useCookies";
import ConvertPage from "./convertPage";

const lang = "ch";

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
              <Dashboard
                account={account}
                currentUsername={currentUsername}
                handleLogout={handleLogout}
                handleChangeAccount={handleChangeAccount}
              />
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
                   <ConvertPage
                     account={account}
                     currentUsername={currentUsername}
                     handleLogout={handleLogout}
                     handleChangeAccount={handleChangeAccount}
                   />
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
          message={trans.accountCreatedInfo[lang]}
        />
        <Snackbar
          open={accountNotCreatedSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleAccountNotCreatedSnackbarClose}
          message={trans.accountNotCreatedInfo[lang]}
        />
        <Snackbar
          open={wrongPrivateKeyFormat}
          autoHideDuration={6000}
          onClose={handleAccountNotCreatedSnackbarClose}
          message={trans.wrongPrivateKeyFormat[lang]}
        />
        <Snackbar
          open={cannotLoginSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleCannotLoginSnackbarClose}
          message={trans.cannotLoginWarning[lang]}
        />
      </React.Fragment>
    </ThemeProvider>
  );
}

export default withRouter(App);
