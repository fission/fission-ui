import { createSelector } from 'reselect';
/**
 * Direct selector to the BenchmarksPage state domain
 */
const selectBenchmarksPageDomain = () => (state) => state.get('benchmarks');

const makeSelectConfigByName = (nameWrapper) => createSelector(
  selectBenchmarksPageDomain(),
  (substate) => {
    const name = nameWrapper[0];
    const config = substate.get('configs').find((c) => c.getIn(['metadata', 'name']) === name);
    if (config === undefined) {
      return undefined;
    }
    return config.toJS();
  }
);

const makeSelectInstanceByName = (nameWrapper) => createSelector(
  selectBenchmarksPageDomain(),
  (substate) => {
    const name = nameWrapper[0];
    const ins = substate.get('instances').find((instances) => instances.getIn(['metadata', 'name']) === name);
    if (ins === undefined) {
      return undefined;
    }
    return ins.toJS();
  }
);

const makeSelectLoading = () => createSelector(
  selectBenchmarksPageDomain(),
  (substate) => substate.get('loading')
);

const makeSelectError = () => createSelector(
  selectBenchmarksPageDomain(),
  (substate) => substate.get('error')
);

const makeSelectConfigs = () => createSelector(
  selectBenchmarksPageDomain(),
  (substate) => substate.get('configs').toJS(),
);

const makeSelectInstances = () => createSelector(
  selectBenchmarksPageDomain(),
  (substate) => substate.get('instances').toJS(),
);

const makeSelectInstancesByLabels = (labelsWrapper) => createSelector(
  selectBenchmarksPageDomain(),
  (substate) => {
    const labels = labelsWrapper[0];
    return substate.get('instances').filter((instance) => {
      const insLabels = instance.getIn(['metadata', 'labels']);
      return Object.keys(labels).map((k) => insLabels.get(k) === labels[k]).reduce((a, b) => a && b);
    }).toJS();
  }
);

export {
  makeSelectConfigs,
  makeSelectError,
  makeSelectLoading,
  makeSelectConfigByName,
  makeSelectInstances,
  makeSelectInstanceByName,
  makeSelectInstancesByLabels,
};
