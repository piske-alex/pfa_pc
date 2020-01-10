import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 300;
const exchangeStyles = makeStyles(theme => ({
    root: {
        display: "flex",
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 2px",
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
    content: {
        flexGrow: 1,
        height: "100vh",
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
        position: "absolute",
        width: 360,
        height: 500,
        top: "calc(50% - 500px / 2)",
        left: "calc(50% - 360px / 2)",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1),
        outline: "none",
    },

    /**mobile start*/
    topMarginHeight: {
        minHeight:"8vh",
    },
    fLeft:{
        float:'left',
        margin:"0 8px",
    },
    fRight:{
        float:'right'
    },
    bottombuttonStyle:{
        width:"100%",
        backgroundColor:"#13161b!important",
        color:"#FFB601!important",
        border:"1px solid #BEB689!important"
    },
    inputSize:{
        width:120,
        marginTop:2,
        float: "right",
    },
    itemHeight:{
        height:50,
        marginTop:10,
    },
    selectZiFontSize:{
        width: 50,
        fontSize:16,
        lineHeight: 0.8,
        textAlign: "left",
    },
    selectPadRight:{
        paddingRight:0,
    },
    bottomButtonMargin:{
        height: 40,
        marginTop:30,
    },
    linkImgLeft:{
        width:35,
        height:35,
        float:'left',
        borderRadius:50,
    },
    linkImgContrary:{
        width:30,
        height:30,
    },
    notesFontSize:{
        fontSize: 12,
        lineHeight: "12px",
        fontFamily: "FZZhongDengXian-Z07S",
    },
    /**mobile end*/
    /**iPad start*/
    topMarginHeightIPad: {
        minHeight:110,
    },
    itemHeightIpad:{
        height:50,
        marginTop:30,
    },
    inputSizeIpad:{
        width:160,
        marginTop:3,
        float: "right",
    },
    linkImgContraryIpad:{
        width:30,
        height:30,
    },
    bottomButtonMarginIpad:{
        height: 40,
        marginTop:60,
    },
    /**iPad end*/
    /**PC start*/

    /**PC end*/
}));

export default exchangeStyles;