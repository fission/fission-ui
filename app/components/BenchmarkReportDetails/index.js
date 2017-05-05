/**
*
* BenchmarkReportDetails
*
*/

import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { Tabs, Tab } from 'react-bootstrap';
import { BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Legend, Tooltip, LineChart, Line } from 'recharts';
import BenchmarkReportItem from 'components/BenchmarkReportItem';
import { randomColor } from 'randomcolor';
import commonMessages from 'messages';

function ColorGenerator(num = 100) {
  this.colors = (new Array(num)).fill('').map(() => randomColor());
  this.index = 0;
  const that = this;
  this.get = () => {
    that.index = (that.index + 1) % that.colors.length;
    return that.colors[that.index];
  };
  this.reset = () => {
    that.index = 0;
  };
}

const colorGenerator = new ColorGenerator();

function toHistogramData(lats, fastest, slowest, numBins = 10) {
  if (lats === null || lats.length === 0 || numBins === 0) {
    return [];
  }
  const step = (slowest - fastest) / numBins;
  const counts = (new Array(numBins + 1)).fill(0);

  for (let i = 0; i < lats.length; i += 1) {
    counts[parseInt((lats[i] - fastest) / step, 10)] += 1;
  }
  return counts;
}

function BenchmarkReportDetails({ func, workload, reports }) {
  const funcNames = ['main'].concat(func.controls.map((item) => item.name));
  const numBins = 20;
  const fastest = Math.min(...reports.map((item) => item.Lats === null ? 0 : Math.min(...item.Lats)));
  const slowest = Math.max(...reports.map((item) => item.Lats === null ? 0 : Math.max(...item.Lats)));
  const latHists = reports.map((item) => toHistogramData(item.Lats, fastest, slowest, numBins));
  colorGenerator.reset();

  const latHistsData = (new Array(numBins + 1)).fill(null).map((item, index) => {
    const data = {
      name: `${index}`,
    };
    for (let i = 0; i < funcNames.length; i += 1) {
      if (index < latHists[i].length) {
        data[funcNames[i]] = latHists[i][index];
      }
    }
    return data;
  });
  const latCDFs = latHists.map((item) => {
    let total = 0;
    const sum = item.length === 0 ? 1 : item.reduce((a, b) => a + b);
    return item.map((x) => {
      const res = x + total;
      total += x;
      return res / sum;
    });
  });
  const latCDFsData = (new Array(numBins + 1)).fill(null).map((item, index) => {
    const data = {
      name: `${index}`,
    };
    for (let i = 0; i < funcNames.length; i += 1) {
      if (index < latCDFs[i].length) {
        data[funcNames[i]] = latCDFs[i][index];
      }
    }
    return data;
  });
  return (
    <div>
      <form className="form-horizontal">
        <div className="form-group">
          <label className="col-xs-2" htmlFor="none"><FormattedMessage {...commonMessages.function} /></label>
          <div className="col-xs-8">
            <span className="badge alert-info">{func.name}</span>
          </div>
        </div>
        <div className="form-group">
          <label className="col-xs-2" htmlFor="none"><FormattedMessage {...commonMessages.workload} /></label>
          <div className="col-xs-8">
            <span className="badge alert-info">{workload.name}</span>
          </div>
        </div>
      </form>
      <Tabs defaultActiveKey={1} animation={false} id="report-items">
        <Tab eventKey={1} title="Main">
          <BenchmarkReportItem report={reports[0]} meta={{ name: 'main', desc: '', endpoint: '' }} />
        </Tab>
        {
          func.controls.map((item, index) => (
            <Tab key={`report-item-${index}`} eventKey={2 + index} title={item.name} >
              <BenchmarkReportItem report={reports[1 + index]} meta={item} />
            </Tab>
          ))
        }
      </Tabs>
      <h4>
        <FormattedMessage {...commonMessages.histogram} />
        { ' ' }
        <FormattedMessage {...commonMessages.comparision} />
      </h4>
      <BarChart
        width={600} height={300} data={latHistsData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
        <ReferenceLine y={0} stroke="#000" />
        <Brush dataKey="name" height={30} stroke="#8884d8" />
        {
          funcNames.map((item, index) => (
            <Bar key={`bar-${index}`} dataKey={item} fill={colorGenerator.get()} />
          ))
        }
      </BarChart>
      <h4>
        <FormattedMessage {...commonMessages.latency} />
        { ' ' }
        CDF
        { ' ' }
        <FormattedMessage {...commonMessages.comparision} />
      </h4>
      <LineChart
        width={600} height={300} data={latCDFsData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        {
          funcNames.map((item, index) => (
            <Line key={`bar-${index}`} dataKey={item} stroke={colorGenerator.get()} />
          ))
        }
      </LineChart>
    </div>
  );
}

BenchmarkReportDetails.propTypes = {
  func: PropTypes.object,
  workload: PropTypes.object,
  reports: PropTypes.array,
};

export default BenchmarkReportDetails;
