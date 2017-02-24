/**
*
* NavLink
*
*/

import React, { PureComponent } from 'react';
import { Link } from 'react-router';

class NavLink extends PureComponent {
  render() {
    const isActive = this.context.router.isActive(this.props.to, true);
    const className = isActive ? 'active' : '';

    return (
      <li className={className}>
        <Link {...this.props} />
      </li>
    );
  }
}

NavLink.contextTypes = {
  router: React.PropTypes.object,
};

export default NavLink;
