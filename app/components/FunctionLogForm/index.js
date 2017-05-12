/**
 *
 * FunctionLogForm
 *
 */

import React from 'react';
import Influx from 'influx';
import FunctionLogItem from 'components/FunctionLogItem';
// import { FormattedMessage } from 'react-intl';
// import commonMessages from 'messages';

const INFLUXDB_DATABASE = 'fissionFunctionLog';
const INFLUXDB_NODEPORT = '31315';
const LOG_ITEM_KEYS = ['log', 'stream', 'funcuid', 'container'];
const OR = (a, b) => a || b;
const AND = (a, b) => a && b;

class FunctionLogForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      logs: null,
      logFilter: '',
    };
    this.lastTimeStamp = 0;
    this.timerId = null;
    this.client = new Influx.InfluxDB({
      host: window.location.hostname,
      port: INFLUXDB_NODEPORT,
      database: INFLUXDB_DATABASE,
    });
    this.onPollLogs = this.onPollLogs.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCheckChange = this.onCheckChange.bind(this);
    this.onCleanLocalLogsCache = this.onCleanLocalLogsCache.bind(this);
    this.onDeleteAllLogsOfThisVersion = this.onDeleteAllLogsOfThisVersion.bind(this);
  }

  componentWillMount() {
    // start logs polling
    this.onPollLogs();
    this.timerId = setInterval(this.onPollLogs, 3 * 1000);
  }

  componentWillUnmount() {
    // cancel logs polling
    if (this.timerId !== null) {
      clearInterval(this.timerId);
    }
  }

  onPollLogs() {
    const { item } = this.props;
    const that = this;
    const query = `SELECT * FROM log WHERE funcuid = '${item.uid}' AND time > ${this.lastTimeStamp} ORDER BY time DESC`;
    this.client.query(query).then((results) => {
      if (results.length > 0) {
        that.lastTimeStamp = results[0].time.getTime() * 1000 * 1000;
      }
      const s = that.state;
      s.logs = s.logs === null ? results : results.concat(s.logs);
      that.setState({ s });
    });
  }

  onChange(e) {
    const { name, value } = e.target;
    const { state } = this;
    state[name] = value;
    this.setState(state);
  }

  onCheckChange(e) {
    const { name, checked } = e.target;
    const { state } = this;
    state[name] = checked;
    this.setState(state);
  }

  onCleanLocalLogsCache() {
    const { state } = this;
    state.logs = null;
    this.setState(state);
  }

  onDeleteAllLogsOfThisVersion() {
    const { item } = this.props;
    // Delete by funcname is not working
    this.client.dropSeries({
      measurement: (m) => m.name('log'),
      where: `funcuid= '${item.uid}'`,
      database: INFLUXDB_DATABASE,
    }).then(() => false);
    this.onCleanLocalLogsCache();
  }

  isFilterPassed(log, filterStr) {
    if (filterStr === null || filterStr.trim() === '') {
      return true;
    }
    const filters = filterStr.trim().split(' ').filter((f) => f !== '');
    return filters.map((f) => LOG_ITEM_KEYS.map((k) => log[k].includes(f)).reduce(OR)).reduce(AND);
  }

  render() {
    const { logs, logFilter } = this.state;
    return (
      <div>
        <h3>Logs({logs === null ? 0 : logs.length})</h3>
        <a className="btn btn-danger" onClick={this.onDeleteAllLogsOfThisVersion} >Delete all logs of this version</a>
        <a className="btn btn-warning" onClick={this.onCleanLocalLogsCache}>Clean local logs cache</a>
        <div className="form-inline">
          <div className="form-group">
            <label htmlFor="logFilter">Filter</label>
            <input id="logFilter" name="logFilter" type="text" className="form-control" value={logFilter} onChange={this.onChange} />
          </div>
        </div>
        <div className="pre-scrollable">
          {
            logs !== null && logs.map((log, idx) => (
              this.isFilterPassed(log, logFilter) ? <FunctionLogItem key={`log-${idx}`} log={log} /> : false))
          }
        </div>
      </div>
    );
  }
}

FunctionLogForm.propTypes = {
  item: React.PropTypes.object,
};

export default FunctionLogForm;
