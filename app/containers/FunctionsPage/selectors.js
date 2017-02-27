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
    const functionFound = substate.get('functions').find((func) => func.getIn(['metadata', 'name']) === functionName);
    if (functionFound) {
      return ({
        name: functionFound.getIn(['metadata', 'name']),
        environment: functionFound.getIn(['environment', 'name']),
        code: decodeBase64(functionFound.get('code')),
        triggersHttp: substate.get('triggersHttp').filter((trigger) => trigger.getIn(['function', 'name']) === functionFound.getIn(['metadata', 'name'])).toJS(),
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
    name: e.getIn(['metadata', 'name']),
    environment: e.getIn(['environment', 'name']),
    triggersHttp: (substate.get('triggersHttp').filter((trigger) => trigger.getIn(['function', 'name']) === e.getIn(['metadata', 'name']))).toJS(), // TODO improve, simplify object
  }))
);


export {
  makeSelectFunctions,
  makeSelectError,
  makeSelectLoading,
  makeSelectFunctionByName,
};
