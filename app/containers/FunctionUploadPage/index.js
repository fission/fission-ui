/*
 *
 * FunctionUploadPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import ReactTooltip from 'react-tooltip';
import { makeSelectUploadFunctions } from 'containers/FunctionsPage/selectors';
import { makeSelectEnvironments } from 'containers/EnvironmentsPage/selectors';
import { loadEnvironmentAction } from 'containers/EnvironmentsListPage/actions';
import { setUploadFunctionsAction, uploadFunctionsInBatchAction } from 'containers/FunctionUploadPage/actions';
import FunctionUploadListItem from 'containers/FunctionUploadListItem';
import DropFileZone from 'components/DropFileZone';
import FileExt2EnvForm from 'components/FileExt2EnvForm';
import commonMessages from 'messages';

export class FunctionUploadPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      functions: props.functions,
      environments: props.environments,
      mode: 'create',
      fileExt2Env: this.readFileExtMappingFromLocalStorage(),
      draftMapping: { extension: '', environment: '' },
    };

    this.onRemove = this.onRemove.bind(this);
    this.onChooseFiles = this.onChooseFiles.bind(this);
    this.onRemoveUploadedFunctions = this.onRemoveUploadedFunctions.bind(this);
    this.onUpload = this.onUpload.bind(this);
    this.onSelectMode = this.onSelectMode.bind(this);
    this.onRemoveFileExtMapping = this.onRemoveFileExtMapping.bind(this);
    this.onDraftMappingChange = this.onDraftMappingChange.bind(this);
    this.onDraftMappingCreate = this.onDraftMappingCreate.bind(this);
    this.onReadFiles = this.onReadFiles.bind(this);
  }

  componentDidMount() {
    if (this.state.environments.length === 0) {
      this.props.loadEnvironmentData();
    }
    this.props.setUploadFunctions([]);
  }

  componentWillReceiveProps(nextProps) {
    this.state.functions = nextProps.functions;
    this.state.environments = nextProps.environments;
  }

  onRemove(item) {
    const { functions } = this.state;
    this.props.setUploadFunctions(functions.filter((f) => f.name !== item.name));
  }

  onUpload() {
    const { functions, mode } = this.state;

    // TODO update function env not modifiable, this can be done in fission
    if (this.validateFunctions(functions)) {
      this.props.uploadFunctions(functions, mode === 'create');
    } else {
      this.props.setUploadFunctions(functions);
    }
  }

  onRemoveUploadedFunctions() {
    const { functions } = this.state;
    this.props.setUploadFunctions(functions.filter((f) => f.status !== 'uploaded'));
  }

  onSelectMode(e) {
    this.setState({ mode: e.target.value });
  }

  onChooseFiles(e) {
    this.onReadFiles(Array.from(e.target.files));
  }

  onReadFiles(files) {
    const { fileExt2Env } = this.state;
    const fns = files.map((file) => {
      const index = file.name.lastIndexOf('.');
      let name = '';
      let environment = '';
      if (index > -1) {
        name = file.name.slice(0, index);
        const ext = file.name.slice(index + 1);
        environment = ext in fileExt2Env ? fileExt2Env[ext] : '';
      }
      return {
        name,
        environment,
        file,
        code: '',
        status: 'pending',
        errors: [],
      };
    });
    const length = fns.length;
    const counter = [0];
    const that = this;

    fns.forEach((fn) => {
      const f = fn;
      const reader = new FileReader();
      reader.onload = () => {
        f.code = this.result;
        counter[0] += 1;
        if (counter[0] === length) {
          that.props.setUploadFunctions(fns);
        }
      };
      reader.readAsText(f.file);
      delete f.file;
    });
  }

  onRemoveFileExtMapping(ext) {
    const { fileExt2Env } = this.state;
    delete fileExt2Env[ext];
    this.setState({ fileExt2Env });
    this.writeFileExtMappingToLocalStorage(fileExt2Env);
  }

  onDraftMappingChange(e) {
    const { draftMapping } = this.state;
    draftMapping[e.target.name] = e.target.value;
    this.setState({ draftMapping });
  }

  onDraftMappingCreate() {
    const { draftMapping, fileExt2Env } = this.state;
    fileExt2Env[draftMapping.extension] = draftMapping.environment;
    draftMapping.extension = draftMapping.environment = '';
    this.setState({ draftMapping, fileExt2Env });
    this.writeFileExtMappingToLocalStorage(fileExt2Env);
  }

  validateFunctions(functions) {
    let valid = true;
    const { intl } = this.props;
    functions.forEach((fn) => {
      const f = fn;
      const inputErrors = [];
      f.errors = inputErrors;
      if (f.name === '') {
        inputErrors.push(intl.formatMessage(commonMessages.inputErrorNeedName));
      }
      if (f.environment === '') {
        inputErrors.push(intl.formatMessage(commonMessages.inputErrorNeedEnvironment));
      }
      if (f.code === '') {
        inputErrors.push(intl.formatMessage(commonMessages.inputErrorNeedCode));
      }
      valid = valid && (f.errors.length === 0);
    });
    return valid;
  }

  readFileExtMappingFromLocalStorage() {
    if (this.fileExt2EnvName in localStorage) {
      return JSON.parse(localStorage[this.fileExt2EnvName]);
    }
    return {};
  }

  writeFileExtMappingToLocalStorage(mapping) {
    localStorage[this.fileExt2EnvName] = JSON.stringify(mapping);
  }

  fileExt2EnvName = 'functionUploadPage/fileExt2Env';

  render() {
    const { environments } = this.props;
    const { functions, mode, fileExt2Env, draftMapping } = this.state;
    const { onRemove, onChooseFiles, onRemoveUploadedFunctions, onUpload, onSelectMode,
      onRemoveFileExtMapping, onDraftMappingChange, onDraftMappingCreate, onReadFiles } = this;
    return (
      <div>
        <Helmet
          title="Upload functions"
        />
        <div>
          <h3><FormattedMessage {...commonMessages.upload} /></h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th><FormattedMessage {...commonMessages.name} /></th>
                <th><FormattedMessage {...commonMessages.environment} /></th>
                <th><FormattedMessage {...commonMessages.status} /></th>
                <th><FormattedMessage {...commonMessages.action} /></th>
              </tr>
            </thead>
            <tbody>
              {
                functions.map((item, index) => (
                  <FunctionUploadListItem item={item} key={`function-${index}`} onRemove={() => onRemove(item)} />
                ))
              }
            </tbody>
          </table>
          <DropFileZone onFilesDropped={onReadFiles} />
          <a onClick={onRemoveUploadedFunctions} className="btn btn-danger pull-right"><FormattedMessage {...commonMessages.deleteUploaded} /></a>
          <a onClick={onUpload} className="btn btn-success pull-right"><FormattedMessage {...commonMessages.upload} /></a>
          <label className="btn btn-primary pull-right" htmlFor="my-file-selector" data-tip="Or drag & drop files into table">
            <input id="my-file-selector" type="file" multiple onChange={onChooseFiles} style={{ display: 'None' }} />
            <FormattedMessage {...commonMessages.chooseFunctionFiles} />
          </label>
          <ReactTooltip />
          <div className="form-inline">
            <select className="form-control" value={mode} onChange={onSelectMode} >
              <option value="create">Create</option>
              <option value="update">Update</option>
            </select>
          </div>
        </div>
        <FileExt2EnvForm
          onRemoveFileExtMapping={onRemoveFileExtMapping}
          onDraftMappingCreate={onDraftMappingCreate}
          onDraftMappingChange={onDraftMappingChange}
          environments={environments}
          fileExt2Env={fileExt2Env}
          draftMapping={draftMapping}
        />
        <Link to="/" className="btn btn-default pull-right"><FormattedMessage {...commonMessages.cancel} /></Link>
      </div>
    );
  }
}
FunctionUploadPage.propTypes = {
  environments: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  functions: PropTypes.array,
  loadEnvironmentData: PropTypes.func.isRequired,
  uploadFunctions: PropTypes.func.isRequired,
  setUploadFunctions: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  environments: makeSelectEnvironments(),
  functions: makeSelectUploadFunctions(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadEnvironmentData: () => dispatch(loadEnvironmentAction()),
    uploadFunctions: (fns, isCreate) => dispatch(uploadFunctionsInBatchAction(fns, isCreate)),
    setUploadFunctions: (fns) => dispatch(setUploadFunctionsAction(fns)),
  };
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(FunctionUploadPage));
