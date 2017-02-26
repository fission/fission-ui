import { createSelector } from 'reselect';

/**
 * Direct selector to the environmentEditPage state domain
 */
const selectEnvironmentsPageDomain = () => (state) => state.get('environments');


const makeSelectEnvironmentByName = () => createSelector(
  selectEnvironmentsPageDomain(),
  (substate) => (environmentName) => {
    const environementFound = substate.get('environments').find((environement) => environement.metadata.name === environmentName);
    if (environementFound) {
      return ({ name: environementFound.metadata.name, image: environementFound.runContainerImageUrl });
    }
    return false;
  }
);

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
  makeSelectEnvironmentByName,
  makeSelectEnvironments,
  makeSelectError,
  makeSelectLoading,
};
