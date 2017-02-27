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
import { loadFunctionAction, loadTriggersHttpAction, deleteFunctionAction } from './actions';
import messages from './messages';

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
    // TODO change to a better confirm window
    const deleteRelatedTriggers = item.triggersHttp.length > 0 ?
      confirm(messages.functionDeleteRelatedHttpTriggers.defaultMessage) : false;
    this.props.deleteFunction(item, deleteRelatedTriggers);
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
  deleteFunction: PropTypes.func,
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
    deleteFunction: (func, deleteHttpTriggers) => dispatch(deleteFunctionAction(func, deleteHttpTriggers)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FunctionsListPage);
