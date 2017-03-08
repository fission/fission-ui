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
import v4 from 'uuid';
import FunctionForm from 'components/FunctionForm';
import LoadingIndicator from 'components/LoadingIndicator';
import ErrorIndicator from 'components/ErrorIndicator';
import { makeSelectLoading, makeSelectFunctionByName, makeSelectTriggersHttp, makeSelectError, makeSelectFunctionTest, makeSelectKubeWatchers } from 'containers/FunctionsPage/selectors';
import { makeSelectEnvironments } from 'containers/EnvironmentsPage/selectors';
import { loadEnvironmentAction } from 'containers/EnvironmentsListPage/actions';
import { testFunctionAction, cleanTestFunctionAction } from 'containers/FunctionCreatePage/actions';
import { getFunctionAction, loadTriggersHttpAction, deleteTriggerHttpAction, updateFunctionAction, createTriggerHttpAction, loadKubeWatchersAction, createKubeWatcherAction, deleteKubeWatcherAction } from 'containers/FunctionEditPage/actions';

export class FunctionEditPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      loading: props.loading,
      functionTest: props.functionTest,
      error: props.error,
      environments: props.environments,
      httpTriggers: props.httpTriggers,
      kubeWatchers: props.kubeWatchers,
      activeTab: 'function',
      editing: false,
    };
    if (typeof this.state.environments === 'object' && Array.isArray(this.state.environments) === false) { // Convert environments to array if it's a Immutable List
      this.state.environments = this.state.environments.toArray();
    }
    if (typeof this.state.httpTriggers === 'object' && Array.isArray(this.state.httpTriggers) === false) { // Convert httpTriggers to array if it's a Immutable List
      this.state.httpTriggers = this.state.httpTriggers.toArray();
    }
    if (typeof this.state.kubeWatchers === 'object' && Array.isArray(this.state.kubeWatchers) === false) { // Convert kubeWatchers to array if it's a Immutable List
      this.state.kubeWatchers = this.state.kubeWatchers.toArray();
    }
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onHttpTriggerRemove = this.onHttpTriggerRemove.bind(this);
    this.onHttpTriggerCreate = this.onHttpTriggerCreate.bind(this);
    this.onKubeWatcherRemove = this.onKubeWatcherRemove.bind(this);
    this.onKubeWatcherCreate = this.onKubeWatcherCreate.bind(this);
    this.onCodeChange = this.onCodeChange.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
    this.onFunctionTest = this.onFunctionTest.bind(this);
  }

  componentDidMount() {
    if (this.state.environments.length === 0) {
      this.props.loadEnvironmentData();
    }
    if (this.state.httpTriggers.length === 0) {
      this.props.loadTriggersHttpData();
    }
    if (this.state.kubeWatchers.length === 0) {
      this.props.loadKubeWatchersData();
    }
    this.props.loadFunctionData(this.props.params.name);
    this.props.cleanTestFunction();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading !== this.state.loading) {
      this.state.loading = nextProps.loading;
    }
    if (nextProps.functionTest !== this.state.functionTest) {
      this.state.functionTest = nextProps.functionTest;
    }
    if (nextProps.error !== this.state.error) {
      this.state.error = nextProps.error;
    }
    if (nextProps.httpTriggers.length !== this.state.httpTriggers.length) {
      this.state.httpTriggers = nextProps.httpTriggers;
    }
    if (nextProps.kubeWatchers.length !== this.state.kubeWatchers.length) {
      this.state.kubeWatchers = nextProps.kubeWatchers;
    }
    if (nextProps.environments.length !== this.state.environments.length) {
      this.state.environments = nextProps.environments;
    }
    // TODO this may cause user modified code lost in the editor buffer
    // TODO this causes editor buffer modification lost if user run test code
    if (!this.state.editing) {
      this.state.item = nextProps.functionByName(nextProps.params.name);
    } else {
      const nextState = nextProps.functionByName(nextProps.params.name);
      this.state.item.triggersHttp = nextState.triggersHttp;
      this.state.item.kubeWatchers = nextState.kubeWatchers;
    }
  }


  onChange(event) {
    const obj = Object.assign({}, this.state.item);
    obj[event.target.name] = event.target.value;

    this.setState({ item: obj, editing: true });
  }

  onCodeChange(newValue) {
    const obj = Object.assign({}, this.state.item);
    obj.code = newValue;

    this.setState({ item: obj, editing: true });
  }

  onFunctionTest(test) {
    const obj = Object.assign({}, this.state.item);
    obj.name = `ui-${v4()}`;
    obj.test = test;

    this.props.testFunction(obj);
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

  onKubeWatcherRemove(watcher) {
    this.props.deleteKubeWatcher(watcher);
  }

  onKubeWatcherCreate(watcher) {
    const { item } = this.state;
    const obj = Object.assign({}, watcher);
    obj.function = item.name;
    this.props.createKubeWatcher(obj);
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
    const { item, environments, loading, error, activeTab, functionTest } = this.state;
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
          onKubeWatcherRemove={this.onKubeWatcherRemove}
          onKubeWatcherCreate={this.onKubeWatcherCreate}
          metadataEditable={Boolean(false)}
          onCodeChange={this.onCodeChange}
          activeTab={activeTab}
          onTabChange={this.onTabChange}
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
FunctionEditPage.propTypes = {
  environments: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  httpTriggers: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  kubeWatchers: PropTypes.oneOfType([
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
  loadKubeWatchersData: PropTypes.func.isRequired,
  deleteTriggerHttp: PropTypes.func.isRequired,
  updateFunction: PropTypes.func.isRequired,
  createTriggerHttp: PropTypes.func.isRequired,
  createKubeWatcher: PropTypes.func.isRequired,
  deleteKubeWatcher: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  testFunction: PropTypes.func.isRequired,
  cleanTestFunction: PropTypes.func.isRequired,
  functionTest: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  functionByName: makeSelectFunctionByName(),
  environments: makeSelectEnvironments(),
  httpTriggers: makeSelectTriggersHttp(),
  kubeWatchers: makeSelectKubeWatchers(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  functionTest: makeSelectFunctionTest(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadEnvironmentData: () => dispatch(loadEnvironmentAction()),
    loadTriggersHttpData: () => dispatch(loadTriggersHttpAction()),
    loadKubeWatchersData: () => dispatch(loadKubeWatchersAction()),
    loadFunctionData: (name) => dispatch(getFunctionAction(name)),
    deleteTriggerHttp: (trigger) => dispatch(deleteTriggerHttpAction(trigger)),
    updateFunction: (fn) => dispatch(updateFunctionAction(fn)),
    createTriggerHttp: (trigger) => dispatch(createTriggerHttpAction(trigger)),
    testFunction: (fn) => dispatch(testFunctionAction(fn)),
    cleanTestFunction: () => dispatch(cleanTestFunctionAction()),
    createKubeWatcher: (watcher) => dispatch(createKubeWatcherAction(watcher)),
    deleteKubeWatcher: (watcher) => dispatch(deleteKubeWatcherAction(watcher)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FunctionEditPage);
