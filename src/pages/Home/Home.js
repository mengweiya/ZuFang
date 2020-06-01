import React from 'react'
import { TabBar } from 'antd-mobile';

import { Route } from 'react-router-dom'

import Index from '../Index/Index'
import House from '../House/House'
import Profile from '../Profile/Profile'

// 优化后将数据单独存放,方便修改
import { tabBarData } from '../../utils/TabBarData'

import './Home.css'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: this.props.location.pathname,
    };
  }

  // 渲染tabBar的组件方法
  renderTabBar = () => {
    // this.props中提供了很多有用的方法,history中路由跳转的方法和location中很多属性 
    console.log(this.props);

    return (
      <div className='box'>
        <TabBar
          // 默认状态tabBar颜色的
          unselectedTintColor="#949494"
          // 选中状态tabBar颜色的
          tintColor="#33A3F4"
          // 选中文字颜色
          barTintColor="white"
        >
          {
            tabBarData.map((item, index) =>
              <TabBar.Item
                title={item.title}
                key={index}
                // 默认显示图标
                icon={<i className={`iconfont ${item.icon}`} />}
                // 被选中的图标
                selectedIcon={<i className={`iconfont ${item.icon}`} />}
                // 选中后该按钮的属性链接
                selected={this.state.selectedTab === item.path}
                // 点击事件
                onPress={() => {
                  this.props.history.push(item.path)
                  this.setState({
                    selectedTab: item.path,
                  });
                }}
              />
            )
          }
        </TabBar>
      </div >
    )
  }

  render () {
    return (
      <div className="home">
        {/* 标签页二级路由配置 */}
        {/* 默认首页 */}
        <Route exact path='/home' component={Index} />
        {/* 列表找房 */}
        <Route path='/home/house' component={House} />
        {/* 个人中心 */}
        <Route path='/home/profile' component={Profile} />

        {/* 标签页组件 =》 复用 */}
        <div className='tabBox'>
          {
            this.renderTabBar()
          }
        </div>
      </div>
    )
  }
}

export default Home
