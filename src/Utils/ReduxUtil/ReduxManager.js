import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import { combineReducers } from 'redux-immutable';
import { compose, createStore, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router/immutable';

class ReduxManager {
  constructor(history, initialState = fromJS({}), globalReducer) {
    // 默认的全局reducer
    globalReducer = globalReducer || ((state = this._initialState) => state);
    this._history = history;
    this._initialState = initialState;
    this._globalReducer = globalReducer;
    this._sagaMiddleware = createSagaMiddleware();
  }

  createStore = () => {
    const {
      // 基础属性
      _history: history,
      _initialState: initialState,
      _sagaMiddleware: sagaMiddleware,
      // 快捷调用方法
      getRootReducer,
      _getMiddlewares: getMiddlewares,
    } = this;

    // 1. 构建中间件(saga联动, router联动)
    const middlewareList = [sagaMiddleware, routerMiddleware(history)];

    // 2. 构建store
    const store = createStore(
      getRootReducer({}),
      initialState,
      getMiddlewares(middlewareList)
    );

    return store;
  }

  getRootReducer = (asyncReducersMap) => {
    const {
      _history: history,
      _globalReducer: globalReducer,
    } = this;

    return combineReducers({
      global: globalReducer,
      router: connectRouter(history),
      ...asyncReducersMap,
    });
  }

  getSagaMiddleware = () => {
    return this._sagaMiddleware;
  }

  _getMiddlewares = (middlewareList) => {
    const composeWithDevTools = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
    return composeWithDevTools(
      applyMiddleware(...middlewareList)
    );
  }
}

export default ReduxManager;