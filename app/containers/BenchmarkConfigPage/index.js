/*
 *
 * BenchmarkConfigPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/github';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';
import LoadingIndicator from 'components/LoadingIndicator';
import ErrorIndicator from 'components/ErrorIndicator';
import { makeSelectConfigByName, makeSelectError, makeSelectLoading } from 'containers/BenchmarksPage/selectors';
import commonMessages from 'messages';
import { getConfigAction, updateConfigAction } from './actions';

const nameWrapper = [''];

export class BenchmarkConfigPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();

    this.state = {
      code: '',
    };

    this.onCodeChange = this.onCodeChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    const { configName } = this.props.params;
    if (configName === undefined) {
      return;
    }
    nameWrapper[0] = configName;
    this.props.getBenchmarkConfig(configName);
  }

  onCodeChange(changed) {
    this.state.code = changed;
  }

  onSave() {
    const { config } = this.props;
    const newConfig = Object.assign({}, config);
    newConfig.spec = JSON.parse(this.state.code);
    this.props.updateBenchmarkConfig(newConfig);
  }

  render() {
    const { configName } = this.props.params;
    const { loading, error, config } = this.props;
    const { onCodeChange } = this;
    if (config === undefined || loading) {
      return <LoadingIndicator />;
    }
    if (error !== false) {
      return <ErrorIndicator errors={[error.response.data]} />;
    }
    this.state.code = JSON.stringify(config.spec, null, 2);
    return (
      <div>
        <Helmet
          title={configName}
        />
        <h2>{configName}</h2>
        <AceEditor
          mode="javascript"
          theme="github"
          name="ConfigForm"
          value={this.state.code}
          editorProps={{ $blockScrolling: true }}
          onChange={onCodeChange}
          width="100%"
        />
        <a onClick={this.onSave} className="pull-right btn btn-info"><FormattedMessage {...commonMessages.save} /></a>
        <Link to="/benchmarks" className="pull-right btn btn-default"><FormattedMessage {...commonMessages.cancel} /></Link>
      </div>
    );
  }
}

BenchmarkConfigPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  config: PropTypes.object,
  params: PropTypes.object,
  getBenchmarkConfig: PropTypes.func,
  updateBenchmarkConfig: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  config: makeSelectConfigByName(nameWrapper),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    getBenchmarkConfig: (name) => dispatch((getConfigAction(name))),
    updateBenchmarkConfig: (config) => dispatch((updateConfigAction(config))),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BenchmarkConfigPage);
