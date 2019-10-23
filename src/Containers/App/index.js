import React from 'react';
import './styles.scss';
import { renderRoutes } from 'react-router-config';

class App extends React.Component {
  onBtnClick = (page) => {
    const { history } = this.props;
    if (page === 1) {
      history.push('/App/PageOne');
    } else if (page === 2) {
      history.push('/App/PageTwo');
    }
  }

  render() {
    const { route } = this.props;
    return (
      <div className="app">
        <div className="headerDiv">
          <button onClick={() => { this.onBtnClick(1) }}>PageOne</button>
          <button onClick={() => { this.onBtnClick(2) }}>PageTwo</button>
        </div>
        {/* 渲染App组件的子路由组件 */}
        <div className="contentDiv">
          {renderRoutes(route.routes)}
        </div>
      </div>
    );
  }
}

export default App;
