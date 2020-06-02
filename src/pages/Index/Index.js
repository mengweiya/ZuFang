import React, { Component } from 'react'
import { Carousel, WingBlank, Flex, Grid, SearchBar } from 'antd-mobile';
import { baseUrl } from '../../utils/axios';
import { swiperConnect, groupsConnect, newsConnect } from '../../utils/api/home';
import navs from '../../utils/navBar';
import './index.scss'


export default class Index extends Component {
  state = {
    // 搜索框内容
    keyword: '',
    // 轮播图图片数据
    swiper: [],
    imgHeight: 212,
    // 当swiper为空时,autoplay没有数据没有办法直接设置自动播放;将自动播放设置成属性控制,swiper中有数据时,自动播放为true,无数据为false
    autoplay: false,
    // 租房小组九宫格数据
    groups: [],
    // 新闻资讯
    news: [],
  }

  componentDidMount () {
    // // 加载轮播图数据
    // this.getSwiper()
    // // 加载租房小组数据
    // this.getGroups()
    // // 加载最新资讯数据
    // this.getNews()
    this.loadDatas()
  }

  // 将整合获取轮播图,租房小组,最新咨询数据
  loadDatas = async () => {
    // 注意:这里解析不是使用的{},因为Promise.all解析后的是数组形式,前面也应是数组形式解析一一对应
    const [swiper, groups, news] = await Promise.all([swiperConnect(), groupsConnect(), newsConnect()])
    console.log('promise.all的数据', swiper, groups, news);
    if (swiper.status === 200) {
      this.setState({
        swiper: swiper.data,
        groups: groups.data,
        news: news.data
      }, () => {
        this.setState({
          // 轮播图没有数据,异步传的数据,需要在轮播图添加数据成功之后将autoplay改成true
          autoplay: true
        })
      })
    }
  }


  // // 获取轮播图数据
  // getSwiper = async () => {
  //   const { status, data } = await swiperConnect()
  //   console.log(status, data)
  //   // console.log(res)
  //   if (status === 200) {
  //     // 响应式：修改轮播图的数据
  //     this.setState({
  //       swiper: data
  //     }, () => {
  //       this.setState({
  //         // 轮播图没有数据,异步传的数据,需要在轮播图添加数据成功之后将autoplay改成true
  //         autoplay: true
  //       })
  //     })
  //   }
  // }
  // 获取租房小组九宫格数据
  // getGroups = async () => {
  //   const { status, data } = await groupsConnect();
  //   if (status === 200) {
  //     this.setState({
  //       groups: data
  //     })
  //     console.log(this.state.groups);
  //   }
  // }
  // // 获取最新资讯数据
  // getNews = async () => {
  //   const { status, data } = await newsConnect();
  //   if (status === 200) {
  //     this.setState({
  //       news: data
  //     })
  //     console.log(this.state.news);
  //   }
  // }

  // 渲染顶部导航
  renderTopNav = () => {
    const { push } = this.props.history
    return (
      <Flex justify="around" className="topNav">
        <div className="searchBox">
          <div className="city" onClick={() => {
            push('./cityList')
          }}>
            北京<i className="iconfont icon-arrow" />
          </div>
          <SearchBar
            value={this.state.keyword}
            onChange={(v) => this.setState({ keyword: v })}
            placeholder="请输入小区或地址"
          />
        </div>
        <div className="map" onClick={() => {
          push('./map')
        }}>
          <i key="0" className="iconfont icon-map" />
        </div>
      </Flex>
    )
  }

  // 渲染轮播图
  renderSwiper = () => {
    return (
      <Carousel
        autoplay={this.state.autoplay}
        infinite
      >
        {this.state.swiper.map(val => (
          <a
            key={val.id}
            href="https://zos.alipayobjects.com"
            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
          >
            <img
              src={`${baseUrl}${val.imgSrc}`}
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

  // 菜单栏
  renderNavBar = () => {
    return (
      <Flex className="nav">
        {
          navs.map((item, index) =>
            <Flex.Item onClick={() => this.props.history.push(item.path)} key={index}>
              <img src={item.img} alt="" />
              <p>{item.title}</p>
            </Flex.Item>
          )
        }
      </Flex>
    )
  }

  // 租房小组
  renderGroups = () => {
    return (
      // 不管是在方法里还是react结构中都只能有一个一级标签,如果在要渲染的地方已经有<div>结构了 不想在加<div>结构,可以使用<>包一下
      <>
        {/* 标题 */}
        <Flex className="group-title" justify="between">
          <h3>租房小组</h3>
          <span>更多</span>
        </Flex>
        {/* 内容 */}
        <Grid data={this.state.groups}
          columnNum={2}
          hasLine={false}
          square={false}
          renderItem={item => (
            // 自定义宫格结构和样式
            <Flex className="grid-item" justify="between">
              <div className="desc">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <img src={`${baseUrl}${item.imgSrc}`} alt="" />
            </Flex>
          )}
        />
      </>
    )
  }


  // 最新咨询
  renderNews = () => {
    return this.state.news.map(item =>
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img
            className="img"
            src={`${baseUrl}${item.imgSrc}`}
            alt=""
          />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    )
  }

  render () {
    return (
      <div>
        {/* 顶部导航栏搜索框 */}
        {
          this.renderTopNav()
        }

        {/* 轮播图 */}
        {
          this.renderSwiper()
        }

        {/* 菜单栏 */}
        {
          this.renderNavBar()
        }

        {/* 租房小组 */}
        <div className="group">
          {
            this.renderGroups()
          }
        </div>

        {/* 最新资讯 */}
        <div className="news">
          {/* 标题 */}
          <h3 className="group-title">最新资讯</h3>
          <WingBlank size="md">{this.renderNews()}</WingBlank>
        </div>



      </div>
    )
  }
}


