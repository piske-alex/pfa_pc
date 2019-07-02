import React from "react";
import { Grid } from "@material-ui/core";
import { HorizontalCenter, VerticalCenter } from "../../public/js/utils";
import trans from "../../public/js/translation";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from "@material-ui/core/IconButton";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
const lang = "ch";

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(2.5),
    },
  },
  input: {
    position: 'relative',
    width:'100%',
    backgroundColor: '#222834',
    border: '1px solid #222834',
    fontSize: 16,
    padding: '5.5px 5.5px',
    color:'#FFB601',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: '#BEB689',
    },
  },
}))(InputBase);

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

export default function CreateAccountPage({ onAccountCreate }) {
  const classes = useStyles();
  const [username, setUsername] = React.useState("");
  const onUsernameChange = event => {
    setUsername(event.target.value);
  };
  const [password, setPassword] = React.useState("");
  const onPasswordChange = event => {
    setPassword(event.target.value);
  };
  const [passwordAgain, setPasswordAgain] = React.useState("");
  const onPasswordAgainChange = event => {
    setPasswordAgain(event.target.value);
  };

  //const [sendAmount, setSendAmount] = React.useState("");
  const [existingPvKey, setExistingPvKey] = React.useState("");
  const onExistingPvKeyChange = event => {
    setExistingPvKey(event.target.value);
  };

  const [tosModalOpen, settosModalOpen] = React.useState(false);
  const handletosModalOpen = () => {

    settosModalOpen(true);
  };
  const handletosModalClose = () => {
    onSumbit()
    settosModalOpen(false);
  };

  const onSumbit = () => {
    onAccountCreate(username, password, existingPvKey);
  };

  return (
    <VerticalCenter gridStyle={{ minHeight: "80vh" }}>
      <HorizontalCenter>
        <Grid container alignItems={"center"} direction={"column"} spacing={2}>
          <Grid item>
            <FormControl style={{ width: 300 }}>
              <InputLabel shrink className="inputLabel">{trans.username[lang]}</InputLabel>
              <BootstrapInput value={username} onChange={onUsernameChange} />
              <FormHelperText className="formHelperText">{username.length > 0? undefined: trans.usernameEmptyWarning[lang]}</FormHelperText>
            </FormControl>

          </Grid>
          <Grid item>
            <FormControl style={{ width: 300 }}>
              <InputLabel shrink className="inputLabel">{trans.password[lang]}</InputLabel>
              <BootstrapInput value={password} onChange={onPasswordChange} type='password'/>
              <FormHelperText className="formHelperText">{password.length >= 8? undefined: trans.passwordLengthWarning[lang]}</FormHelperText>
            </FormControl>

          </Grid>
          <Grid item>
            <FormControl style={{ width: 300 }}>
              <InputLabel shrink className="inputLabel">{trans.passwordAgain[lang]}</InputLabel>
              <BootstrapInput value={passwordAgain} onChange={onPasswordAgainChange} type='password'/>
              <FormHelperText className="formHelperText">{password === passwordAgain? undefined: trans.passwordAgainNotMatchWarning[lang]}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl style={{ width: 300 }}>
              <InputLabel shrink className="inputLabel">{trans.optionalExistingPrivateKey[lang]}</InputLabel>
              <BootstrapInput value={existingPvKey} onChange={onExistingPvKeyChange} type='password'/>
            </FormControl>
          </Grid>
          <Grid item>
            <Typography variant={"body2"} className="textInfo" style={{ width: 300 , textAlign: "justify" }}>
              {trans.accountCreationWarning1[lang]}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant={"body2"} className="textInfo" style={{ width: 300 , textAlign: "justify"}}>
              {trans.accountCreationWarning2[lang]}
            </Typography>
          </Grid>
          <Grid item>
            <Button className="CommonButtonStyle" style={{ width: 300 }} variant="contained" color="primary" onClick={handletosModalOpen}>
              {trans.register[lang]}
            </Button>
          </Grid>
        </Grid>

      </HorizontalCenter>
      <Modal open={tosModalOpen} style={{ height: "100%" }} onBackdropClick={handletosModalClose}>
        <div className={classes.modalPaper}>
          <Grid style={{ height: "100%" }} container direction={"column"}>
            <Grid item style={{ maxHeight: "14%", width: "100%" }}>
              <div className={classes.toolbarIcon}>
                <Typography variant={"h5"} style={{color:"white"}}>{`請謹記你的私鑰及密碼`}</Typography>
                <IconButton className={classes.close} onClick={handletosModalClose}>
                  <CloseIcon />
                </IconButton>
              </div>
            </Grid>
            <Grid item style={{ overflow: "auto", maxHeight: "84%", width: "100%", padding: "6px" }}>
              <Typography variant={"h7"} style={{ marginRight: "150px", textAlign: "justify", width: "100%", wordBreak: "break-all",color:"white" }} dangerouslySetInnerHTML={{ __html: "個人區塊鏈錢包生成後﹐密碼和私鑰不能再更改﹗\n" +
                  "我們沒有辦法為你重設帳戶﹗<br>\n" +
                  "必須備份您的私鑰，我們不能為您重設及找回﹗<br>\n" +
                  "這些事情我們是做不到的<br>\n" +
                  "\n" +
                  "<ul><li>為您操控這個錢包</li>\n" +
                  "<li>恢復/ 重設/ 更改錢包上的任何資訊</li>\n" +
                  "<li>取消或更改任何交易</li>\n" +
                  "<li>凍結您的錢包</li></ul><br>\n" +
                  "\n" +
                  "做任何交易前請再三核對資料<br><br>關閉此彈窗及繼續註冊即為同意。" }} />

            </Grid>
          </Grid>
        </div>
      </Modal>
    </VerticalCenter>

  );
}
