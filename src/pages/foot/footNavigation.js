import React, { Component } from 'react';
import { TabBar, Toast } from 'antd-mobile';
import Icon from '@material-ui/core/Icon';
import "./footNavigation.css";
import Config from "../../public/js/config";
import t from "../../public/js/translation";

export default class FootNavigation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
      selectedTab: 0,
      tabs: [
        { title: t.footNavigation[Config.lang][0], icon: 'home', toPage: '/app' },
        { title: t.footNavigation[Config.lang][1], icon: 'account_balance_wallet', toPage: '/myWallet' },
        { title: t.footNavigation[Config.lang][2], icon: 'swap_horizontal_circle', toPage: '/convert-page' },
        { title: t.footNavigation[Config.lang][3], icon: 'language', toPage: '/news' },
        { title: t.footNavigation[Config.lang][4], icon: 'group', toPage: '/aboutUs' },
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
    // if (index === 3) {
    //   Toast.info(t.footNavigations.message[Config.lang], 3, null, false);
    //   return;
    // }
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
