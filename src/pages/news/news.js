import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
var XMLParser = require('react-xml-parser');

function News() {
    const [newsState, setNewsState] = useState([]);

    const CORS = 'https://cors-anywhere.herokuapp.com/';
    const burl = 'https://www.chainnews.com/zh-hant/feeds/news/';
    const query = '';
    const params = '';
    const url = burl + query + params;
    const feeds = fetch(CORS + url);

    useEffect(() => {
        const fetchNews = () => {
            feeds.then((res)=>{
                res.text().then((xml) => {
                    // console.log(xml);
                    var xml_json = new XMLParser().parseFromString(xml);    // Assume xmlText contains the example XML
                    if(xml_json) xml_json = xml_json.children[0].children;
                    // console.log(xml_json);
                    setNewsState(xml_json.map(item => (
                        (item.name === 'item') ?
                            <li key={item.children[4].value} style={listStyle}>
                                <a href={item.children[1].value} target={"_blank"} style={fontStyle}>{item.children[0].value}</a>&nbsp;
                                <span style={dateStyle}>{getParsedDate(item.children[3].value)}</span>
                            </li>
                        : ''
                    )));
                })
            }).catch(() => console.error('Error in fetching the feeds'));
        };
        fetchNews();
    }, [])

    // convert the date format
    const getParsedDate = (strDate) => {
        var date = new Date(strDate);
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!
    
        var yyyy = date.getFullYear();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        date =  dd + "-" + mm + "-" + yyyy;
        return date.toString();
    }

    const listsStyle = {
        padding: '16px'
    }
    const listStyle = {
        margin: '0 0',
        padding: '15px 80px 15px 0px',
        borderBottom: '1px solid #555'
    }
    const fontStyle = {
        fontSize: '1.2em',
        color: 'white'
    }
    const dateStyle = {
        fontSize: '0.7em',
        color: '#555',
        position: 'absolute',
        right: '10px'
    }

    return(
        <React.Fragment>
            <Grid style={{ position: 'relative', maxWidth: "1100px", margin: "0 auto", backgroundColor: "#212733!important", height: "100vh" }}>
                <div style={listsStyle}>{newsState}</div>
            </Grid>
        </React.Fragment>
    )
}

export default withRouter(News);
