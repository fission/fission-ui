import { createSelector } from 'reselect';

/**
 * Direct selector to the environmentEditPage state domain
 */
const selectFunctionsPageDomain = () => (state) => state.get('functions');
const selectEnvironmentsPageDomain = () => (state) => state.get('environments');


const makeSelectLoading = () => createSelector(
  selectFunctionsPageDomain(),
  selectEnvironmentsPageDomain(),
  (substate, substateEnv) => substate.get('triggerHttpLoading') || substate.get('functionLoading') || substateEnv.get('loading')
);

const makeSelectError = () => createSelector(
  selectFunctionsPageDomain(),
  (substate) => substate.get('error')
);

const makeSelectFunctions = () => createSelector(
  selectFunctionsPageDomain(),
  (substate) => substate.get('functions').map((e) => ({
    name: e.metadata.name,
    environment: e.environment.name,
    triggersHttp: substate.get('triggersHttp').filter((trigger) => trigger.function.name === e.metadata.name) || [], // TODO improve, simplify object
  }))
);


export {
  makeSelectFunctions,
  makeSelectError,
  makeSelectLoading,
};
