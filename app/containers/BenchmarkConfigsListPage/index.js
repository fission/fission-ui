/*
 *
 * BenchmarkConfigsListPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import BenchmarkConfigsList from 'components/BenchmarkConfigsList';
import { makeSelectConfigs, makeSelectError, makeSelectLoading } from 'containers/BenchmarksPage/selectors';
import commonMessages from 'messages';
import { loadConfigsAction, removeConfigAction, createConfigAction } from './actions';

export class BenchmarkConfigsListPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      newConfigName: '',
    };
    this.onRemove = this.onRemove.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }

  componentDidMount() {
    this.props.loadBenchmarkConfigsData();
  }

  onRemove(config) {
    this.props.removeBenchmarkConfig(config);
  }

  onChange(event) {
    const target = event.target;
    this.state[target.name] = target.value;
  }

  onCreate() {
    const { newConfigName } = this.state;
    this.props.createBenchmarkConfig({
      apiVersion: 'benchmark.fission.io/v1',
      kind: 'Config',
      metadata: {
        name: newConfigName,
        namespace: 'fission-benchmark',
      },
      spec: {
        functions: [],
        pairs: [],
        workloads: [],
      },
    });
  }

  render() {
    const { loading, error, items } = this.props;
    const itemsListProps = {
      loading,
      error,
      items,
    };
    return (
      <div>
        <Helmet
          title="Configs"
        />
        <h2>Configs</h2>
        <form className="form-inline">
          <div className="pull-right form-group">
            <label htmlFor="configCreateName"><FormattedMessage {...commonMessages.name} /></label>
            <input type="text" className="form-control" id="configCreateName" name="newConfigName" onChange={this.onChange} />
            <a onClick={this.onCreate} className="btn btn-primary">
              <FormattedMessage {...commonMessages.add} />
            </a>
          </div>
        </form>
        <BenchmarkConfigsList {...itemsListProps} onRemove={this.onRemove} />
      </div>
    );
  }
}

BenchmarkConfigsListPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  items: PropTypes.array,
  loadBenchmarkConfigsData: PropTypes.func,
  removeBenchmarkConfig: PropTypes.func,
  createBenchmarkConfig: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  items: makeSelectConfigs(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadBenchmarkConfigsData: () => dispatch(loadConfigsAction()),
    removeBenchmarkConfig: (config) => dispatch(removeConfigAction(config)),
    createBenchmarkConfig: (config) => dispatch(createConfigAction(config)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BenchmarkConfigsListPage);
