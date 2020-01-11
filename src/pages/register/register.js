import React, { useState, useEffect } from 'react';
import { Button, FormControl, FormHelperText, Grid, IconButton, InputLabel, Modal, Snackbar, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { HorizontalCenter, VerticalCenter } from '../../public/js/utils';
import config from '../../public/js/config';
import trans from '../../public/js/translation';

import 'react-phone-input-2/lib/style.css';

import BootstrapInput from '../../components/bootstrap-input';
import MobileInput from '../../components/mobile-input';
import registerStyles from './style.js';

const smsUrl = 'https://api.quorum.mex.gold/sms/';

function RegisterPage({ onRegister, popMobileWarning }) {
  const classes = registerStyles();
  const [failedSB, setFailedSB]           = useState(false);                                        // snackbar for failed message account not created state
  const [username, setUsername]           = useState('');                                           // username state
  const [acCode, setAcCode]               = useState('');                                           // access code state
  const [existPK, setExistPK]             = useState('');                                           // existing private key state
  const [mobile, setMobile]               = useState({regionCode: '', phone: ''});                  // mobile info state
  const [disabled, setDisabled]           = useState(false);                                        // sms code sent
  const [counter, setCounter]             = useState(0);                                            // 60s sms counter state
  const [tosModal, setTosModal]   = useState(false);                                        // tos modal state

  const failedSBClose       = ()      => setFailedSB(false);                                        // close the tos snackbar
  const acCodeChange        = (event) => setAcCode(event.target.value);                             // method when access code on change
  const existPKChange       = (event) => setExistPK(event.target.value);                            // set existing private key
  const usernameChange      = (data)  => mobileChange((data.split(' ').length === 1) ? '' : data);  // little hack for re-formatting the mobile number
  
  const mobileChange = (data) => {                                                                  // method when mobile on change
    setUsername(data);
    const info = data.split(' ');
    if (info.length === 2) {
      const regionCode = info[0].replace('+', '');
      const phone = info[1];
      setMobile({ regionCode, phone });
    } else
      setMobile({regionCode: '', phone: ''});
  };

  const timer = () => setCounter(counter - 1);
  useEffect(() => {                                                                                 // timer hook
    if (counter <= 0) return;
    const id = setInterval(timer, 1000);
    return () => clearInterval(id);
  });

  const tosModalOpen  = () => setTosModal(true);                                                    // open tos modal method
  const tosModalClose = () => { setTosModal(false); submit(); };                                    // close tos modal and submit info method

  const sendCode = async () => {                                                                    // request to send sms code and start timer
    try {
      mobileChange(username);
      if (mobile.regionCode === '' || mobile.phone === '')
        throw new Error('invalid phone number');
      await fetch(`${smsUrl}${mobile.regionCode}/${mobile.phone}`);
      // Disable this button until 60 seconds
      setCounter(60);
      setDisabled(true);
    } catch (e) { console.error(e);
      popMobileWarning();
    }
  }

  const submit = () => {                                                                            // submit register info
    try {
      mobileChange(username);
      if (mobile.regionCode === '' || mobile.phone === '') 
        throw new Error('invalid phone number');
      onRegister(mobile.regionCode, mobile.phone, acCode, existPK);
    } catch (e) { console.error(e);
      setFailedSB(true);
    }
  };

  return (
    <VerticalCenter gridStyle={{ minHeight: '80vh' }}>
      <HorizontalCenter>
        <Grid container alignItems={'center'} direction={'column'} spacing={2}>
          <Grid item>
            <FormControl style={{ width: 300 }}>
              <InputLabel shrink className='inputLabel'>{trans.mobile[config.lang]}</InputLabel>
              <MobileInput trans = {trans} config = {config} disabled = {disabled}
                value = {username}
                onChange = {usernameChange}
              ></MobileInput>
            </FormControl>
          </Grid>
          <Grid item>
            <Button className='CommonButtonStyle' disabled={counter > 0} style={{ width: 300 }} variant='contained' color='primary' onClick={sendCode}>
              {trans.getCode[config.lang]}{ (counter > 0) ? ' (' + counter + ')' : '' }
            </Button>
          </Grid>
          <Grid item>
            <FormControl style={{ width: 300 }}>
              <InputLabel shrink className='inputLabel'>{trans.accessToken[config.lang]}</InputLabel>
              <BootstrapInput
                value={acCode}
                onChange={acCodeChange}
                />
              <FormHelperText className='formHelperText'>{acCode.length >= 4? undefined: trans.accessTokenLengthWarning[config.lang]}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item>
            <Typography variant={'body2'} className='textInfo' style={{ width: 300 , textAlign: 'justify' }}>
              {trans.accountCreationWarning1[config.lang]}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant={'body2'} className='textInfo' style={{ width: 300 , textAlign: 'justify'}}>
              {trans.accountCreationWarning2[config.lang]}
            </Typography>
          </Grid>
          <Grid item>
            <Button className='CommonButtonStyle' style={{ width: 300 }} variant='contained' color='primary' onClick={tosModalOpen}>
              {trans.register[config.lang]}
            </Button>
          </Grid>
        </Grid>
      </HorizontalCenter>

      <Modal open={tosModal} style={{ height: '100%' }} onBackdropClick={tosModalClose}>
        <div className={classes.modalPaper + ' modalWidth'}>
          <Grid style={{ height: '100%' }} container direction={'column'}>
            <Grid item style={{ maxHeight: '16%', width: '100%' }}>
              <div className={classes.toolbarIcon}>
                <Typography variant={'h5'} style={{color:'white',width: '87%',margin:'0 auto'}}>{trans.createAccountPage.remember[config.lang]}</Typography>
                <IconButton className={classes.close} onClick={tosModalClose}>
                  <CloseIcon />
                </IconButton>
              </div>
            </Grid>
            <Grid item style={{ overflow: 'auto', maxHeight: '84%', width: '100%', padding: '6px' }}>
              <Typography style={{ marginRight: '150px', textAlign: 'justify', width: '100%', wordBreak: 'break-all',color:'white' }} dangerouslySetInnerHTML={{ __html: trans.createAccountPage.rememberfull[config.lang] }} />
            </Grid>
          </Grid>
        </div>
      </Modal>

      <Snackbar
        open={failedSB}
        autoHideDuration={6000}
        onClose={failedSBClose}
        message={trans.createAccountPage.onlyEn[config.lang]}
      />
    </VerticalCenter>

  );
}

export default RegisterPage;