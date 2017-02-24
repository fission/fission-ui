import { createSelector } from 'reselect';

/**
 * Direct selector to the environmentCreatePage state domain
 */
const selectEnvironmentCreatePageDomain = () => (state) => state.get('environments');

/**
 * Other specific selectors
 */


/**
 * Default selector used by EnvironmentCreatePage
 */

const makeSelectEnvironmentCreatePage = () => createSelector(
  selectEnvironmentCreatePageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectEnvironmentCreatePage;
export {
  selectEnvironmentCreatePageDomain,
};
