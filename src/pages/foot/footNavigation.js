import React, { Component } from 'react';
import { TabBar, Toast } from 'antd-mobile';
import Icon from '@material-ui/core/Icon';
import "./footNavigation.css";

export default class FootNavigation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
      selectedTab: 0,
      tabs: [
        { title: "首頁", icon: 'home', toPage: '/app' },
        { title: "錢包", icon: 'account_balance_wallet', toPage: '/myWallet' },
        { title: "交易", icon: 'swap_horizontal_circle', toPage: '/convert-page' },
        { title: "幣訊", icon: 'language', toPage: '/app' },
        { title: "我的", icon: 'group', toPage: '/aboutUs' },
      ],
    };
    this.init();
  }

  init() {
    let location = document.location.toString();
    let uri = location.substr(location.lastIndexOf('/'));
    let index = this.state.tabs.findIndex((item) => item.toPage === uri);
    if (index !== -1) {
      this.state.selectedTab = index;
    }
  };

  onPress(model, index) {
    if (index === 3) {
      Toast.info('暫未提供，升級後開放市場新聞功能', 3, null, false);
      return;
    }
    if (this.state.selectedTab !== index) {
      this.props.history.push(model.toPage);//跳转页面
      this.setState({ selectedTab: index });
    }
  }

  render() {
    return (
      <div className="footNavigationStyle">
        <TabBar
          unselectedTintColor="#fff"
          tintColor="#FFB601"
          barTintColor="#212733"
          hidden={this.state.hidden}
        >
          {this.state.tabs.map((item, index) =>
            <TabBar.Item
              title={item.title}
              key={index}
              icon={<Icon>{item.icon}</Icon>}
              selectedIcon={<Icon>{item.icon}</Icon>}
              selected={this.state.selectedTab === index}
              onPress={() => this.onPress(item, index)}
            >
            </TabBar.Item>
          )}
        </TabBar>
      </div>
    );
  }
}
