import { makeStyles } from '@material-ui/core/styles';

const aboutUsStyles = makeStyles(theme => ({
    headBlock: {
      backgroundColor: "#212733"
    },
    head: {
      width: "100%",
      paddingTop: "40px",
      fontSize: "16px",
      textAlign: "Center",
      letterSpacing: "1px",
      color: "#fff"
    },
    icon: {
      width: "100%",
      height: "74px",
      textAlign: "Center",
      paddingTop: "20px"
    },
    introduce: {
      height: "60px",
      textAlign: "Center",
      paddingTop: "30px",
      fontSize: "14px",
      color: "#fff",
      letterSpacing: "1px"
    },
    content: {
      width: "100%",
      height: "50px",
      lineHeight: "50px",
      marginTop: "10px",
      fontSize: "14px",
      backgroundColor: "#212733",
      letterSpacing: "1px"
    },
    contentIconsLeft: {
      float: "left",
      paddingTop: "7px",
      marginLeft: "16px",
      height: "50px"
    },
    contentIconsRight: {
      float: "right",
      paddingTop: "7px",
      marginRight: "10px",
      height: "50px"
    },
    title: {
      float: "left",
      marginLeft: "12px",
      color: "#fff",
      width: "50%"
    },
    modalPaper: {
      backgroundColor: "#212733",
      boxShadow: theme.shadows[5],
      padding: "14px",
      outline: "none",
      height: "60%",
      position: "fixed",
      top: "50%",
      left: "50%",
  
      transform: "translate(-50%, -50%)",
      zIndex: 200
  
    },
    toolbarIcon: {
      padding: "0 2px",
      textAlign: "Center",
      marginTop: "14px",
      ...theme.mixins.toolbar
    },
    close: {
      position: "absolute",
      right: "10px",
      top: "18px"
    },
    logOut: {
      textAlign: "Center",
      position: "absolute",
      bottom: "10%",
      maxWidth: "1100px",
      width: "100%"
    },
    userName: {
      fontSize: "16px",
      fontWeight: "400",
      lineHeight: "1.33",
      letterSpacing: "1px"
    },
    addressField: {
      width: '280px',
      backgroundColor: '#000'
    }
}));

export default aboutUsStyles;