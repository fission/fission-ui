import { createSelector } from 'reselect';

/**
 * Direct selector to the environmentsPage state domain
 */
const selectEnvironmentsPageDomain = () => (state) => state.get('environments');

/**
 * Other specific selectors
 */


/**
 * Default selector used by EnvironmentsPage
 */
const makeSelectLoading = () => createSelector(
  selectEnvironmentsPageDomain(),
  (substate) => substate.get('loading')
);

const makeSelectError = () => createSelector(
  selectEnvironmentsPageDomain(),
  (substate) => substate.get('error')
);

const makeSelectEnvironments = () => createSelector(
  selectEnvironmentsPageDomain(),
  (substate) => substate.get('environments').map((e) => ({ name: e.metadata.name, image: e.runContainerImageUrl }))
);

export {
  makeSelectEnvironments,
  makeSelectError,
  makeSelectLoading,
};
