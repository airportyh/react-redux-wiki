import $ from 'jquery';
import { hashHistory } from 'react-router';
import BASEURL from '../baseurl';

export function signUp(name, password) {
  return function(dispatch) {
    $.ajax({
      method: 'POST',
      url: BASEURL + '/api/signup',
      data: JSON.stringify({
        name: name,
        password: password
      }),
      contentType: 'application/json'
    })
    .then(() => hashHistory.push('/'))
    .catch(resp => dispatch({ type: 'error', error: resp }))
  }
}
