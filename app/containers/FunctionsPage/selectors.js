import { createSelector } from 'reselect';
import { decodeBase64 } from 'utils/util';
/**
 * Direct selector to the FunctionsPage state domain
 */
const selectFunctionsPageDomain = () => (state) => state.get('functions');
const selectEnvironmentsPageDomain = () => (state) => state.get('environments');

const makeSelectFunctionByName = () => createSelector(
  selectFunctionsPageDomain(),
  (substate) => (functionName) => {
    const functionFound = substate.get('functions').find((func) => func.metadata.name === functionName);
    if (functionFound) {
      return ({
        name: functionFound.metadata.name,
        environment: functionFound.environment.name,
        code: decodeBase64(functionFound.code),
        triggersHttp: substate.get('triggersHttp').filter((trigger) => trigger.function.name === functionFound.metadata.name) || [],
      });
    }
    return false;
  }
);

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
  makeSelectFunctionByName,
};
