import React, { Component } from 'react'
import { Carousel } from 'antd-mobile';
import connect from '../../utils/axios';




export default class Index extends Component {
  state = {
    // 轮播图图片数据
    swiper: [],
    imgHeight: 212,
    autoplay: 'true'
  }

  // 获取轮播图数据
  getSwiper = async () => {
    const { status, data } = await connect.get('/home/swiper')
    console.log(status, data)
    // console.log(res)
    if (status === 200) {
      // 响应式：修改轮播图的数据
      this.setState({
        swiper: data
      })
    }
  }
  componentDidMount () {
    // 加载轮播图数据
    this.getSwiper()

  }
  // 渲染轮播图
  renderSwiper = () => {
    return (
      <Carousel
        autoplay={this.state.autoplay}
        infinite
        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
        afterChange={index => console.log('slide to', index)}
      >
        {this.state.swiper.map(val => (
          <a
            key={val.id}
            href="http://itcast.cn"
            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
          >
            <img
              src={`http://api-haoke-dev.itheima.net${val.imgSrc}`}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
                this.setState({ imgHeight: 'auto' });
              }}
            />
          </a>
        ))}
      </Carousel>
    )
  }

  // renderNav = () => {
  //   return (
  //     // JSX
  //     <Flex className="nav">
  //       {
  //         navs.map((item) => {
  //           <Flex.Item onClick={() =>} key={item.id} >
  //             <img src={item.img} />
  //             <p>{item.title}</p>
  //           </Flex.Item>
  //         }
  //         )
  //       }
  //     </Flex>
  //   )
  // }


  render () {
    return (
      <div>
        {/* 轮播图 */}
        {
          this.renderSwiper()
        }
        {/* 菜单栏 */}
        {
          this.renderNav()
        }
      </div>
    )
  }
}

