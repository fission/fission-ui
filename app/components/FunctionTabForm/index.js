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
import 'brace/theme/github';

class FunctionTabForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { onChange, environments, item } = this.props;
    return (
      <form>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="formFunctionName">Function name</label>
              <input type="text" className="form-control" id="formFunctionName" name="name" value={item.name} onChange={onChange} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="formFunctionName">Environment</label>
              <select className="form-control" defaultValue={item.environment}>
                {
                  environments.map((environment, index) => (
                    <option value={environment.name} key={`environmentSelect-${index}`}>{environment.name}</option>
                  ))
                }
              </select>
            </div>
          </div>
        </div>


        <div className="row">
          <div className="col-md-6">
            <AceEditor
              mode="javascript"
              theme="github"
              name="FunctionForm"
              defaultValue={item.code}
              editorProps={{ $blockScrolling: true }}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="formFunctionName">Syntax</label>
            <select className="form-control">
              <option value="javascript">Javascript</option>
              <option value="java">Java</option>
              <option value="php">Php</option>
            </select>
            <a className="btn btn-primary">Test code</a> { ' ' }
            <div>
              TODO Test code result
            </div>
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
};

export default FunctionTabForm;
