import $ from 'jquery';
import { hashHistory } from 'react-router';
import BASEURL from '../baseurl';
import uuid from 'uuid';

export function login(name, password) {
  return {
    type: 'auth-success', data: {
      auth_token: uuid.v4(),
      name: 'airportyh'
    }
  };
}
