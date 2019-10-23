import React from 'react';
import ReduxUtil from '../ReduxUtil';

/**
 * 异步引入组件并且自动inject资源
 * @param {string} namespace 
 * @param {object} asyncImportMap 
 */
export function asyncImportComponentAndInjectResource(namespace, asyncImportMap) {
  const {
    component: componentImport,
    reducer: reducerImport,
    sagas: sagasImport
  } = asyncImportMap;

  return Promise
    .all([componentImport, reducerImport, sagasImport])
    .then(([component, reducer, sagas]) => {
      ReduxUtil.injectReducer(namespace, reducer.default);
      ReduxUtil.injectSagas(sagas.default);
      return component.default;
    });
}

/**
 * 构建组件
 * @param {function:promise} asyncBuildProcedure 组件构建过程
 */
export function buildComponent(asyncBuildProcedure) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const component = await asyncBuildProcedure();
      this.setState({ component });
    }

    render() {
      const { component: Component } = this.state;
      if (Component) {
        return <Component {...this.props} />
      } else {
        return null;
      }
    }
  }
}
