import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Grid, Snackbar, TextField, Typography } from "@material-ui/core";
import { importAccounts, exportAccounts } from "../../public/js/blockchain-utils";
import { HorizontalCenter, VerticalCenter } from "../../public/js/utils";
import trans from "../../public/js/translation";
import config from "../../public/js/config";

function Account({ history, prefillUsername, onAccountChange }) {
  const [importData, setImportData]           = React.useState("");
  const [importSuccSB, setImportSuccSB]       = React.useState(false);    // import success snackbar state
  const [importFailedSB, setImportFailedSB]   = React.useState(false);    // import failed snackbar state

  /* import success snackbar handle */
  const importSuccSBOpen = () => setImportSuccSB(true);
  const importSuccSBClose = () => setImportSuccSB(false);

  /* import failed snackbar handle */
  const importFailedSBOpen = () => setImportFailedSB(true);
  const importFailedSBClose = () => setImportFailedSB(false);

  const _import = () => {
    try {
      importAccounts(importData);
      importSuccSBOpen();
      // history.goBack();
    } catch (e) {
      console.log(e);
      importFailedSBOpen();
    }
  };

  return (
    <React.Fragment>
      <VerticalCenter gridStyle={{ minHeight: "80vh" }}>
        <HorizontalCenter>
          <Grid container alignItems={"center"} direction={"column"} spacing={2}>
            <Grid item>
              <Typography disabled variant={"body2"} className="textInfo" style={{ width: 300 , textAlign: "justify"}}>
                {trans.exportInstructionInfo1[config.lang]}
              </Typography>
            </Grid>

            <Grid item>
              <Typography disabled variant={"body2"} className="textInfo" style={{ width: 300 , textAlign: "justify"}}>
                {trans.exportInstructionInfo2[config.lang]}
              </Typography>
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
                label={trans.pasteHere[config.lang]}
              />
            </Grid>

            <Grid item>
              <Grid container alignItems={"center"} direction={"row"} spacing={2}>
                <Grid item>
                  <Button
                    className="CommonButtonStyle"
                    variant="contained"
                    color="primary"
                    onClick={_import}
                    style={{ width: "142px" }}
                  >
                    {trans.import[config.lang]}
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
                    {trans.back[config.lang]}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </HorizontalCenter>
      </VerticalCenter>

      <Snackbar
        open={importSuccSB}
        autoHideDuration={6000}
        onClose={importSuccSBClose}
        message={trans.importSuccessInfo[config.lang]}
      />

      <Snackbar
        open={importFailedSB}
        autoHideDuration={6000}
        onClose={importFailedSBClose}
        message={trans.importFailedWarning[config.lang]}
      />
    </React.Fragment>
  );
}

export default withRouter(Account);
