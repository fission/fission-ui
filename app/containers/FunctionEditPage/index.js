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
import ErrorIndicator from 'components/ErrorIndicator';
import { makeSelectLoading, makeSelectFunctionByName, makeSelectTriggersHttp, makeSelectError } from 'containers/FunctionsPage/selectors';
import { makeSelectEnvironments } from 'containers/EnvironmentsPage/selectors';
import { loadEnvironmentAction } from 'containers/EnvironmentsListPage/actions';
import { getFunctionAction, loadTriggersHttpAction, deleteTriggerHttpAction, updateFunctionAction, createTriggerHttpAction } from 'containers/FunctionEditPage/actions';

export class FunctionEditPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      loading: props.loading,
      error: props.error,
      environments: props.environments,
      httpTriggers: props.httpTriggers,
      activeTab: 'function'
    };
    if (typeof this.state.environments === 'object' && Array.isArray(this.state.environments) === false) { // Convert environments to array if it's a Immutable List
      this.state.environments = this.state.environments.toArray();
    }
    if (typeof this.state.httpTriggers === 'object' && Array.isArray(this.state.httpTriggers) === false) { // Convert environments to array if it's a Immutable List
      this.state.httpTriggers = this.state.httpTriggers.toArray();
    }
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onHttpTriggerRemove = this.onHttpTriggerRemove.bind(this);
    this.onHttpTriggerCreate = this.onHttpTriggerCreate.bind(this);
    this.onCodeChange = this.onCodeChange.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
  }

  componentDidMount() {
    if (this.state.environments.length === 0) {
      this.props.loadEnvironmentData();
    }
    if (this.state.httpTriggers.length === 0) {
      this.props.loadTriggersHttpData();
    }
    this.props.loadFunctionData(this.props.params.name);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading !== this.state.loading) {
      this.state.loading = nextProps.loading;
    }
    if (nextProps.error !== this.state.error) {
      this.state.error = nextProps.error;
    }
    if (nextProps.httpTriggers.length !== this.state.httpTriggers.length) {
      this.state.httpTriggers = nextProps.httpTriggers;
    }
    if (nextProps.environments.length !== this.state.environments.length) {
      this.state.environments = nextProps.environments;
    }
    // TODO this may cause user modified code lost in the editor buffer
    this.state.item = nextProps.functionByName(nextProps.params.name);
  }


  onChange(event) {
    const { item } = this.state;
    item[event.target.name] = event.target.value;
  }

  onCodeChange(newValue) {
    const { item } = this.state;
    item.code = newValue;
  }

  onHttpTriggerRemove(item) {
    this.props.deleteTriggerHttp(item);
  }

  onHttpTriggerCreate(trigger) {
    const { item } = this.state;
    this.props.createTriggerHttp({
      method: trigger.method,
      urlpattern: trigger.urlpattern,
      function: item.name,
    });
  }

  onTabChange(newTabName) {
    this.setState({ activeTab: newTabName });
  }

  onSave(event) {
    event.preventDefault();
    const { item } = this.state;
    this.props.updateFunction(item);
  }

  render() {
    const { item, environments, loading, error, activeTab } = this.state;
    if (loading || item === undefined) {
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

        <FunctionForm
          environments={environments} onChange={this.onChange} item={item}
          onHttpTriggerRemove={this.onHttpTriggerRemove}
          onHttpTriggerCreate={this.onHttpTriggerCreate}
          nameEditable={Boolean(false)} onCodeChange={this.onCodeChange}
          activeTab={activeTab}
          onTabChange={this.onTabChange}
        />

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
  httpTriggers: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  functionByName: PropTypes.func.isRequired,
  loadEnvironmentData: PropTypes.func.isRequired,
  loadFunctionData: PropTypes.func.isRequired,
  loadTriggersHttpData: PropTypes.func.isRequired,
  deleteTriggerHttp: PropTypes.func.isRequired,
  updateFunction: PropTypes.func.isRequired,
  createTriggerHttp: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  functionByName: makeSelectFunctionByName(),
  environments: makeSelectEnvironments(),
  httpTriggers: makeSelectTriggersHttp(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadEnvironmentData: () => dispatch(loadEnvironmentAction()),
    loadTriggersHttpData: () => dispatch(loadTriggersHttpAction()),
    loadFunctionData: (name) => dispatch(getFunctionAction(name)),
    deleteTriggerHttp: (trigger) => dispatch(deleteTriggerHttpAction(trigger)),
    updateFunction: (fn) => dispatch(updateFunctionAction(fn)),
    createTriggerHttp: (trigger) => dispatch(createTriggerHttpAction(trigger)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FunctionEditPage);
