import { createSelector } from 'reselect';
// 指定namespace需要与构建组件时的namespace相同
const namespace = 'PageOne';

// 从redux获取namespace的value
const makeRootSubstate = () => (state) => state.get(namespace);

export const makeIp = () => createSelector(
  makeRootSubstate(),
  (substate) => substate.get('ip'),
);