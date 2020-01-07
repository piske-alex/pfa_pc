import { makeStyles } from '@material-ui/core/styles';

const registerStyles = makeStyles(theme => ({
    headBlock: {
      height: '240px',
      width: '100%',
      backgroundColor: '#212733',
    },
    head: {
      width: '100%',
      paddingTop: '40px',
      fontSize: '16px',
      textAlign: 'Center',
      letterSpacing: '1px',
      color: '#fff'
    },
    // headIcons: {
    //   position: 'fixed',
    //   top: '18px',
    //   marginLeft: '16px'
    // },
    icon: {
      width: '100%',
      height: '74px',
      textAlign: 'Center',
      paddingTop: '20px',
    },
    introduce: {
      height: '60px',
      textAlign: 'Center',
      paddingTop: '30px',
      fontSize: '14px',
      color: '#fff',
      letterSpacing: '1px',
    },
    content: {
      width: '100%',
      height: '50px',
      lineHeight: '50px',
      marginTop: '10px',
      fontSize: '14px',
      backgroundColor: '#212733',
      letterSpacing: '1px',
    },
    contentIconsLeft: {
      float: 'left',
      marginTop: '7px',
      marginLeft: '16px'
    },
    contentIconsRight: {
      float: 'right',
      marginTop: '7px',
      marginRight: '10px'
    },
    title: {
      float: 'left',
      marginLeft: '12px',
      color: '#fff',
      width: '50%'
    },
    modalPaper: {
      // position: 'absolute',
      // width: '96%',
      // height: '60%',
      // top: 'calc(50% - 500px / 2)',
      // left: 'calc(50% - 360px / 2)',
      backgroundColor: '#212733',
      boxShadow: theme.shadows[5],
      padding: '14px',
      outline: 'none',
  
      // width: '94%',
      height: '60%',
      // background: url(box_bg.png) no-repeat;
      // background-size: cover;
      position: 'fixed',
      top: '50%',
      left: '50%',
  
      transform: 'translate(-50%, -50%)',
      zIndex: 200,
  
    },
    toolbarIcon: {
      // display: 'flex',
      // alignItems: 'center',
      // justifyContent: 'flex-end',
      padding: '0 2px',
      textAlign: 'Center',
      marginTop: '14px',
      ...theme.mixins.toolbar,
    },
    close: {
      position: 'absolute',
      right: '10px',
      top: '18px',
    },
    logOut:{
      textAlign:'Center',
      position: 'absolute',
      bottom: '10%',
      maxWidth:'1100px',
      width: '100%'
    }
  }));

export default registerStyles;