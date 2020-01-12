import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { CssBaseline, Divider, Grid, Icon, Paper } from "@material-ui/core";
import { Carousel, WingBlank } from 'antd-mobile';
import useCookies from "react-cookie/cjs/useCookies";
import { isEmpty } from "../../public/js/utils";
import trans from "../../public/js/translation";
import config from "../../public/js/config";
import '../../public/js/clipboard';
import './dashboard.css';

import InfoModal from '../../components/information-modal';
import BackupModal from '../../components/backup-modal';

function Dashboard({ account, history, currentUsername }) {
  const [cookies]                       = useCookies(['pfa']);
  const [modalContent, setModalContent] = useState("undefinede");
  const [modalTitle, setModalTitle]     = useState("undefinede");
  const [modalOpen, setModalOpen]       = useState(false);
  const [tosModal, setTosModal]         = useState(false);
  const [prices,setPrices]              = useState({data:{
    BTC:{
      quote:{
        USD:{
          price:0,
          percent_change_24h:0
        }
      }
    }
    }})
  const [list,setList]  = useState([{ key: "PFA", price: 1.500, qty: (Math.random()*800+8000).toFixed(2), color: '' },
                          { key: "HAD", price: 1.000, qty: (Math.random()*800+6000).toFixed(2), color: 'green' },
                          { key: "BTC", price: 0, qty: 0, color: 'red' },
                          { key: "XRP", price: 0, qty: 0, color: 'green' },
                          { key: "ETH", price: 0, qty: 0, color: 'red' },])
  const carouselList = trans.rotaryPlantingMap[config.lang];
  const icons = [
    {icon:'photo_library',text: trans.dashboards.backUp[config.lang]},
    {icon:'email',text: trans.dashboards.message[config.lang]},
    {icon:'import_contacts',text: trans.dashboards.manual[config.lang]},
  ];

  if (account == null || isEmpty(account)) {
    account = cookies.acctobj;
    if(account == null || isEmpty(account)) 
      history.push("/login-account");
  }
  if(isEmpty(currentUsername)) 
    currentUsername = cookies.username;
    
  const handleModalOpen                 = () => setModalOpen(true);
  const handleModalClose                = () => setModalOpen(false);

  const tosModalOpen  = (content, title) => {
    setModalTitle(title);
    setModalContent(content);
    setTosModal(true);
  };
  const tosModalClose = () => setTosModal(false);

  function numberFormat(number) {
    const format = { 0: '', 1: 'K', 2: 'M', 3: 'B' }
    let count = 0;
    while(number > 1000) {
      number /= 1000;
      count++;
    }
    const formatted = Number(number).toFixed(2) + format[count];
    return formatted;
  }

  useEffect(() => {
    const fetchPrice = async () => {
      const CORS = 'https://cors-anywhere.herokuapp.com/';
      const burl = 'https://api.coincap.io';
      const query = '/v2/assets';
      const params = '?ids=bitcoin,ethereum,ripple,litecoin,dash';
      const url = burl + query + params;
  
      const coincap = fetch(CORS + url, { method: 'GET' });
      let BTC = 0;
      let XRP = 0;
      let ETH = 0;
      let LTC = 0;
      let DASH = 0;
      coincap
        .then(res => res.json())
          .then(data => {
            const markets = data.data;
            for(var i = 0; i < markets.length; i++){
              switch(markets[i].symbol){
                case 'ETH': ETH = markets[i]; break;
                case 'BTC': BTC = markets[i]; break;
                case 'XRP': XRP = markets[i]; break;
                case 'LTC': LTC = markets[i]; break;
                case 'DASH': DASH = markets[i]; break;
              }
            }
            setList([
              { key: "PFA", price: 1.500.toFixed(3),  qty: (Math.random()*800+8000).toFixed(2), color: 'white' },
              { key: "HAD", price: 1.000.toFixed(3),  qty: (Math.random()*800+6000).toFixed(2), color: 'white' },
              //{ key: "YHAD", price: 1.000.toFixed(3), qty: (Math.random()*800+6000).toFixed(2), color: 'white' },
              { key: "BTC",   price: Number(BTC.priceUsd).toFixed(3),   qty: numberFormat(BTC.volumeUsd24Hr),   color: BTC.changePercent24Hr  > 0 ? "green":"red" },
              { key: "XRP",   price: Number(XRP.priceUsd).toFixed(3),   qty: numberFormat(XRP.volumeUsd24Hr),   color: XRP.changePercent24Hr  > 0 ? "green":"red" },
              { key: "ETH",   price: Number(ETH.priceUsd).toFixed(3),   qty: numberFormat(ETH.volumeUsd24Hr),   color: ETH.changePercent24Hr  > 0 ? "green":"red" },
              { key: "LTC",   price: Number(LTC.priceUsd).toFixed(3),   qty: numberFormat(LTC.volumeUsd24Hr),   color: LTC.changePercent24Hr  > 0 ? "green":"red" },
              { key: "DASH",  price: Number(DASH.priceUsd).toFixed(3),  qty: numberFormat(DASH.volumeUsd24Hr),  color: DASH.changePercent24Hr > 0 ? "green":"red" }]);
            setPrices({data:{
                BTC:{
                  quote:{
                    USD:{
                      price:BTC.priceUsd,
                      percent_change_24h:BTC.changePercent24Hr
                    }
                  }
                }
              }})
          }).catch(e => console.log('error:', e));
    }
    fetchPrice();
  }, []);

  return (
    <React.Fragment>
      <div className="dashboard">
        <CssBaseline />
        <Paper className='maxWidth'>
          <WingBlank className='wheelPlanting'> {/* slider（Ant Mobile plugin） */}
            <Carousel
              className='wheelPlantingUl'
              autoplay={false}
              autoplay
              infinite
            >
              {carouselList.map(val => (
                <a
                  key={val}
                  style={{ display: 'inline-block', width: '100%', height: 'auto' }}
                >
                  <img
                    className='wheelPlanting'
                    src={config.imgPath  + val}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                      // fire window resize event to change height
                      window.dispatchEvent(new Event('resize'));
                    }}
                  />
                </a>
              ))}
            </Carousel>
          </WingBlank>

          <Grid className='header'>
            <Grid className='top' spacing={0} container justify="center">
              <Grid item={true} xs={4}>
                <Grid className='title'>PFA/USDT</Grid>
                <Grid className='sum'>1.500</Grid>
                <Grid className='gain red'>+0.001%</Grid>
              </Grid>
              <Grid item={true} xs={4} className='center'>
                <Grid className='title'>HAD/USDT</Grid>
                <Grid className='sum'>1.000</Grid>
                <Grid className='gain green'>+0.001%</Grid>
              </Grid>
              <Grid item={true} xs={4}>
                <Grid className='title'>BTC/USDT</Grid>
                <Grid className={'sum '+prices.data.BTC.quote.USD.percent_change_24h>0?"green":"red"}>{Number(prices.data.BTC.quote.USD.price).toFixed(3)}</Grid>
                <Grid className={'gain '+prices.data.BTC.quote.USD.percent_change_24h>0?"green":"red"}>{Number(prices.data.BTC.quote.USD.percent_change_24h).toFixed(2)}%</Grid>
              </Grid>
            </Grid>
            <Divider component="li" className='line' />
            <Grid className='msg'>
              <Icon className='msgIcon'>volume_up</Icon>
              <Grid>{trans.dashboards.hadOnline[config.lang]}</Grid>
            </Grid>
          </Grid>
          <Grid className='link' spacing={0} container justify="center">
            {icons.map(item =>
              <Grid item={true} xs={2} key={item.icon} onClick={() => {
                switch(item.icon){
                  case "photo_library":
                    handleModalOpen();
                    break;
                  case "import_contacts":
                    tosModalOpen(trans.usemethodfull[config.lang], trans.usemethod[config.lang]);
                    break;
                  case "email":
                    tosModalOpen(trans.pfaMessagefull[config.lang], trans.pfaMessage[config.lang]);
                    break;
                }
              }} className='linkItem'>
                <Icon className='linkImg'>{item.icon}</Icon>
                <Grid>{item.text}</Grid>
              </Grid>
            )}
          </Grid>
          
          <Grid spacing={0} container justify="center" className='listHeader'>
            <Grid item={true} xs={4} className='listLeft'>{trans.dashboards.market[config.lang]}</Grid>
            <Grid item={true} xs={4} className='listLeft'>{trans.dashboards.price[config.lang]}</Grid>
            <Grid item={true} xs={4} className='listRight'>{trans.dashboards.volume[config.lang]}</Grid>
          </Grid>
          <Grid>
            {list.map((item, index) => (
              <div key={item.key} className={index + 1 === list.length ? '' : 'borderLine'}>
                <Grid spacing={0} container  justify="center" className='list'>
                  <Grid item={true} xs={4} >{item.key}<span className="btc"> / USDT</span></Grid>
                  <Grid item={true} xs={4} className={item.color}>{item.price}</Grid>
                  <Grid item={true} xs={4} className='three'>{`${item.qty}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Grid>
                </Grid>
              </div>
            ))}
          </Grid>
          <Grid className="pageFoot"/>
        </Paper>

        <BackupModal
          trans = {trans} config = {config}
          open = {modalOpen} close = {handleModalClose}
          account = {account}></BackupModal>

        <InfoModal
          open = {tosModal} close = {tosModalClose}
          title = {modalTitle} content = {modalContent}></InfoModal>
      </div>

    </React.Fragment>
  );
}

export default withRouter(Dashboard);