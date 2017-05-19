import $ from 'jquery';
import { hashHistory } from 'react-router';
import BASEURL from '../baseurl';

export function login(name, password) {
  return function(dispatch) {
    $.ajax({
      method: 'POST',
      url: BASEURL + '/api/login',
      data: JSON.stringify({
        name: name,
        password: password
      }),
      contentType: 'application/json'
    })
    .then(authInfo => {
      dispatch({
        type: 'auth-success', data: authInfo}
      );
      hashHistory.push('/');
    })
    .catch(resp => {
      let error = (resp.responseJSON && resp.responseJSON.message) || resp;
      dispatch({
        type: 'auth-failure', error: error
      })
    });
  }
}
