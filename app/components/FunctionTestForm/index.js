/**
 *
 * FunctionTestForm
 *
 */

import React from 'react';
import KeyValueBuilder from 'components/KeyValueBuilder';

class FunctionTestForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      headerShow: false,
      testObj: {
        headers: {},
        params: {},
        payload: {},
        method: 'GET',
      },
    };
    this.toggleHeader = this.toggleHeader.bind(this);
    this.onTest = this.onTest.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { name, value } = e.target;
    const { testObj } = this.state;
    testObj[name] = value;
    this.setState({ testObj });
  }

  onTest(e) {
    e.preventDefault();
    const test = Object.assign({}, this.state.testObj);
    this.props.onFunctionTest(test);
  }

  toggleHeader() {
    this.setState({
      headerShow: !this.state.headerShow,
    });
  }

  style = {
    backgroundColor: '#1f4662',
    color: '#fff',
    fontSize: '12px',
  };

  headerStyle = {
    backgroundColor: '#193549',
    padding: '5px 10px',
    fontFamily: 'monospace',
    color: '#ffc600',
  };

  preStyle = {
    display: 'block',
    padding: '10px 30px',
    margin: '0',
    overflow: 'scroll',
  };

  render() {
    if (!this.props.visible) {
      return false;
    }
    const { testObj } = this.state;
    const { response } = this.props.functionTest;
    let { data } = response;
    if (!data) {
      data = '';
    }
    try {
      data = JSON.parse(data);
    } catch (e) {
      data = '';
    }

    return (
      <div>
        <strong>Request</strong>
        <div>
          <span>Method: </span>
          <select className="form-control" id="FunctionTestMethod" name="method" defaultValue={testObj.method} onChange={this.onChange} >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
          <span>Params: </span>
          <KeyValueBuilder onChange={this.onChange} name="params" defaultValue={testObj.params} />
          <span>Headers: </span>
          <KeyValueBuilder onChange={this.onChange} name="headers" defaultValue={testObj.headers} />
          <span>Body: </span>
        </div>
        <strong>Response</strong>
        <div style={this.style}>
          <div>Status: {response.status}</div>
          <div onClick={this.toggleHeader}>Headers</div>
          {
            (this.state.headerShow ?
              (<div style={this.headerStyle}>
                {
                  Object.keys(response.headers ? response.headers : {}).map((key, index) =>
                    (
                      <div key={`header-${index}`}>
                        <span className="label-default"> {key}:</span>
                        <span> {response.headers[key]} </span>
                      </div>
                    )
                  )
                }
              </div>)
              : false)
          }
          <div>Data</div>
          <pre style={this.preStyle}>
            { JSON.stringify(data, null, 2) }
          </pre>
        </div>
        <a className="btn btn-primary pull-right" onClick={this.onTest}>Test code</a>
      </div>
    );
  }
}

FunctionTestForm.propTypes = {
  visible: React.PropTypes.bool,
  functionTest: React.PropTypes.object,
  onFunctionTest: React.PropTypes.func.isRequired,
};

export default FunctionTestForm;
