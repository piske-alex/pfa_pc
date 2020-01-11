import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 300;
const detailsStyles = makeStyles(theme => ({
    root: {
      display: "flex",
    },
    container1: {
      fontSize: '10pt',
      color: '#C0C0C0',
    },
  
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      padding: "0 2px",
      textAlign: "Center",
      marginTop: "14px",
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: "none",
    },
    title: {
      flexGrow: 1,
    },
    head: {
      width: "100%",
      paddingTop: "32px",
      fontSize: '16pX',
      textAlign: "Center",
      letterSpacing: "1px",
      color: "#fff"
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      // height: "100vh",
      overflow: "auto",
  
    },
  
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
    },
    fixedHeight: {
      height: 240,
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
      zIndex: 200,
    },
    close: {
      position: "absolute",
      right: "10px",
      top: "10px",
    },
    extractRow: {
      width: '100%',
      textAlign: 'center',
    },
    detailsTop: {
      position: 'fixed',
      width: '100%',
      top: 0,
      left: 0,
      backgroundColor: '#212733',
    }
  }));

export default detailsStyles;