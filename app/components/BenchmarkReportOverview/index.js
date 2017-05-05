/**
*
* BenchmarkReportOverview
*
*/

import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { ProgressBar } from 'react-bootstrap';
import commonMessages from 'messages';

function BenchmarkReportOverview({ instance }) {
  const { spec } = instance;
  const progress = parseInt(spec.progress * 100, 10);
  return (
    <div>
      <form className="form-horizontal">
        <div className="form-group">
          <label className="col-xs-2" htmlFor="none"><FormattedMessage {...commonMessages.status} /></label>
          <div className="col-xs-8">
            <span className="badge alert-info">{spec.status}</span>
          </div>
        </div>
        <div className="form-group">
          <label className="col-xs-2" htmlFor="none"><FormattedMessage {...commonMessages.progress} /></label>
          <div className="col-xs-8">
            <ProgressBar now={progress} label={`${progress}%`} active={spec.status === 'running'} />
          </div>
        </div>
        <div className="form-group">
          <label className="col-xs-2" htmlFor="none">
            <FormattedMessage {...commonMessages.start} />
            {' '}
            <FormattedMessage {...commonMessages.time} />
          </label>
          <div className="col-xs-8">
            <span className="badge">{(new Date(spec.starttimestamp * 1000)).toString()}</span>
          </div>
        </div>
        <div className="form-group">
          <label className="col-xs-2" htmlFor="none">
            <FormattedMessage {...commonMessages.end} />
            {' '}
            <FormattedMessage {...commonMessages.time} />
          </label>
          <div className="col-xs-8">
            <span className="badge">{(new Date(spec.endtimestamp * 1000)).toString()}</span>
          </div>
        </div>
        <div className="form-group">
          <label className="col-xs-2" htmlFor="none">
            <FormattedMessage {...commonMessages.error} />
          </label>
          <div className="col-xs-8">
            <ul>
              {
                spec.errors.map((item, index) => (
                  <li key={`error-${index}`} >item</li>
                ))
              }
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
}

BenchmarkReportOverview.propTypes = {
  instance: PropTypes.object,
};

export default BenchmarkReportOverview;
