/*
 *
 * FunctionCreatePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import v4 from 'uuid';
import FunctionTabForm from 'components/FunctionTabForm';
import LoadingIndicator from 'components/LoadingIndicator';
import ErrorIndicator from 'components/ErrorIndicator';
import { makeSelectLoading, makeSelectError, makeSelectFunctionTest } from 'containers/FunctionsPage/selectors';
import { makeSelectEnvironments } from 'containers/EnvironmentsPage/selectors';
import { loadEnvironmentAction } from 'containers/EnvironmentsListPage/actions';
import { createFunctionAction, testFunctionAction, cleanTestFunctionAction } from 'containers/FunctionCreatePage/actions';

export class FunctionCreatePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      loading: props.loading,
      functionTest: props.functionTest,
      error: props.error,
      currentTab: 'function',
      item: { name: '', environment: '', triggersHttp: [], kubeWatchers: [], code: '', temporaryFunction: '' },
      environments: props.environments,
    };
    if (typeof this.state.environments === 'object' && Array.isArray(this.state.environments) === false) { // Convert environments to array if it's a Immutable List
      this.state.environments = this.state.environments.toArray();
    }

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onCodeChange = this.onCodeChange.bind(this);
    this.onFunctionTest = this.onFunctionTest.bind(this);
  }

  componentDidMount() {
    if (this.state.environments.length === 0) {
      this.props.loadEnvironmentData();
    }
    this.props.cleanTestFunction();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading !== this.state.loading) {
      this.state.loading = nextProps.loading;
    }
    if (nextProps.functionTest !== this.state.functionTest) {
      this.state.functionTest = nextProps.functionTest;
    }
    if (nextProps.environments.length !== this.state.environments.length) {
      this.state.environments = nextProps.environments;
    }
  }

  onChange(event) {
    const obj = Object.assign({}, this.state.item);
    obj[event.target.name] = event.target.value;

    this.setState({ item: obj });
  }

  onCodeChange(newValue) {
    const obj = Object.assign({}, this.state.item);
    obj.code = newValue;

    this.setState({ item: obj });
  }

  onSave() {
    const { item } = this.state;
    this.props.createFunction(item);
  }

  onFunctionTest(event) {
    event.preventDefault();
    const obj = Object.assign({}, this.state.item);
    obj.name = `ui-${v4()}`;
    obj.test = { header: {}, query: '', payload: {}, method: 'GET' };

    this.props.testFunction(obj);
  }

  render() {
    const { item, environments, loading, error, functionTest } = this.state;
    if (loading) {
      return <LoadingIndicator />;
    }
    return (
      <div>
        <Helmet
          title="Create function"
        />

        {error &&
          <ErrorIndicator error={error} />
        }

        <FunctionTabForm
          item={item}
          environments={environments}
          onChange={this.onChange}
          metadataEditable={Boolean(true)}
          onCodeChange={this.onCodeChange}
          onFunctionTest={this.onFunctionTest}
          functionTest={functionTest}
        />

        <div className="pull-right">
          <a className="btn btn-primary" onClick={this.onSave}>Save & exit</a> { ' ' }
          <Link to="/" className="btn btn-default">Cancel</Link>
        </div>
      </div>
    );
  }
}

FunctionCreatePage.propTypes = {
  environments: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  loadEnvironmentData: PropTypes.func.isRequired,
  createFunction: PropTypes.func.isRequired,
  testFunction: PropTypes.func.isRequired,
  cleanTestFunction: PropTypes.func.isRequired,
  functionTest: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  environments: makeSelectEnvironments(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  functionTest: makeSelectFunctionTest(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadEnvironmentData: () => dispatch(loadEnvironmentAction()),
    createFunction: (fn) => dispatch(createFunctionAction(fn)),
    testFunction: (fn) => dispatch(testFunctionAction(fn)),
    cleanTestFunction: () => dispatch(cleanTestFunctionAction()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FunctionCreatePage);
