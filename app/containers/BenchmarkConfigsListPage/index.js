/*
 *
 * BenchmarkConfigsListPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';
import BenchmarkConfigsList from 'components/BenchmarkConfigsList';
import { makeSelectConfigs, makeSelectError, makeSelectLoading } from 'containers/BenchmarksPage/selectors';
import commonMessages from 'messages';
import { loadConfigsAction, removeConfigAction } from './actions';

export class BenchmarkConfigsListPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.onRemove = this.onRemove.bind(this);
  }

  componentDidMount() {
    this.props.loadBenchmarkConfigsData();
  }

  onRemove(config) {
    this.props.removeBenchmarkConfig(config);
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
        <Link to="/items/create" className="pull-right btn btn-primary">
          <FormattedMessage {...commonMessages.add} />
        </Link>
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BenchmarkConfigsListPage);
