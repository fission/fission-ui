/*
 *
 * FunctionsListPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { makeSelectFunctions, makeSelectError, makeSelectLoading } from 'containers/FunctionsPage/selectors';
import FunctionsList from 'components/FunctionsList';
import { confirm } from 'utils/confirm';
import commonMessages from 'messages';
import { loadFunctionAction, loadTriggersHttpAction, deleteFunctionAction, loadKubeWatchersAction } from './actions';
import messages from './messages';

export class FunctionsListPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.onRemove = this.onRemove.bind(this);
  }

  componentDidMount() {
    this.props.loadFunctionsData(); // TODO need improvement, maybe fork in sagas.js
    this.props.loadTriggersHttpData();
    this.props.loadKubeWatchersData();
  }

  onRemove(item) {
    const confirmMessage = this.props.intl.formatMessage(messages.functionDeleteRelatedTriggers);
    const { deleteFunction } = this.props;
    if (item.triggersHttp.length === 0 && item.kubeWatchers.length === 0) {
      deleteFunction(item, true);
    }
    confirm(confirmMessage).then(() => {
      deleteFunction(item, true);
    }, () => {
      deleteFunction(item, false);
    });
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
        <Link to="/functions/create" className="pull-right btn btn-primary"><FormattedMessage {...commonMessages.add} /></Link>
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
  loadTriggersHttpData: PropTypes.func,
  loadKubeWatchersData: PropTypes.func,
  deleteFunction: PropTypes.func,
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  items: makeSelectFunctions(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadFunctionsData: () => dispatch(loadFunctionAction()),
    loadTriggersHttpData: () => dispatch(loadTriggersHttpAction()),
    loadKubeWatchersData: () => dispatch(loadKubeWatchersAction()),
    deleteFunction: (func, deleteTriggers) => dispatch(deleteFunctionAction(func, deleteTriggers)),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(FunctionsListPage));
