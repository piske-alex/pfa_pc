import React from "react";
import { Grid } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Config from "./config";

export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function VerticalCenter(props) {
  return (
    <Grid
      container
      direction={"column"}
      alignItems={"center"}
      justify={"center"}
      spacing={props.spacing ? props.spacing : 0}
      style={props.gridStyle ? props.gridStyle : {}}
    >
      <Grid item>{props.children}</Grid>
    </Grid>
  );
}
export function HorizontalCenter(props) {
  return (
    <Grid
      container
      direction={"row"}
      alignItems={"center"}
      justify={"center"}
      spacing={props.spacing ? props.spacing : 0}
      style={props.gridStyle ? props.gridStyle : {}}
    >
      <Grid item>{props.children}</Grid>
    </Grid>
  );
}

export function getLogoUrl() {
  // if (!!window.cordova) {
  //   return "data:image/jpeg;base64,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\n";
  //   // return "file://android_asset/www/logo.jpg";
  // }
  // return "./logo.jpg";
  return "data:image/jpeg;base64,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\n";
}
export function getIcon() {
  // if (!!window.cordova) {
  //   return "data:image/jpeg;base64,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\n";
  //   // return "file://android_asset/www/logo.jpg";
  // }
  // return "./logo.jpg";
  return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURR0iLIc+S7ygix4gK0EqNcZPX+bCpH9uZR4gKlxSUB4gKyQlLvjQr2AzP5uGd/3UskdBQ6pHVvBaayIiLB4gKnFjXR8gKs6vlR8fKR4gKjY0OU0uOZB9cB4fKtRSY7tMW7CWgx4gKjMmMXQ4RcaokZ1DUu7IqUI9QFoxPXxsYygjLWpeWNm3nTEvNVJKSh0fKoh1aycoLzsoMx8gKh4gKh4gKttVZR4hKqqRgB8fLD45Ph4gKldOTWo1QvLLrMyslB4gKrSahsNOXTYnMWBVUrJJWCsrMh8hKpWBc3k6R+rFp49ATaWNfU8uOsGkjndnYMxQYR8fKORXZ3A3RE1GRyAgKaFFU9SzmR0gK+G9oR4hKx8fK4RyaOjDpR4gKpiDdh4gK0csN7ebiIx4bX07SB0hK5JBTjg0OmRYVR4iK7iciB4hK0pERVIvO5RBT65IV4FwZmU0QYw/TR8hKltRT926nk9ISR8gKslQXwAAAGYzzGYz/2ZmAGZmM2ZmZmZmmWZmzGZm/2aZAGaZM2aZZmaZmWaZzGaZ/2bMAGbMM2bMZmbMmWbMzGbM/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kAZpkAmZkAzJkA/5kzAJkzM5kzZpkzmZkzzJkz/5lmAJlmM5lmZplmmZlmzJlm/5mZAJmZM5mZZpmZmZmZzJmZ/5nMAJnMM5nMZpnMmZnMzJnM/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwAM8wAZswAmcwAzMwA/8wzAMwzM8wzZswzmcwzzMwz/8xmAMxmM8xmZsxmmcxmzMxm/8yZAMyZM8yZZsyZmcyZzMyZ/8zMAMzMM8zMZszMmczMzMzM/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8zAP8zM/8zZv8zmf8zzP8z//9mAP9mM/9mZv9mmf9mzP9m//+ZAP+ZM/+ZZv+Zmf+ZzP+Z///MAP/MM//MZv/Mmf/MzP/M////AP//M///Zv//mf//zP///4ci66YAAAB6dFJOUzX//7r/////9P+E////////////1P/+/0yX////YP///+T/////////////////Uf///5TL2/9Z/2z/pP/////q////////iv///////////zn///9T//9V/15y///A/6f/////Tf///z7/ZP////////92////aP8AZ0lxAwAAAAlwSFlzAAAOwwAADsMBx2+oZAAACMpJREFUeF7tnPtf1TYUwJ3CAPGxUTxMfKDgA1BQEdCpPARB8QVDh+icg/lAnSg6dd7/fuekp5f23twkvTd4j37y/QFP09LkS5s2SRO3Fb4Tgog0gog0gog0gog0gog0gog0gog0gog0gog0gog0gog0gog0gog0gkhllldGmsEjzSMry3xqA95Flkc4f6+MWFV8i1znnL1znTOohGeRLfOwmvgVWaYcW5s6xvd6ZHyiqZXO+ztnosevCNWPzgdcAI886MQTj3AmeryK0AVp3QIPNKFrcoGz0eJVZAVza+KsPdOHp17hbLR4FaE7qwNz3U53AjFIZRgsxmejJC03E/ibxnvLqwi9B6mer1HBCX8i4/ibzZyNFq8iVF7KNf7pFzo3Z6MliOgIIg4IFjk2MHCMQwcEi7QAtHDogFyRcXxZt7o3yuSKHKGjj/CGHTqas9FSP5FTdPQp3rBDR3M2WuomsmsWOi/B7C7etCJWZDtA3wbAXd60IlZkHiWOoQxvWhErMkC31QB08qYVqSLYLMeKvi9u9rsgVeSxevReBTjLCTakilyCCF+G+FI8yQk2hIo84ObJNYBPKsGKUJGDALfp39sAN1SCFaEibyD6kf79M3Lt+soUeQhwP44+Q3QzjizIFNkDcDCObvA9ZkWmyBUAHsc7DXAtjiyIFDkRwSUO8Tns1ikRKXIRYINDejNe5dCISJGXAMXeOjYc93FYgUH1XJMoMn4OBjhEVOvRRHJOeSJ/Zy4CNhzNnRK5Ilj01xwir20j+GJFdg3AudSDCm+0NQ71iBW5C/CSQwVWfePHIbEiTSUvc2w4PuVQi1iRtZLm1c0IfuJQi1SRjrJvPYMADznUIVXkKcDnsxnuA+zhnTqkipyko0q5wjt1CBX5RAeVYeqUCBXBDsjjEyVsAFzk3RqEimDNLhvKmih5s2SRKYKddM3gIr7rKzccZYrg22+ewxTzmdZXCTKb8S0A2zlMsd3aKZEmMt6q7X3smk33ULQIEzlS4SPVqVSfUY8wESyw9rMhChZ78XqEicxCdILDDOOpcZVSRFb2ptnHHJWwca5ibU/OKUqkGoJI9QQRI0GkeoSL5Ft9sJm1LzyJ5F19sJm1L/yI5J61n5ku64LxG6KaaksDkbVOl82/+mACcy1OYHbBKtJJ7f4aJzCr1QfR3NRimxNjePQWTim/zKXSYhah+jH9hYtp52c8XOQkf7og0QKX0oUh/AWJyy5o9cEcl9GJd/gL0No34T7n0oHxiT61EOY5l0qPUYTurCks38w0ncjAndijre0ZJ1RDZ9n4Q+ahUcvSJHoPUj23eWyK1GQyWzrcmH6M17RYjE5ApYt/ujFD9aRKSgeKOBkZMd9XiHcRfHaNDfWr3HMTlQxAqKpBCyqNz6uYLRBxg87N2cS0Y0Jn9uaaLT3GgByRbZSS/bzwbYoUdlJSZgiCPqX8xnttCBIpPKG0dBPnI24/4p02PIksLo01dEf906s9S47tMjo3Z1OEqgmkxos2cPM877PhRWS0J/WY6p9zUqFDOZtNJil1X3Fw+CpuHeVdNnyIzHTTgf0Ndw400Po8mO7iHSboQM4mhTL5mAxG0hITS8ukiAeRGSx9/1xjvNE1hluRgwmdm7NJc5TS16hTQ9DSjGHeY6F2kQW8rVZHeQP5gq/2/sO8URk6N2eTQfWsI55D20EbbtW9dhHsTTVkasUiNs3ucVwZOjdnk0U9u+BNfFFeYmjs4RapWeQw3kolXa8u/JOmLlEpd1QTk87N2ZSg3icQzdPE4IdUS57wDiM1ixwH6OWwyAGA4xxqSM5ZSaTwXFV5aJ0/vXfvXxTt5x0mahZ5ryn0W4AxDjVYRQqFy7QXr0rL7ZvXKPiD0w3ULNJQdme1tTVi9edQg4NI4ZV6NyJRPOPjP06vTM0i+A4pewEu4ruEQw0uIoXCr+pBXKS2/06EzrCZtR58+HKUAh/AHGlwEykUHg3TMYz1BV+zCB+SRZuY4CqC7CyO137jIsij8ztGmmFy67u62jJrExPyibgSRBK0ZdYmJgQRI0EkQVtmbWJCEDESRBK0ZdYmJgQRI0EkQVtmbWJCEDESRBK0ZdYmJgQRIzWLRHqRiCMNQkUqDD50c6hBqEgDQNnciAWABg411FEkHuTUsxtgicOZGQ6OA7znUEMdRUy8ANgdR1PxNAmkF+BFHOkQKoK3URR/RJgBiC/JAj4ADFNxhIrQn/+ACooiq5px7RRSRRrx799LDy4WGV3Ha2Sa41VHEVNlV1Ubum+NxiILP9B3UcNHhbqKWK7LEl4TgCF8EMeTUKLkMaZHrkjbAtaTTXotc+7qKGK+tYiFD+vqG3X3+gfr1ME6irhRfGpZCCJGgkg5QcQLHkVGp4cc5wXFP7+iSDJdtnruUHl5Oi3H8Rdf7Hs5zs1wxCiSTGCuHp3INN2A2Oa3zBHPiVGEJiDkmlLuTg+e2rj6IC9GkdyT/J2hJrN59UFejCLq3up2X3bhTCO1Z7zeWRaRM5hfjoUwbixO9ajmsuMcP0fMIpmlSaqSZognM1aJbdZ+TiwiWRMuf8Jiam5pbjx7WEUKZ4rTQcpejvc4uQrsqw/yYhWhBZXt8YLKkhk/XSoxP26rD/LiIBKDJciKjFIFaee99ad6kXX66zr/+pbjWpJXWOrMeC6tOYSdvFcAriIXsNjpUbc58nCax/qVcBXZj+V+xhKIWhMmp4IgriI0VfIdW/B9Ncm7ZOAo8hwL3p80VBbVMJYsD1cRmvCZzEmeUssSXdd1fC3cRA5R0bkVfEu1+Pw2XT3gJkJv9vhzztQqacAO3iEHJxFaCaGWhIxy80rQ+yPBRYQevfC2rW3hnrqrYPIX3iEJB5F/qfC9i8d7Yw2/XW1v2EX+UaWPl4Ehw684XRhWEfXfPhQ5al//UCesIvHqmpjhQ5woEKtIcRlHu8BHVQqryJlJaG7fcX4L+nR+sVf2b4QgIo0gIo0gIo0gIo0gIo0gIo0gIo0gIo3vRKRQ+B8FB/pZnHtfNQAAAABJRU5ErkJggg==";
}

export function getEquipmentType() {
  if(navigator.userAgent.match(/(pad|iPad)/i)) {
    Config.equipmentType="iPad";
  } else if (navigator.userAgent.match(/(phone|pod|iPhone|iPod|ios|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
    Config.equipmentType="mobile";
  }else{
    Config.equipmentType="PC";
  }
}

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

export default function OutlinedTextFields(
  name,
) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="outlined-name"
        label="Name"
        className={classes.textField}
        value={values.name}
        onChange={handleChange('name')}
        margin="normal"
        variant="outlined"
      />
    </form>
  )
}