import ReduxManager from './ReduxManager';

class ReduxStore {
  constructor() {
    this._store = null;
    this.reduxManager = null;
    this._asyncReducersMap = {};
  }

  createStore(history) {
    this.reduxManager = new ReduxManager(history);
    this._store = this.reduxManager.createStore();
    return this._store;
  }

  injectReducer = (namespace, reducer) => {
    const {
      _store: store,
      _asyncReducersMap: asyncReducersMap,
    } = this;

    // 当未能成功创建store || reducer的namespace冲突时直接退出
    if (!store || asyncReducersMap[namespace]) {
      return false;
    }

    // cache加入的namespace和reducer并替换根reducer
    asyncReducersMap[namespace] = reducer;
    store.replaceReducer(this.reduxManager.getRootReducer(asyncReducersMap));
    return true;
  }

  injectSagas = (sagas) => {
    if (sagas instanceof Array) {
      const sagaMiddleware = this.reduxManager.getSagaMiddleware();
      sagas.forEach((saga) => {
        sagaMiddleware.run(saga);
      });
      return true;
    } else {
      return false;
    }
  }
}

const singleton = new ReduxStore();
export default singleton;