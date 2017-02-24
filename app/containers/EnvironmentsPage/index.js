/*
 *
 * EnvironmentsPage
 *
 */

import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import messages from './messages';

export class EnvironmentsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <Link to="/environments/create" className="pull-right btn btn-primary">Add</Link>
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

EnvironmentsPage.propTypes = {
  children: PropTypes.node,
};


export default EnvironmentsPage;
