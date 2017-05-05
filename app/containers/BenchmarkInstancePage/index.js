/* eslint-disable react/sort-comp */
/*
 *
 * BenchmarkInstancesListPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import LoadingIndicator from 'components/LoadingIndicator';
import ErrorIndicator from 'components/ErrorIndicator';
import BenchmarkReportOverview from 'components/BenchmarkReportOverview';
import BenchmarkReportDetails from 'components/BenchmarkReportDetails';
import commonMessages from 'messages';
import { makeSelectInstanceByName, makeSelectError, makeSelectLoading, makeSelectConfigByName } from 'containers/BenchmarksPage/selectors';
import { getInstanceAction, getConfigAction } from './actions';

const instanceNameWrapper = [''];
const configNameWrapper = [''];

function blankInstanceSpec() {
  return {};
}

export class BenchmarkInstancePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  timerId = undefined;

  constructor() {
    super();
    this.state = {
      interval: 5,
      intervalCheck: false,
      rawReportCheck: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onCheckChange = this.onCheckChange.bind(this);
  }

  componentDidMount() {
    const { instanceName, configName } = this.props.params;
    if (instanceName === undefined) {
      return;
    }
    instanceNameWrapper[0] = instanceName;
    configNameWrapper[0] = configName;
    this.props.loadBenchmarkInstanceData(instanceName);
    this.props.loadBenchmarkConfigData(configName);
  }

  onChange(event) {
    const target = event.target;
    this.state[target.name] = target.value;
    this.setState(this.state);
  }

  onCheckChange(event) {
    const target = event.target;
    this.state[target.name] = target.checked;
    this.setState(this.state);

    const { interval, intervalCheck } = this.state;
    const that = this;
    if (intervalCheck) {
      this.componentDidMount();
      this.timerId = setInterval(() => {
        that.componentDidMount();
      }, 1000 * parseInt(interval, 10));
    } else {
      clearInterval(this.timerId);
      this.timerId = undefined;
    }
  }

  render() {
    const { loading, error, instance, config } = this.props;
    const { interval, intervalCheck, rawReportCheck } = this.state;
    if ((instance === undefined || config === undefined || loading) && this.timerId === undefined) {
      return <LoadingIndicator />;
    }
    if (error !== false) {
      return <ErrorIndicator errors={[error.response.data]} />;
    }
    const spec = Object.assign(blankInstanceSpec(), instance.spec);
    return (
      <div>
        <Helmet
          title="Instance Report"
        />
        <h2>Instance Report</h2>
        <form className="form-inline">
          <div className="form-group">
            <input type="checkbox" className="form-control" id="refreshIntervalCheck" name="intervalCheck" checked={intervalCheck} onChange={this.onCheckChange} />
            <label htmlFor="refreshInterval">
              <FormattedMessage {...commonMessages.refresh} />
              { ' ' }
              <FormattedMessage {...commonMessages.interval} />
              { ' : ' }
            </label>
            <input type="text" className="form-control" id="refreshInterval" name="interval" value={interval} onChange={this.onChange} />
            <FormattedMessage {...commonMessages.second} />
          </div>
          <div className="form-group pull-right">
            <input type="checkbox" className="form-control" id="rawReportCheck" name="rawReportCheck" checked={rawReportCheck} onChange={this.onCheckChange} />
            <label htmlFor="rawReportCheck">
              <FormattedMessage {...commonMessages.copyReport} />
            </label>
          </div>
        </form>
        {
          rawReportCheck &&
          <pre>{JSON.stringify(spec, null, 2)}</pre>
        }
        <h3><FormattedMessage {...commonMessages.overview} /></h3>
        {
          instance.spec.reports && <BenchmarkReportOverview instance={instance} />
        }

        <h3><FormattedMessage {...commonMessages.report} /></h3>
        {
          instance.spec.reports && config.spec.pairs.map((item, index) => (
            <BenchmarkReportDetails
              key={`detail-${index}`}
              func={this.fetchByName(config.spec.functions, item.function)}
              workload={this.fetchByName(config.spec.workloads, item.workload)}
              reports={instance.spec.reports[index]}
            />
          ))
        }
      </div>
    );
  }

  fetchByName(array, name) {
    const results = array.filter((item) => item.name === name);
    if (results.length === 0) {
      return null;
    }
    return results[0];
  }
}

BenchmarkInstancePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  instance: PropTypes.object,
  config: PropTypes.object,
  params: PropTypes.object,
  loadBenchmarkInstanceData: PropTypes.func,
  loadBenchmarkConfigData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  instance: makeSelectInstanceByName(instanceNameWrapper),
  config: makeSelectConfigByName(configNameWrapper),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadBenchmarkInstanceData: (name) => dispatch(getInstanceAction(name)),
    loadBenchmarkConfigData: (name) => dispatch(getConfigAction(name)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BenchmarkInstancePage);
