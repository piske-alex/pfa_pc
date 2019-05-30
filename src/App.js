import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateAccountPage from "./createAccountPage";
import Dashboard from "./dashboard";
import { Snackbar } from "@material-ui/core";
import trans from "./translation";
import { newAccount, readAccount } from "./blockchain-utils";
import { withRouter } from "react-router-dom";
import LoginAccountPage from "./loginAccountPage";
const lang = "ch";

function App(props) {
  const [
    accountCreatedSnackbarOpen,
    setaccountCreatedSnackbarOpen
  ] = React.useState(false);
  const [
    accountNotCreatedSnackbarOpen,
    setaccountNotCreatedSnackbarOpen
  ] = React.useState(false);

  const [account, setAccount] = React.useState({});

  const handleAccountCreatedSnackbarClose = () => {
    setaccountCreatedSnackbarOpen(false);
  };
  const handleAccountNotCreatedSnackbarClose = () => {
    setaccountNotCreatedSnackbarOpen(false);
  };

  const onAccountCreate = (username, password) => {
    try {
      newAccount(username, password);
      setaccountCreatedSnackbarOpen(true);
      props.history.push("/login-account");
    } catch (err) {
      console.log(err);
      setaccountNotCreatedSnackbarOpen(true);
    }
  };

  const onAccountLogin = (username, password) => {
    try {
      let accountObj = readAccount(username, password);
      setAccount(accountObj);
      props.history.push("/app");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <Route
        path={"/create-account"}
        render={() => <CreateAccountPage onAccountCreate={onAccountCreate} />}
      />
      <Route path={"/app"} component={Dashboard} />
      <Route
        path={"/login-account"}
        render={() => <LoginAccountPage onAccountLogin={onAccountLogin} />}
      />
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
    </React.Fragment>
  );
}

export default withRouter(App);
