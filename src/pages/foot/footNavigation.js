import React, { Component } from 'react';
import { TabBar } from 'antd-mobile';
import Icon from '@material-ui/core/Icon';
import "./footNavigation.css";
import config from "../../public/js/config";
import trans from "../../public/js/translation";

export default class FootNavigation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
      selectedTab: 0,
      tabs: [
        { title: trans.footNavigation[config.lang][0], icon: 'home', toPage: '/app' },
        { title: trans.footNavigation[config.lang][1], icon: 'account_balance_wallet', toPage: '/wallet' },
        { title: trans.footNavigation[config.lang][2], icon: 'swap_horizontal_circle', toPage: '/exchange' },
        { title: trans.footNavigation[config.lang][3], icon: 'language', toPage: '/news' },
        { title: trans.footNavigation[config.lang][4], icon: 'group', toPage: '/about' },
      ],
    };
    this.init();
  }

  init() {
    let location = document.location.toString();
    let uri = location.substr(location.lastIndexOf('/'));
    let index = this.state.tabs.findIndex((item) => item.toPage === uri);
    if (index !== -1)
      this.state.selectedTab = index;
  };

  onPress(model, index) {
    if (this.state.selectedTab !== index) {
      this.props.history.push(model.toPage);  // nav to page
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
