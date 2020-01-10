import React from "react";
var XMLParser = require('react-xml-parser');

export default class News extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            news: []
        }

        const CORS = 'https://cors-anywhere.herokuapp.com/';
        const burl = 'https://www.chainnews.com/zh-hant/feeds/news/';
        const query = '';
        const params = '';
        const url = burl + query + params;
        const feeds = fetch(CORS + url);
        
        feeds.then((res)=>{
                res.text().then((xml) => {
                    // console.log(xml);
                    var xml_json = new XMLParser().parseFromString(xml);    // Assume xmlText contains the example XML
                    if(xml_json) xml_json = xml_json.children[0].children;
                    // console.log(xml_json);
                    this.setState({
                        news: xml_json
                    });
                })
            }).catch(() => console.error('Error in fetching the feeds'));
    }

    // convert the date format
    getParsedDate(strDate){
        var date = new Date(strDate);
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!
    
        var yyyy = date.getFullYear();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        date =  dd + "-" + mm + "-" + yyyy;
        return date.toString();
    }

    render() {
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
        const items = this.state.news.map((item, key) =>
            (item.name === 'item') ?
                <li key={item.children[4].value} style={listStyle}>
                    <a href={item.children[1].value} target={"_blank"} style={fontStyle}>{item.children[0].value}</a>&nbsp;
                    <span style={dateStyle}>{this.getParsedDate(item.children[3].value)}</span>
                </li>
            : ''
        );
        return (
            <div style={listsStyle}>{items}</div>
        )
    }
}
