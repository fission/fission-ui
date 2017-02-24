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
import { slug } from 'utils/util';
import makeSelectEnvironmentCreatePage from './selectors';
import { createEnvironmentAction } from './actions';

export class EnvironmentCreatePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      environment: { name: '', image: '' },
    };
    this.submitForm = this.submitForm.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const field = event.target.name;
    const environment = this.state.environment;
    environment[field] = event.target.value;
    return this.setState({ environment });
  }

  submitForm(event) {
    event.preventDefault();
    this.state.environment.name = slug(this.state.environment.name);
    this.props.createEnvironement(this.state.environment);
    return false;
  }
  render() {
    return (
      <div>
        <Helmet
          title="Environment creation"
        />
        <EnvironmentForm environment={this.state.environment} onChange={this.onChange} onSave={this.submitForm} />
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
    createEnvironement: (environment) => dispatch(createEnvironmentAction(environment)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EnvironmentCreatePage);
