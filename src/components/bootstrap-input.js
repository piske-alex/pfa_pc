import { InputBase } from "@material-ui/core";
import { fade, withStyles } from '@material-ui/core/styles';

const BootstrapInput = withStyles(theme => ({
    root: {
        'label + &': {
        marginTop: theme.spacing(2.5),
        },
        width:'100%',
        backgroundColor: '#222834',
        border: '1px solid #222834',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus-within': {
            boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: '#BEB689',
        },
    },
    input: {
        width:'100%',
        padding: '5.5px 5.5px',
        fontSize: 16,
        color:'#FFB601',
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
        ].join(',')
    },
}))(InputBase);

export default BootstrapInput;