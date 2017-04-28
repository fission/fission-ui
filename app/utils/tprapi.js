/**
 * Created by damien on 23/02/2017.
 */
import axios from 'axios';

const basePath = '/proxy/tpr/';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSOs from the request
 */
function parseJSON(response) {
  return response.data;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function getBenchmarkConfigs() {
  return axios.get(`${basePath}benchmark/configs`)
    .then(checkStatus)
    .then(parseJSON);
}
export function getBenchmarkConfig(name) {
  return axios.get(`${basePath}benchmark/configs/${name}`)
    .then(checkStatus)
    .then(parseJSON);
}
export function removeBenchmarkConfig(config) {
  return axios.delete(`${basePath}benchmark/configs/${config.metadata.name}`)
    .then(checkStatus)
    .then(parseJSON);
}
export function updateBenchmarkConfig(config) {
  // TODO maybe remove version info
  return axios.put(`${basePath}benchmark/configs/${config.metadata.name}`, config)
    .then(checkStatus)
    .then(parseJSON);
}
export function createBenchmarkConfig(config) {
  return axios.post(`${basePath}benchmark/configs`, config)
    .then(checkStatus)
    .then(parseJSON);
}

export function getBenchmarkInstances() {
  return axios.get(`${basePath}benchmark/instances`)
    .then(checkStatus)
    .then(parseJSON);
}
export function getBenchmarkInstance(name) {
  return axios.get(`${basePath}benchmark/instances/${name}`)
    .then(checkStatus)
    .then(parseJSON);
}
export function removeBenchmarkInstance(instance) {
  return axios.delete(`${basePath}benchmark/instances/${instance.metadata.name}`)
    .then(checkStatus)
    .then(parseJSON);
}
export function updateBenchmarkInstance(instance) {
  // TODO maybe remove version info
  return axios.put(`${basePath}benchmark/instances/${instance.metadata.name}`, instance)
    .then(checkStatus)
    .then(parseJSON);
}
export function createBenchmarkInstance(instance) {
  return axios.post(`${basePath}benchmark/instances`, instance)
    .then(checkStatus)
    .then(parseJSON);
}
