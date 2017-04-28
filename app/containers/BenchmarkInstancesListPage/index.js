/*
 *
 * BenchmarkInstancesListPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Helmet from 'react-helmet';
import v4 from 'uuid';
import { createStructuredSelector } from 'reselect';
import BenchmarkInstancesList from 'components/BenchmarkInstancesList';
import { makeSelectInstancesByLabels, makeSelectError, makeSelectLoading } from 'containers/BenchmarksPage/selectors';
import commonMessages from 'messages';
import { loadInstancesAction, removeInstanceAction, updateInstanceAction, createInstanceAction } from './actions';

const labelsWrapper = [{}];

function newInstance(name, config) {
  return {
    apiVersion: 'benchmark.fission.io/v1',
    kind: 'Instance',
    metadata: {
      labels: {
        config,
      },
      name,
      namespace: 'fission-benchmark',
    },
    spec: {
      status: 'create-request',
    },
  };
}

export class BenchmarkInstancesListPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.onRemove = this.onRemove.bind(this);
    this.onRun = this.onRun.bind(this);
    this.onStop = this.onStop.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    const { configName } = this.props.params;
    if (configName) {
      labelsWrapper[0] = { config: configName };
    }
    this.props.loadBenchmarkInstancesData();
  }

  onRemove(instance) {
    this.props.removeBenchmarkInstance(instance);
  }

  onRun(instance) {
    if (instance.spec.status === 'created') {
      this.props.runBenchmarkInstance(instance);
    }
  }

  onStop(instance) {
    if (instance.spec.status === 'running') {
      this.props.stopBenchmarkInstance(instance);
    }
  }

  onCreate() {
    const { configName } = this.props.params;
    const instance = newInstance(v4(), configName);
    this.props.createBenchmarkInstance(instance);
  }

  onRefresh() {
    this.props.loadBenchmarkInstancesData();
  }

  render() {
    const { loading, error, items } = this.props;
    const { configName } = this.props.params;
    const itemsListProps = {
      loading,
      error,
      items,
    };
    return (
      <div>
        <Helmet
          title={`Instances of ${configName}`}
        />
        <h2>{`Instances of ${configName}`}</h2>
        <a onClick={this.onCreate} className="pull-right btn btn-primary"><FormattedMessage {...commonMessages.add} /></a>
        <a onClick={this.onRefresh} className="pull-right btn btn-info"><FormattedMessage {...commonMessages.refresh} /></a>
        <BenchmarkInstancesList {...itemsListProps} onRemove={this.onRemove} onRun={this.onRun} onStop={this.onStop} />
      </div>
    );
  }
}

BenchmarkInstancesListPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  items: PropTypes.array,
  params: PropTypes.object,
  loadBenchmarkInstancesData: PropTypes.func,
  removeBenchmarkInstance: PropTypes.func,
  runBenchmarkInstance: PropTypes.func,
  stopBenchmarkInstance: PropTypes.func,
  createBenchmarkInstance: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
  items: makeSelectInstancesByLabels(labelsWrapper),
});

function mapDispatchToProps(dispatch) {
  return {
    loadBenchmarkInstancesData: () => dispatch(loadInstancesAction()),
    removeBenchmarkInstance: (instance) => dispatch(removeInstanceAction(instance)),
    runBenchmarkInstance: (instance) => dispatch(updateInstanceAction(instance, 'running-request')),
    stopBenchmarkInstance: (instance) => dispatch(updateInstanceAction(instance, 'stop-request')),
    createBenchmarkInstance: (instance) => dispatch(createInstanceAction(instance)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BenchmarkInstancesListPage);
