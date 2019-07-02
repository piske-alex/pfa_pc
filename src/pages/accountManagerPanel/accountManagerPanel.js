import React from "react";
import { importAccounts, exportAccounts } from "../../public/js/blockchain-utils";
import { HorizontalCenter, VerticalCenter } from "../../public/js/utils";
import { Grid, Snackbar } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import trans from "../../public/js/translation";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";

const lang = "ch";

function AccountManagerPanel({ history }) {
  const [importData, setImportData] = React.useState("");

  const [
    importSuccessSnackbarOpen,
    setImportSuccessSnackbarOpen,
  ] = React.useState(false);
  const [
    importFailedSnackbarOpen,
    setImportFailedSnackbarOpen,
  ] = React.useState(false);

  const handleImport = () => {
    try {
      importAccounts(importData);
      setImportSuccessSnackbarOpen(true);
      // history.goBack();
    } catch (e) {
      console.log(e);
      setImportFailedSnackbarOpen(true);
    }
  };

  return (
    <React.Fragment>
      <VerticalCenter gridStyle={{ minHeight: "80vh" }}>
        <HorizontalCenter>
          <Grid container alignItems={"center"} direction={"column"} spacing={2}>
            <Grid item>
              <Typography disabled variant={"body2"} className="textInfo" style={{ width: 300 , textAlign: "justify"}}>
                {trans.exportInstructionInfo1[lang]}
              </Typography>
            </Grid>

            <Grid item>
              <Typography disabled variant={"body2"} className="textInfo" style={{ width: 300 , textAlign: "justify"}}>
                {trans.exportInstructionInfo2[lang]}
              </Typography>
            </Grid>

            <Grid item>
              <TextField
                style={{ width: 300 }}
                disabled
                variant={"outlined"}
                value={exportAccounts()}
                multiline
                rowsMax={4}
                label={trans.copyHere[lang]}
              />
            </Grid>

            <Grid item>
              <TextField
                style={{ width: 300 }}
                variant={"outlined"}
                value={importData}
                onChange={event => {
                  setImportData(event.target.value);
                }}
                multiline
                rowsMax={4}
                label={trans.pasteHere[lang]}
              />
            </Grid>

            <Grid item>
              <Grid container alignItems={"center"} direction={"row"} spacing={2}>
                <Grid item>
                  <Button
                    className="CommonButtonStyle"
                    variant="contained"
                    color="primary"
                    onClick={handleImport}
                    style={{ width: "142px" }}
                  >
                    {trans.import[lang]}
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    className="CommonButtonStyle"
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={"/login-account"}
                    style={{ width: "142px" }}
                  >
                    {trans.back[lang]}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </HorizontalCenter>
      </VerticalCenter>
      <Snackbar
        open={importSuccessSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setImportSuccessSnackbarOpen(false)}
        message={trans.importSuccessInfo[lang]}
      />
      <Snackbar
        open={importFailedSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setImportFailedSnackbarOpen(false)}
        message={trans.importFailedWarning[lang]}
      />
    </React.Fragment>
  );
}

export default withRouter(AccountManagerPanel);