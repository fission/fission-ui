/**
*
* FunctionForm
*
*/

import React from 'react';
import { Link } from 'react-router';
// import styled from 'styled-components';

import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/mode/php';
import 'brace/mode/javascript';
import 'brace/theme/github';

class FunctionForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="formFunctionName">Function name</label>
          <input type="text" className="form-control" id="formFunctionName" name="name" />
        </div>
        <div className="form-group">
          <label htmlFor="formFunctionName">Environment</label>
          <select className="form-control">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="formFunctionName">Function code</label>
          <p>Editor mode</p>
          <select className="form-control">
            <option value="javascript">Javascript</option>
            <option value="java">Java</option>
            <option value="php">Php</option>
          </select>

          <AceEditor
            mode="javascript"
            theme="github"
            name="FunctionForm"
            editorProps={{ $blockScrolling: true }}
          />
        </div>

        <a className="btn btn-primary">Save</a> { ' ' }
        <Link to="/" className="btn btn-default">Cancel</Link>

      </form>
    );
  }
}

FunctionForm.propTypes = {

};

export default FunctionForm;
