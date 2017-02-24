
import { fromJS } from 'immutable';
import environmentsPageReducer from '../reducer';

describe('environmentsPageReducer', () => {
  it('returns the initial state', () => {
    expect(environmentsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
