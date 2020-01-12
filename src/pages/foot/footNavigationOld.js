import React from 'react';
import { Toast } from 'antd-mobile';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import { Grid } from "@material-ui/core";

import trans from "../../public/js/translation";
import Config from "../../public/js/config";
import "./footNavigation.css";

export default function FootNavigation({props}) {

  const routs = ['/app','/app','/exchange','/app','/About'];

  const getIndex = ()=>{
    let location = document.location.toString();
    let uri = location.substr(location.lastIndexOf('/'));
    if(routs.includes(uri)){
      return routs.indexOf(uri);
    }
    return 0;
  };
  const [value, setValue] = React.useState(getIndex());


  // 切换底部按钮
  function handleChange(event, newValue) {
    if(value !== newValue){
      props.history.push(routs[newValue]);//跳转页面
      setValue(newValue);
    }
  }

  return (
    <Grid>
      <Grid className="footNavigationStyle">
        <BottomNavigation value={value} onChange={handleChange} >
          <BottomNavigationAction label={trans.footNavigation[Config.lang][0]} value={0} icon={<Icon>home</Icon>} />
          <BottomNavigationAction label={trans.footNavigation[Config.lang][1]} value={1} icon={<Icon>account_balance_wallet</Icon>} />
          <BottomNavigationAction label={trans.footNavigation[Config.lang][2]} value={2} icon={<Icon>swap_horizontal_circle</Icon>} />
          <BottomNavigationAction label={trans.footNavigation[Config.lang][3]} value={3} icon={<Icon>language</Icon>} />
          <BottomNavigationAction label={trans.footNavigation[Config.lang][4]} value={4} icon={<Icon>group</Icon>} />
        </BottomNavigation>
      </Grid>
    </Grid>
  );
}
