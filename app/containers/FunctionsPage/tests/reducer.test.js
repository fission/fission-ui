
import { fromJS } from 'immutable';
import functionsPageReducer from '../reducer';

describe('functionsPageReducer', () => {
  it('returns the initial state', () => {
    expect(functionsPageReducer(undefined, {})).toEqual(fromJS(({ functions: [], triggersHttp: [], kubeWatchers: [], functionLoading: false, triggerHttpLoading: false, kubeWatcherLoading: false, functionTest: { loading: false, response: {} }, error: false })));
  });
});
