import React, { Component } from 'react'
import { Carousel, WingBlank, Flex, Grid } from 'antd-mobile';
import { baseUrl } from '../../utils/axios';
import { swiperConnect, groupsConnect, newsConnect } from '../../utils/api/home';
import navs from '../../utils/navBar';
import './index.scss'


export default class Index extends Component {
  state = {
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
    // 加载轮播图数据
    this.getSwiper()
    // 加载租房小组数据
    this.getGroups()
    // 加载最新资讯数据
    this.getNews()
  }

  // 获取轮播图数据
  getSwiper = async () => {
    const { status, data } = await swiperConnect()
    console.log(status, data)
    // console.log(res)
    if (status === 200) {
      // 响应式：修改轮播图的数据
      this.setState({
        swiper: data
      }, () => {
        this.setState({
          // 轮播图没有数据,异步传的数据,需要在轮播图添加数据成功之后将autoplay改成true
          autoplay: true
        })
      })
    }
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
            href="http://itcast.cn"
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

  // 获取租房小组九宫格数据
  getGroups = async () => {
    const { status, data } = await groupsConnect();
    if (status === 200) {
      this.setState({
        groups: data
      })
      console.log(this.state.groups);
    }
  }
  // 获取最新资讯数据
  getNews = async () => {
    const { status, data } = await newsConnect();
    if (status === 200) {
      this.setState({
        news: data
      })
      console.log(this.state.news);
    }
  }
  renderNews = () => {
    return this.state.news.map(item => (
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
    ))
  }

  render () {
    return (
      <div>
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

