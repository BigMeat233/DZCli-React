import React from 'react';
import './styles.scss';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { makeMethod } from './selectors';
import { resetStateAction, getCurrentMethodAction } from './actions';

class PageTwo extends React.Component {
  componentDidMount() {
    this.props.dispatch(resetStateAction());
  }

  requestServer = () => {
    this.props.dispatch(getCurrentMethodAction());

  }

  render() {
    return (
      <div className="PageTwoContainer">
        {this.props.method}
        <button onClick={() => { this.requestServer() }}>发起请求</button>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  method: makeMethod(),
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(PageTwo);