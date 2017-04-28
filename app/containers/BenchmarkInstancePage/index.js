/*
 *
 * BenchmarkInstancesListPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import LoadingIndicator from 'components/LoadingIndicator';
import ErrorIndicator from 'components/ErrorIndicator';
import { makeSelectInstanceByName, makeSelectError, makeSelectLoading } from 'containers/BenchmarksPage/selectors';
import { getInstanceAction } from './actions';

const nameWrapper = [''];

function blankInstanceSpec() {
  return {};
}

export class BenchmarkInstancePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { instanceName } = this.props.params;
    if (instanceName === undefined) {
      return;
    }
    nameWrapper[0] = instanceName;
    this.props.loadBenchmarkInstanceData(instanceName);
  }

  render() {
    const { loading, error, instance } = this.props;
    if (instance === undefined || loading) {
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
        <pre>
          {JSON.stringify(spec, null, 2)}
        </pre>
      </div>
    );
  }
}

BenchmarkInstancePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  instance: PropTypes.object,
  params: PropTypes.object,
  loadBenchmarkInstanceData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  instance: makeSelectInstanceByName(nameWrapper),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadBenchmarkInstanceData: (name) => dispatch(getInstanceAction(name)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BenchmarkInstancePage);
