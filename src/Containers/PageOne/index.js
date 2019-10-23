import React from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import './styles.scss';

import {
  resetStateAction,
  getCurrentIpAction
} from './actions';
import {
  makeIp
} from './selectors';


class PageOne extends React.Component {
  componentDidMount() {
    this.props.dispatch(resetStateAction());
  }

  requestServer = () => {
    this.props.dispatch(getCurrentIpAction());
  }

  render() {
    return (
      <div className="PageOneContainer">
        {this.props.ip}
        <button onClick={() => { this.requestServer() }}>发起请求</button>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  ip: makeIp(),
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(PageOne);