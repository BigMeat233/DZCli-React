
import React from 'react';
import App from './App';
import { Redirect } from 'react-router-dom';
import {
  buildComponent,
  asyncImportComponentAndInjectResource
} from 'Utils/ComponentUtil';

const routes = [
  // 如果匹配到'/'则重定向到'/App'
  {
    path: '/',
    exact: true,
    render() {
      return (<Redirect exact from="/" to="/App" />);
    },
  }, {
    path: '/App',
    component: App,
    routes: [
      {
        path: '/App/PageOne',
        component: buildComponent(() => asyncImportComponentAndInjectResource('PageOne', {
          component: import('./PageOne'),
          reducer: import('./PageOne/reducer'),
          sagas: import('./PageOne/sagas'),
        }))
      }, {
        path: '/App/PageTwo',
        component: buildComponent(() => asyncImportComponentAndInjectResource('PageTwo', {
          component: import('./PageTwo'),
          reducer: import('./PageTwo/reducer'),
          sagas: import('./PageTwo/sagas'),
        }))
      },
    ]
  }
];

export default routes;