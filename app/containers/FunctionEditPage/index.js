/*
 *
 * FunctionEditPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import FunctionForm from 'components/FunctionForm';
import LoadingIndicator from 'components/LoadingIndicator';
import { makeSelectLoading, makeSelectFunctionByName } from 'containers/FunctionsPage/selectors';
import { makeSelectEnvironments } from 'containers/EnvironmentsPage/selectors';
import { loadEnvironmentAction } from 'containers/EnvironmentsListPage/actions';
import { getFunctionAction } from 'containers/FunctionEditPage/actions';

export class FunctionEditPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      loading: props.loading,
      environments: props.environments,
    };
    if (typeof this.state.environments === 'object' && Array.isArray(this.state.environments) === false) { // Convert environments to array if it's a Immutable List
      this.state.environments = this.state.environments.toArray();
    }
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    if (this.state.environments.length === 0) {
      this.props.loadEnvironmentData();
    }
    this.props.loadFunctionData(this.props.params.name);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading !== this.state.loading) {
      this.state.loading = nextProps.loading;
    }
    if (nextProps.environments.length !== this.state.environments.length) {
      this.state.environments = nextProps.environments;
    }
    console.log(nextProps);
    if (!this.state.item && nextProps.loading === false) {
      console.log("ff");
      this.state.item = nextProps.functionByName(nextProps.params.name);
    }

  }

  onChange(event) {
    console.log(event);
    console.log('update state');
  }

  onSave() {
    console.log('onSave');
  }

  render() {
    console.log(this.state);
    const { item, environments, loading } = this.state;
    if (loading || item === undefined ) {
      return <LoadingIndicator />;
    }
    return (
      <div>
        <Helmet
          title="Create function"
        />

        <FunctionForm environments={environments} onChange={this.onChange} item={item}/>

        <div className="pull-right">
          <a className="btn btn-primary" onClick={this.onSave}>Save & exit</a> { ' ' }
          <Link to="/" className="btn btn-default">Cancel</Link>
        </div>
      </div>
    );
  }
}
FunctionEditPage.propTypes = {
  environments: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  loading: PropTypes.bool,
  functionByName: PropTypes.func.isRequired,
  loadEnvironmentData: PropTypes.func.isRequired,
  loadFunctionData: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  functionByName: makeSelectFunctionByName(),
  environments: makeSelectEnvironments(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadEnvironmentData: () => dispatch(loadEnvironmentAction()),
    loadFunctionData: (name) => dispatch(getFunctionAction(name)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FunctionEditPage);
