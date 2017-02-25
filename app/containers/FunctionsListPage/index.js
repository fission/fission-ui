/*
 *
 * FunctionsListPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { makeSelectFunctions, makeSelectError, makeSelectLoading } from 'containers/FunctionsPage/selectors';
import FunctionsList from 'components/FunctionsList';
import { loadFunctionAction, loadTriggersHttpAction } from './actions';

export class FunctionsListPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.onRemove = this.onRemove.bind(this);
  }

  componentDidMount() {
    this.props.loadFunctionsData(); // TODO need improvement, maybe fork in sagas.js
    this.props.loadTriggesrHttpData();
  }

  onRemove(item) {
    console.log(item);
    // TODO remove function
  }

  render() {
    const { loading, error, items } = this.props;
    const functionsListProps = {
      loading,
      error,
      items,
    };

    return (
      <div>
        <Helmet
          title="List functions"
        />
        <Link to="/functions/create" className="pull-right btn btn-primary">Add</Link>
        <FunctionsList {...functionsListProps} onRemove={this.onRemove} />
      </div>
    );
  }
}

FunctionsListPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  items: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  loadFunctionsData: PropTypes.func,
  loadTriggesrHttpData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  items: makeSelectFunctions(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadFunctionsData: () => dispatch(loadFunctionAction()),
    loadTriggesrHttpData: () => dispatch(loadTriggersHttpAction()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FunctionsListPage);
