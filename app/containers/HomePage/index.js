/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <a className="pull-right btn btn-primary">Add</a>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Function name</th>
              <th>Engine</th>
              <th>Endpoint</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>hello</td>
              <td><a href="">php7</a></td>
              <td>
                <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                  <li><span className="label label-info">GET</span> /toto <span className="label label-danger"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></span></li>
                  <li><span className="label label-info">POST</span> /toto</li>
                  <li><span className="label label-success"><span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add</span></li>
                </ul>
              </td>
              <td>
                <a className="btn btn-danger" href="">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
