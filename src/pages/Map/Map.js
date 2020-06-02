import React, { Component } from 'react'
import './Map.scss'
import { NavBar, Icon } from 'antd-mobile'
export default class Map extends Component {
  componentDidMount () {
    this.initMap()
  }

  //  初始化地图
  initMap = () => {
    // 如果是index.html中引用的是百度地图最新script地址,BMap改为BMapGL
    const { BMap } = window;
    console.log(window.BMap);
    // 1. 创建地图实例
    const map = new BMap.Map("container");
    // 2. 地图定位的经纬度设置(天安门)
    const point = new BMap.Point(116.404, 39.915);
    // 3. 设置地图的位置和缩放级别
    map.centerAndZoom(point, 15);
  }
  render () {
    return (
      <div className="mapBox">
        <NavBar
          className="mapNav"
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.goBack()
          }}
        >
          地图找房
        </NavBar>
        <div id="container">
        </div>
      </div>
    )
  }
}
