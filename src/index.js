import React from 'react';
import ReactDOM from 'react-dom';
// Router相关
import routes from 'Containers/routes';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { renderRoutes } from 'react-router-config';
import { ConnectedRouter } from 'connected-react-router/immutable';
// Redux相关
import { Provider } from 'react-redux';
import ReduxUtil from 'Utils/ReduxUtil';

const history = createBrowserHistory();
const store = ReduxUtil.createStore(history);

const createRootComponent = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Router history={history}>
          {renderRoutes(routes)}
        </Router>
      </ConnectedRouter>
    </Provider>
  );
};

ReactDOM.render(createRootComponent(), document.getElementById('root'));
