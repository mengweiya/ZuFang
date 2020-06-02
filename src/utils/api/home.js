
/**
 * 首页
 */
import connect from "../axios";
// 获取轮播图数据
export function swiperConnect () {
  return (connect.get('/home/swiper'))
}

// 获取租房小组数据
export function groupsConnect (area = 'AREA%7C88cff55c-aaa4-e2e0') {
  return (connect.get('/home/groups', {
    params: { area }
  })
  )
}
// 获取最新资讯数据
export function newsConnect (area = 'AREA%7C88cff55c-aaa4-e2e0') {
  return (connect.get('/home/news', {
    params: { area }
  })
  )
}