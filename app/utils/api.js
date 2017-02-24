/**
 * Created by damien on 23/02/2017.
 */
import axios from 'axios';


const basePath = 'http:///9ddc2b58.ngrok.io/192.168.99.100:31313/v1/'; // TODO find best solution, localhost:1337 is corsproxy

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
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

export function getEnvironments() {
  return axios.get(`${basePath}environments`)
    .then(checkStatus)
    .then(parseJSON);
}
export function getEnvironment(name) {
  return axios.get(`${basePath}environments/${name}`)
    .then(checkStatus)
    .then(parseJSON);
}
export function deleteEnvironment(name) {
  return axios.delete(`${basePath}environments/${name}`)
    .then(checkStatus)
    .then(parseJSON);
}
export function updateEnvironment(name, dockerImage) {
  return axios.put(`${basePath}environments/`, { metadata: { name }, runContainerImageUrl: dockerImage })
    .then(checkStatus)
    .then(parseJSON);
}
export function createEnvironment(name, dockerImage) {
  return axios.post(`${basePath}environments/`, { metadata: { name }, runContainerImageUrl: dockerImage })
    .then(checkStatus)
    .then(parseJSON);
}

