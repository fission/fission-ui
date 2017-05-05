/**
*
* BenchmarkReportItem
*
*/

import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'messages';
import { PieChart, Pie, Tooltip } from 'recharts';

function format(v) {
  return `${v}`;
}

function formatFloat(v) {
  const x = v.toFixed(2);
  return `${x}`;
}

function formatDuration(v) {
  const x = (v / 1000000000).toFixed(2);
  return `${x}`;
}

function Formatter(key, trans, formatter) {
  this.key = key;
  this.trans = trans;
  this.formatter = formatter;
}

const metaFormatter = [
  new Formatter('name', 'name', format),
  new Formatter('desc', 'description', format),
  new Formatter('endpoint', 'endpoint', format),
];
const reportFormatter = [
  new Formatter('Total', 'total', formatDuration),
  new Formatter('Slowest', 'slowest', formatFloat),
  new Formatter('Fastest', 'fastest', formatFloat),
  new Formatter('Average', 'average', formatFloat),
  new Formatter('Rps', 'rps', formatFloat),
];

function BenchmarkReportItem({ report, meta }) {
  const { StatusCodeDist } = report;
  const codeDistribution = StatusCodeDist === null ? [] : Object.keys(StatusCodeDist).map((item) => ({
    name: item,
    value: StatusCodeDist[item],
  }));

  return (
    <div className="container">
      <div className="col-sm-6">
        <h4><FormattedMessage {...commonMessages.summary} /></h4>
        <form className="form-horizontal">
          {
          metaFormatter.map((item, idx) => (
            <div className="form-group" key={`meta-${idx}`}>
              <label className="col-xs-4" htmlFor="none"><FormattedMessage {...commonMessages[item.trans]} /></label>
              <div className="col-xs-8">
                <span>{item.formatter(meta[item.key])}</span>
              </div>
            </div>
          ))
          }
        </form>
        <form className="form-horizontal">
          {
          reportFormatter.map((item, idx) => (
            <div className="form-group" key={`report-${idx}`}>
              <label className="col-xs-4" htmlFor="none"><FormattedMessage {...commonMessages[item.trans]} /></label>
              <div className="col-xs-8">
                <span>{item.formatter(report[item.key])}</span>
              </div>
            </div>
          ))
          }
        </form>
      </div>
      <div className="col-sm-6">
        <h4>
          <FormattedMessage {...commonMessages.code} />
          { ' ' }
          <FormattedMessage {...commonMessages.distribution} />
        </h4>
        <PieChart width={600} height={300}>
          <Pie data={codeDistribution} cx={120} cy={120} outerRadius={80} fill="#8884d8" label={Boolean(true)} />
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}

BenchmarkReportItem.propTypes = {
  report: PropTypes.object,
  meta: PropTypes.object,
};

export default BenchmarkReportItem;
