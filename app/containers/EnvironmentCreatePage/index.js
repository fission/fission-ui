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
import LoadingIndicator from 'components/LoadingIndicator';
import ErrorIndicator from 'components/ErrorIndicator';
import { slug } from 'utils/util';
import { makeSelectError, makeSelectLoading } from 'containers/EnvironmentsPage/selectors';
import { createEnvironmentAction } from './actions';

export class EnvironmentCreatePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super();
    this.state = {
      loading: props.loading,
      error: props.error,
      environment: { name: '', image: '' },
    };
    this.submitForm = this.submitForm.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading !== this.state.loading) {
      this.state.loading = nextProps.loading;
    }
    if (nextProps.error !== this.state.error) {
      this.state.error = nextProps.error;
    }
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
    const { loading, error, environment } = this.state;
    if (loading) {
      return <LoadingIndicator />;
    }
    return (
      <div>
        <Helmet
          title="Environment creation"
        />
        {error &&
          <ErrorIndicator error={error} />
        }
        <EnvironmentForm nameEditable environment={environment} onChange={this.onChange} onSave={this.submitForm} />
      </div>
    );
  }
}

EnvironmentCreatePage.propTypes = {
  createEnvironement: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    createEnvironement: (environment) => dispatch(createEnvironmentAction(environment)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EnvironmentCreatePage);
