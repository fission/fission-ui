/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import NavLink from 'components/NavLink';
import { Link } from 'react-router';
import withProgressBar from 'components/ProgressBar';
import LocaleToggle from 'containers/LocaleToggle';

export function App(props) {
  return (
    <div className="container">
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">Fission UI</Link>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <NavLink to="/">
                <i className="glyphicon glyphicon-flash"></i> <span>Functions</span>
              </NavLink>
              <NavLink to="/environments">
                <i className="glyphicon glyphicon-tasks"></i> <span>Environment</span>
              </NavLink>
            </ul>
            <LocaleToggle />
          </div>
        </div>
      </nav>
      <div className="row">
        {React.Children.toArray(props.children)}
      </div>
    </div>
  );
}
App.propTypes = {
  children: React.PropTypes.node,
};

export default withProgressBar(App);
