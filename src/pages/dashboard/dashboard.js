import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { CssBaseline, Divider, Grid, Icon, Paper } from "@material-ui/core";
import { Carousel, WingBlank } from 'antd-mobile';
import useCookies from "react-cookie/cjs/useCookies";
import { auth, toThousForm } from "../../public/js/utils";
import trans from "../../public/js/translation";
import config from "../../public/js/config";
import '../../public/js/clipboard';
import './dashboard.css';

import InfoModal from '../../components/modals/information-modal';
import BackupModal from '../../components/modals/backup-modal';

function Dashboard({ account, history }) {
  const [cookies]                         = useCookies(['pfa']);
  const [modalContent, setModalContent]   = useState('...');                          // modal content state
  const [modalTitle, setModalTitle]       = useState('...');                          // modal title state
  const [buModal, setBuModal]             = useState(false);                          // backup modal state
  const [tosModal, setTosModal]           = useState(false);                          // tos modal state
  const [list, setList]                   = useState([]);                             // price list state
  const [prList]                          = useState(['PFA', 'HAD', 'BTC']);          // primary list state (header list)
  const carouselList = trans.rotaryPlantingMap[config.lang];
  const icons = [
    {icon:'photo_library',text: trans.dashboards.backUp[config.lang]},
    {icon:'email',text: trans.dashboards.message[config.lang]},
    {icon:'import_contacts',text: trans.dashboards.manual[config.lang]},
  ];

  /* check logged in function, if no return login page */
  account = auth(account, cookies, history);
    
  /* backup modal handle */
  const buModalOpen   = () => setBuModal(true);
  const buModalClose  = () => setBuModal(false);

  const tosModalOpen  = (content, title) => {
    setModalTitle(title);
    setModalContent(content);
    setTosModal(true);
  };
  const tosModalClose = () => setTosModal(false);

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
              { key: "PFA",   price: config.rates.pfa.usdt.toFixed(3),  qty: (Math.random() * 800 + 8000).toFixed(2), color: 'red', change: -0.001 },
              { key: "HAD",   price: config.rates.pfa.ihad.toFixed(3),  qty: (Math.random() * 800 + 6000).toFixed(2), color: 'green', change: 0.001 },
              { key: "BTC",   price: Number(BTC.priceUsd).toFixed(3),   qty: toThousForm(BTC.volumeUsd24Hr),   color: BTC.changePercent24Hr  > 0 ? "green":"red", change: BTC.changePercent24Hr },
              { key: "XRP",   price: Number(XRP.priceUsd).toFixed(3),   qty: toThousForm(XRP.volumeUsd24Hr),   color: XRP.changePercent24Hr  > 0 ? "green":"red", change: XRP.changePercent24Hr },
              { key: "ETH",   price: Number(ETH.priceUsd).toFixed(3),   qty: toThousForm(ETH.volumeUsd24Hr),   color: ETH.changePercent24Hr  > 0 ? "green":"red", change: ETH.changePercent24Hr },
              { key: "LTC",   price: Number(LTC.priceUsd).toFixed(3),   qty: toThousForm(LTC.volumeUsd24Hr),   color: LTC.changePercent24Hr  > 0 ? "green":"red", change: LTC.changePercent24Hr },
              { key: "DASH",  price: Number(DASH.priceUsd).toFixed(3),  qty: toThousForm(DASH.volumeUsd24Hr),  color: DASH.changePercent24Hr > 0 ? "green":"red", change: DASH.changePercent24Hr }]);

          }).catch(e => console.log('error:', e));
    }
    fetchPrice();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper className='maxWidth'>

        {/* slider（Ant Mobile plugin） */}
        <WingBlank className={'slider'}>
          <Carousel
            className={'inner'}
            autoplay={false}
            autoplay
            infinite
          >{carouselList.map(val => (
              <a key={val}>
                <img
                  src={config.imgPath  + val}
                  alt=''
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                  }}
                />
              </a>
            ))}
          </Carousel>
        </WingBlank>

        {/* price blocks section */}
        <Grid className='price-blocks'>
          <Grid className='inner' container>
            {prList.map((symbol) => { return (
                <Grid className={'rowSep'} key={`${symbol}-container`} item={true} xs={(12 / prList.length)}>
                  {list.filter((item) => item.key === symbol).map((item, index) => { return (
                    <div key={`${symbol}-inner`}>
                      <Grid key={`${index}-title`} className='title'>{symbol} / USDT</Grid>
                      <Grid key={`${index}-price`} className={'price ' + item.color}>{item.price}</Grid>
                      <Grid key={`${index}-change`} className={'change ' + item.color}>{(Number(item.change) > 0 ? '+' : '') + Number(item.change).toFixed(3)}%</Grid>
                    </div>
                  )})}
                </Grid>
              )})}
          </Grid>
          <Divider />
          <Grid className='news'>
            <Icon className='icon'>volume_up</Icon>
            <Grid>{trans.dashboards.hadOnline[config.lang]}</Grid>
          </Grid>
        </Grid>
        
        {/* action block section */}
        <Grid className='action' container justify="center">
          {icons.map(item =>
            <Grid item={true} xs={3} key={item.icon} onClick={() => {
              switch(item.icon){
                case "photo_library":
                  buModalOpen();
                  break;
                case "import_contacts":
                  tosModalOpen(trans.usemethodfull[config.lang], trans.usemethod[config.lang]);
                  break;
                case "email":
                  tosModalOpen(trans.pfaMessagefull[config.lang], trans.pfaMessage[config.lang]);
                  break;
              }
            }} className='item'>
              <Icon className='img'>{item.icon}</Icon>
              <Grid>{item.text}</Grid>
            </Grid>
          )}
        </Grid>
        
        {/* price list section */}
        <Grid container justify="center" className='price-list header'>
          <Grid item={true} xs={4} className={'item'}>{trans.dashboards.market[config.lang]}</Grid>
          <Grid item={true} xs={4} className={'item'}>{trans.dashboards.price[config.lang]}</Grid>
          <Grid item={true} xs={4} className={'item'}>{trans.dashboards.volume[config.lang]}</Grid>
        </Grid>
        <Grid>
          {list.map((item) => (
            <div key={item.key} className='price-list items'>
              <Grid spacing={0} container  justify="center">
                <Grid item={true} xs={4} className={'item'}>{item.key}<span className={'secondary'}> / USDT</span></Grid>
                <Grid item={true} xs={4} className={'item ' + item.color}>{item.price}</Grid>
                <Grid item={true} xs={4} className={'item'}>{`${item.qty}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Grid>
              </Grid>
            </div>
          ))}
        </Grid>
        <Grid className="pageFoot"/>
      </Paper>

      <BackupModal
        trans = {trans} config = {config}
        open = {buModal} close = {buModalClose}
        account = {account}></BackupModal>

      <InfoModal
        open = {tosModal} close = {tosModalClose}
        title = {modalTitle} content = {modalContent}></InfoModal>

    </React.Fragment>
  );
}

export default withRouter(Dashboard);