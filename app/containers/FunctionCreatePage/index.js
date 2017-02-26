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
import FunctionTabForm from 'components/FunctionTabForm';
import TriggerTabForm from 'components/TriggerTabForm';
import LoadingIndicator from 'components/LoadingIndicator';
import { makeSelectLoading } from 'containers/FunctionsPage/selectors';
import { makeSelectEnvironments } from 'containers/EnvironmentsPage/selectors';
import { loadEnvironmentAction } from 'containers/EnvironmentsListPage/actions';

export class FunctionCreatePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      loading: props.loading,
      currentTab: 'function',
      item: { name: '', environment: '', triggersHttp: [], code: '', temporaryFunction: '' },
      environments: props.environments,
    };
    if (typeof this.state.environments === 'object' && Array.isArray(this.state.environments) === false) { // Convert environments to array if it's a Immutable List
      this.state.environments = this.state.environments.toArray();
    }
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
  }

  componentDidMount() {
    if (this.state.environments.length === 0) {
      this.props.loadEnvironmentData();
    }
    // TODO in FunctionEditPage get name from router and dipatch action with it
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading !== this.state.loading) {
      this.state.loading = nextProps.loading;
    }
    if (nextProps.environments.length !== this.state.environments.length) {
      this.state.environments = nextProps.environments;
    }
  }

  onChange(event) {
    console.log(event);
    console.log('update state');
  }

  onTabChange(tabName) {
    this.setState({ currentTab: tabName });
  }

  onSave() {
    console.log('onSave');
  }

  render() {
    const { item, currentTab, environments, loading } = this.state;
    if (loading) {
      return <LoadingIndicator />;
    }
    return (
      <div>
        <Helmet
          title="Create function"
        />
        <ul className="nav nav-tabs">
          <li role="presentation" className={currentTab === 'function' ? 'active' : ''}><a onClick={() => this.onTabChange('function')}>Function</a></li>
          <li role="presentation" className={currentTab === 'trigger' ? 'active' : ''}><a onClick={() => this.onTabChange('trigger')}>Triggers</a></li>
        </ul>
        <div style={{ display: currentTab === 'function' ? 'block' : 'none' }}>
          <FunctionTabForm item={item} environments={environments} onChange={this.onChange} />
        </div>
        <div style={{ display: currentTab === 'trigger' ? 'block' : 'none' }}>
          <TriggerTabForm triggers={{ triggersHttp: item.triggersHttp }} onChange={this.onChange} />
        </div>

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
  loadEnvironmentData: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  environments: makeSelectEnvironments(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadEnvironmentData: () => dispatch(loadEnvironmentAction()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FunctionCreatePage);
