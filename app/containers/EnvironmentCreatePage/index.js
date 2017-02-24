/*
 *
 * EnvironmentCreatePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import EnvironmentForm from 'components/EnvironmentForm';
import makeSelectEnvironmentCreatePage from './selectors';
import { createEnvironmentAction } from './actions';

export class EnvironmentCreatePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.submitForm = this.submitForm.bind(this);
  }
  submitForm(e) {
    e.preventDefault();
    // TODO remove space and special characters for environment name
    this.props.createEnvironement('my-env', 'docker/image');
    return false;
  }
  render() {
    return (
      <div>
        <Helmet
          title="Environment creation"
        />
        <EnvironmentForm name="" dockerImage="" onSubmit={this.submitForm} />
      </div>
    );
  }
}

EnvironmentCreatePage.propTypes = {
  createEnvironement: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  EnvironmentCreatePage: makeSelectEnvironmentCreatePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    createEnvironement: (name, dockerImage) => dispatch(createEnvironmentAction(name, dockerImage)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EnvironmentCreatePage);
