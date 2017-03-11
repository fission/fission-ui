/**
 *
 * FunctionTestForm
 *
 */

import React from 'react';
import KeyValueBuilder from 'components/KeyValueBuilder';
import RequestBodyBuilder from 'components/RequestBodyBuilder';
import FunctionTestHistoryItemForm from 'components/FunctionTestHistoryItemForm';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages';

class FunctionTestForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      headerShow: false,
      testObj: {
        headers: {},
        params: {},
        body: '',
        method: 'GET',
        bodytype: 'plain_text',
        draft: true,
      },
      history: this.readHistoryFromLocalStorage(),
    };
    this.toggleHeader = this.toggleHeader.bind(this);
    this.onTest = this.onTest.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSelectBodyType = this.onSelectBodyType.bind(this);
    this.onBodyContentChange = this.onBodyContentChange.bind(this);
    this.onDraftChange = this.onDraftChange.bind(this);
    this.onSelectHistoryItem = this.onSelectHistoryItem.bind(this);
    this.readHistoryFromLocalStorage = this.readHistoryFromLocalStorage.bind(this);
    this.writeHistoryToLocalStorage = this.writeHistoryToLocalStorage.bind(this);
  }

  onChange(e) {
    const { name, value } = e.target;
    const { testObj } = this.state;
    testObj[name] = value;
    this.setState({ testObj });
  }

  onTest(e) {
    e.preventDefault();
    const test = this.deepClone(this.state.testObj);
    const { history } = this.state;
    history.push(this.deepClone(test));
    this.setState({ history });
    this.writeHistoryToLocalStorage(history);

    this.props.onFunctionTest(test);
  }

  onSelectBodyType(e) {
    e.preventDefault();
    const { testObj } = this.state;
    const type = e.target.value;
    if (type in this.bodyType2ContentHeader) {
      testObj.bodytype = type;
      testObj.headers['Content-Type'] = this.bodyType2ContentHeader[type];
      this.setState({ testObj });
    }
  }

  onBodyContentChange(val) {
    const { testObj } = this.state;
    testObj.body = val;
    this.setState({ testObj });
  }

  onDraftChange(e) {
    const { testObj } = this.state;
    testObj.draft = e.target.checked;
    this.setState({ testObj });
  }

  onSelectHistoryItem(item) {
    this.setState({ testObj: this.deepClone(item) });
  }

  toggleHeader() {
    this.setState({
      headerShow: !this.state.headerShow,
    });
  }

  deepClone(obj) {
    // TODO maybe use immutable to all the state obj
    return JSON.parse(JSON.stringify(obj));
  }

  readHistoryFromLocalStorage() {
    const uid = this.props.functionUid;
    const content = localStorage[`function-history-${uid}`] || '[]';
    return JSON.parse(content);
  }

  writeHistoryToLocalStorage(history) {
    const uid = this.props.functionUid;
    localStorage[`function-history-${uid}`] = JSON.stringify(history);
  }

  bodyType2ContentHeader = {
    plain_text: 'text/plain',
    json: 'application/json',
    xml: 'application/xml',
  };

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
    const { testObj, history } = this.state;
    const { response } = this.props.functionTest;
    const { data, status } = response;

    let functionTestResponse = true;
    if (!data && !status) {
      functionTestResponse = false;
    }

    return (
      <div>
        <em><FormattedMessage {...commonMessages.draft} />?</em>
        <input type="checkbox" checked={testObj.draft} onChange={this.onDraftChange} disabled={this.props.draftOnly} />
        <br />
        <strong>Request</strong>
        <div>
          <span>Method: </span>
          <select className="form-control" id="FunctionTestMethod" name="method" value={testObj.method} onChange={this.onChange} >
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
          <RequestBodyBuilder bodytype={testObj.bodytype} content={testObj.body} onSelectType={this.onSelectBodyType} onContentChange={this.onBodyContentChange} />
        </div>
        <div>
          <span>History: </span>
          {
            history.map((item, index) =>
              <FunctionTestHistoryItemForm
                key={`function-history-${index}`}
                item={item}
                index={index}
                onSelect={this.onSelectHistoryItem}
              />
            ).reverse()
          }
        </div>
        { functionTestResponse &&
          <div>
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
          </div>
        }

        <a className="btn btn-primary pull-right" onClick={this.onTest}><FormattedMessage {...commonMessages.test} /></a>
      </div>
    );
  }
}

FunctionTestForm.propTypes = {
  visible: React.PropTypes.bool,
  draftOnly: React.PropTypes.bool,
  functionUid: React.PropTypes.string,
  functionTest: React.PropTypes.object,
  onFunctionTest: React.PropTypes.func.isRequired,
};

export default FunctionTestForm;
