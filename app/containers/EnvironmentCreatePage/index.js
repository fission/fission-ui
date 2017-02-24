/*
 *
 * EnvironmentCreatePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectEnvironmentCreatePage from './selectors';
import messages from './messages';

export class EnvironmentCreatePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="Environment creation"
        />
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

EnvironmentCreatePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  EnvironmentCreatePage: makeSelectEnvironmentCreatePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EnvironmentCreatePage);
