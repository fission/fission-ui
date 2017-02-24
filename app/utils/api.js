/**
 * Created by damien on 23/02/2017.
 */
import axios from 'axios';


const basePath = 'http://localhost:1337/192.168.99.100:31313/v1/';

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
