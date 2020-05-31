import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, } from 'react-router-dom';
import Home from './pages/Home/Home';
import CityList from './pages/CityList/CityList';
import Map from './pages/Map/Map';
import Fn404 from './pages/Fn404/Fn404';



function App () {
  return (
    <div className="App">
      {/* 一级路由 */}
      <Router>
        {/* 使用Link时要在上方引用
        <Link to="/home">首页</Link>
        <Link to="/cityList">城市列表</Link>
        <Link to="/map">地图</Link> */}
        <Switch>
          {/* <Redirect exact from='/' to='/home' />   ===>等于 */}
          <Route exact path='/' render={() => { return <Redirect to='/home' /> }} />
          <Route path='/home' component={Home} />
          <Route path='/cityList' component={CityList} />
          <Route path='/map' component={Map} />
          <Route component={Fn404} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
