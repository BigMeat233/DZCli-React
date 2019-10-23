import { createSelector } from 'reselect';

const namespace = 'PageTwo';
const makeRootSubstate = () => (state) => state.get(namespace);

export const makeMethod = () => createSelector(
  makeRootSubstate(),
  (substate) => substate.get('method'),
);