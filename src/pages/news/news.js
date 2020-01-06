import React from "react";
var XMLParser = require('react-xml-parser');


export default class News extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            news: []
        }

        const CORS = 'https://cors-anywhere.herokuapp.com/';
        const burl = 'https://www.chainnews.com/zh-hant/feeds/articles/';
        const query = '';
        const params = '';
        const url = burl + query + params;
        const feeds = fetch(CORS + url);
        
        feeds.then((res)=>{
                res.text().then((xml) => {
                    var xml_json = new XMLParser().parseFromString(xml);    // Assume xmlText contains the example XML
                    if(xml_json) xml_json = xml_json.children[0].children;
                    console.log(xml_json);
                    this.setState({
                        news: xml_json
                    });
                    
                })
            }).catch(() => console.error('Error in fetching the feeds'));
    }

    
    render() {
        const listsStyle = {
            padding: '16px'
        }
        const listStyle = {
            margin: '0 0',
            padding: '10px 0',
            borderBottom: '1px solid #555'
        }
        const fontStyle = {
            fontSize: '1.5em',
            color: 'white'
        }
        const dateStyle = {
            fontSize: '0.7em',
            color: '#555'
        }
        const items = this.state.news.map((item, key) =>
            (item.name === 'item') ? 
                <li key={item.children[4].value} style={listStyle}>
                    <a href={item.children[1].value} target={"_blank"} style={fontStyle}>{item.children[0].value}</a>
                    <span style={dateStyle}>{item.children[3].value}</span>
                </li>
            : ''
        );
        return(
            <div style={listsStyle}>{items}</div>
        )
    }
}
