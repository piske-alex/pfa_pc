import React from "react";
import { getIcon } from "../../public/js/utils";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import trans from "../../public/js/translation";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";

const lang = "ch";

const useStyles = makeStyles(theme => ({
  headBlock: {
    height: "240px",
    width: "100%",
    backgroundColor: "#212733",
  },
  head: {
    width: "100%",
    paddingTop: "40px",
    fontSize: '16px',
    textAlign: "Center",
    letterSpacing: "1px",
    color: "#fff"
  },
  // headIcons: {
  //   position: "fixed",
  //   top: "18px",
  //   marginLeft: "16px"
  // },
  icon: {
    width: "100%",
    height: "74px",
    textAlign: "Center",
    paddingTop: "20px",
  },
  introduce: {
    height: "60px",
    textAlign: "Center",
    paddingTop: "30px",
    fontSize: "14px",
    color: "#fff",
    letterSpacing: "1px",
  },
  content: {
    width: "100%",
    height: "50px",
    lineHeight: "50px",
    marginTop: "10px",
    fontSize: '14px',
    backgroundColor: "#212733",
    letterSpacing: "1px",
  },
  contentIconsLeft: {
    float: "left",
    marginTop: "7px",
    marginLeft: "16px"
  },
  contentIconsRight: {
    float: "right",
    marginTop: "7px",
    marginRight: "10px"
  },
  title: {
    float: "left",
    marginLeft: "12px",
    color: "#fff",
    width: "50%"
  },
  modalPaper: {
    // position: "absolute",
    // width: "96%",
    // height: "60%",
    // top: "calc(50% - 500px / 2)",
    // left: "calc(50% - 360px / 2)",
    backgroundColor: "#212733",
    boxShadow: theme.shadows[5],
    padding: "14px",
    outline: "none",

    width: "94%",
    height: "60%",
    // background: url(box_bg.png) no-repeat;
    // background-size: cover;
    position: "fixed",
    top: "50%",
    left: "50%",

    transform: "translate(-50%, -50%)",
    zIndex: 200,

  },
  toolbarIcon: {
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "flex-end",
    padding: "0 2px",
    textAlign: "Center",
    marginTop: "14px",
    ...theme.mixins.toolbar,
  },
  close: {
    position: "absolute",
    right: "10px",
    top: "18px",
  },
  logOut:{
    textAlign:"Center",
    position: "absolute",
    bottom: "10%",
    maxWidth:"1100px",
    width: "100%"
  }
}));

function AboutUs({ history,handleLogout }) {
  const classes = useStyles();
  const [longText, setLongText] = React.useState("undefinede");
  const [modalTitle, setModalTitle] = React.useState("undefinede");
  const [tosModalOpen, settosModalOpen] = React.useState(false);
  const [footStyle, setFootStyle] = React.useState({});
  const [logOutStyle, setLogOutStyle] = React.useState({
    textAlign:"Center",
    position: "absolute",
    bottom: "10%",
    maxWidth:"1100px",
    width: "100%"
  });
  const handletosModalOpen = (x, y) => {
    setLongText(x);
    setModalTitle(y)
    settosModalOpen(true);
  };
  const handletosModalClose = () => {
    settosModalOpen(false);
  };
  const onSumbit = () => {
    handleLogout();
  };
  setTimeout(() => {
    let foot = document.getElementById("foot").offsetTop;
    let logOut = document.getElementById("logOut").offsetTop;
    if(logOut - foot < 50){
      setFootStyle({
        width:"100%",
        height:'50px',
      });
      setLogOutStyle({
        textAlign:"Center",
        position: "absolute",
        bottom: "",
        marginBottom:"70px",
        maxWidth:"1100px",
        width: "100%"
      });
    }
  }, 100);
  return (
    <React.Fragment>

      <CssBaseline />
      <Grid style={{ maxWidth: "1100px", margin: "0 auto", backgroundColor: "#000!important", height: "auto" }}>
        <Grid className={classes.headBlock}>
          <Grid className={classes.head} >
            {/* <Grid className={classes.headIcons}><i style={{ widows: "100%", height: "100%" }} class="material-icons">keyboard_backspace</i></Grid> */}
            {trans.aboutus[lang]}
          </Grid>

          <Grid className={classes.icon}>
            <img style={{ width: 60, height: 60 }} src={getIcon()} />
          </Grid>
          <Grid className={classes.introduce}>我們希望讓大家更了解鏈改後的PFA區塊鏈</Grid>
        </Grid>

        <Grid >
          <Grid className={classes.content} onClick={() => handletosModalOpen(trans.aboutusfull[lang], trans.aboutus[lang])}>
            <Grid className={classes.contentIconsLeft}>
              <i class="material-icons">group</i>
            </Grid>
            <Grid className={classes.title}>{trans.aboutus[lang]}</Grid>
            <Grid className={classes.contentIconsRight}>
              <i class="material-icons">keyboard_arrow_right</i>
            </Grid>
          </Grid>

          <Grid className={classes.content} onClick={() => handletosModalOpen(trans.privacyfull[lang], trans.privacy[lang])}>
            <Grid className={classes.contentIconsLeft}>
              <i class="material-icons">assignment_ind</i>
            </Grid>
            <Grid className={classes.title}>{trans.privacy[lang]}</Grid>
            <Grid className={classes.contentIconsRight}>
              <i class="material-icons">keyboard_arrow_right</i>
            </Grid>
          </Grid>

          <Grid className={classes.content} onClick={() => handletosModalOpen(trans.tosfull[lang], trans.tos[lang])}>
            <Grid className={classes.contentIconsLeft}>
              <i class="material-icons">description</i>
            </Grid>
            <Grid className={classes.title}>{trans.tos[lang]}</Grid>
            <Grid className={classes.contentIconsRight}>
              <i class="material-icons">keyboard_arrow_right</i>
            </Grid>
          </Grid>
          <Grid id="foot" style={footStyle}/>

          {/* <Grid className={classes.logOut} id="logOut"> */}
          <Grid id="logOut" style={logOutStyle}>
            <Button
              className="CommonButtonStyle"
              variant="contained"
              color="primary"
              onClick={onSumbit}
              style={{ width: "70%",letterSpacing: "1px", }}
            >
              {trans.logOut[lang]}
            </Button>
          </Grid>
        </Grid>
        {/* <VerticalCenter gridStyle={{ minHeight: "80vh" }}>
        <HorizontalCenter>
        </HorizontalCenter>
      </VerticalCenter> */}
        <Grid style={{ margin: "0 auto" }}>
          <Modal open={tosModalOpen} style={{ height: "100%" }} onBackdropClick={handletosModalClose}>
            <div className={classes.modalPaper}>
              <Grid style={{ height: "100%" }} container direction={"column"}>
                <Grid item style={{ maxHeight: "14%", width: "100%" }}>
                  <div className={classes.toolbarIcon}>
                    <Typography variant={"h5"} style={{}}>{`${modalTitle}`}</Typography>
                    <IconButton className={classes.close} onClick={handletosModalClose}>
                      <CloseIcon />
                    </IconButton>
                  </div>
                </Grid>
                <Grid item style={{ overflow: "auto", maxHeight: "84%", width: "100%", padding: "6px" }}>
                  <Typography variant={"p"} style={{ marginRight: "150px", textAlign: "justify", width: "100%", wordBreak: "break-all" }} dangerouslySetInnerHTML={{ __html: longText }} />

                </Grid>
              </Grid>
            </div>
          </Modal>
        </Grid>
        <Grid className="pageFoot" />
      </Grid>
    </React.Fragment>
  );
}

export default withRouter(AboutUs);
