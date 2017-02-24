/*
 *
 * EnvironmentsListPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';
import EnvironmentsList from 'components/EnvironmentsList';
import { loadEnvironmentAction } from './actions';
import { makeSelectEnvironments, makeSelectError, makeSelectLoading } from './selectors';

export class EnvironmentsListPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.loadEnvironmentData();
  }
  render() {
    const { loading, error, environments } = this.props;
    const environmentsListProps = {
      loading,
      error,
      environments,
    };
    return (
      <div>
        <Helmet
          title="List environments"
        />
        <Link to="/environments/create" className="pull-right btn btn-primary">Add</Link>
        <EnvironmentsList {...environmentsListProps} />
      </div>
    );
  }
}

EnvironmentsListPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  environments: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  loadEnvironmentData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  environments: makeSelectEnvironments(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadEnvironmentData: () => dispatch(loadEnvironmentAction()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EnvironmentsListPage);
