/**
*
* FunctionForm
*
*/

import React from 'react';
// import styled from 'styled-components';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/mode/php';
import 'brace/mode/javascript';
import 'brace/mode/python';
import 'brace/theme/github';
import LoadingIndicator from 'components/LoadingIndicator';
import FunctionTestForm from 'components/FunctionTestForm';

class FunctionTabForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    const environment = props.item.environment.toLowerCase();
    this.state = {
      mode: environment in this.supportedLanguages ? environment : 'javascript',
    };

    this.onModeChange = this.onModeChange.bind(this);
  }

  onModeChange(e) {
    this.setState({ mode: e.target.value });
  }

  supportedLanguages = {
    java: true,
    php: true,
    javascript: true,
    python: true,
  };

  render() {
    const { onChange, environments, item, metadataEditable, onCodeChange, onFunctionTest, functionTest } = this.props;
    const { mode } = this.state;
    return (
      <form>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="formFunctionName">Function name</label>
              <input type="text" className="form-control" id="formFunctionName" name="name" value={item.name} onChange={onChange} disabled={!metadataEditable} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="formFunctionName">Environment</label>
              <select className="form-control" value={item.environment} name="environment" id="formFunctionName" onChange={onChange} disabled={!metadataEditable}>
                <option value="" key={'environmentSelect-0'} />
                {
                  environments.map((environment, index) => (
                    <option value={environment.name} key={`environmentSelect-${index + 1}`}>{environment.name}</option>
                  ))
                }
              </select>
            </div>
          </div>
        </div>


        <div className="row">
          <div className="col-md-6">
            <AceEditor
              mode={mode}
              theme="github"
              name="FunctionForm"
              value={item.code}
              editorProps={{ $blockScrolling: true }}
              onChange={onCodeChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="formFunctionName">Syntax</label>
            <select className="form-control" defaultValue={mode} onChange={this.onModeChange}>
              <option value="javascript">Javascript</option>
              <option value="java">Java</option>
              <option value="php">Php</option>
              <option value="python">Python</option>
            </select>
            {
              functionTest.loading ? <LoadingIndicator /> : false
            }
            <FunctionTestForm onFunctionTest={onFunctionTest} functionTest={functionTest} visible={!functionTest.loading} draftOnly={metadataEditable} />

          </div>
        </div>
      </form>
    );
  }
}

FunctionTabForm.propTypes = {
  item: React.PropTypes.object,
  environments: React.PropTypes.array,
  onChange: React.PropTypes.func.isRequired,
  onCodeChange: React.PropTypes.func.isRequired,
  onFunctionTest: React.PropTypes.func.isRequired,
  metadataEditable: React.PropTypes.bool,
  functionTest: React.PropTypes.object,
};

export default FunctionTabForm;
