import React from "react";
import { Route } from "react-router-dom";
import CreateAccountPage from "./createAccountPage";
import Dashboard from "./dashboard";
import { Snackbar } from "@material-ui/core";
import trans from "./translation";
import { newAccount, readAccount } from "./blockchain-utils";
import { withRouter, Switch } from "react-router-dom";
import LoginAccountPage from "./loginAccountPage";

const lang = "ch";

function App(props) {
  const [
    accountCreatedSnackbarOpen,
    setAccountCreatedSnackbarOpen,
  ] = React.useState(false);
  const [
    accountNotCreatedSnackbarOpen,
    setAccountNotCreatedSnackbarOpen,
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

  const onAccountCreate = (username, password) => {
    try {
      newAccount(username, password);
      setAccountCreatedSnackbarOpen(true);
      props.history.push("/login-account");
    } catch (err) {
      console.log(err);
      setAccountNotCreatedSnackbarOpen(true);
    }
  };

  const onAccountLogin = (username, password) => {
    try {
      let accountObj = readAccount(username, password);
      setAccount(accountObj);
      setCurrentUsername(username);
      props.history.push("/app");
    } catch (err) {
      console.log(err);
      setCannotLoginSnackbarOpen(true);
    }
  };

  return (
    <React.Fragment>
      <Switch>
        <Route
          path={"/create-account"}
          render={() => <CreateAccountPage onAccountCreate={onAccountCreate} />}
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
        open={cannotLoginSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCannotLoginSnackbarClose}
        message={trans.cannotLoginWarning[lang]}
      />
    </React.Fragment>
  );
}

export default withRouter(App);
