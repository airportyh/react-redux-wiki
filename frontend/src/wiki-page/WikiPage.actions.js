import $ from 'jquery';
import BASEURL from '../baseurl';

export function toggleEdit() {
  return { type: 'toggle-edit' };
}

export function updateContents(newContents) {
  return { type: 'update-page-contents', newContents: newContents };
}

export function updatePage(title, newContents) {
  return function(dispatch) {
    $.post({
      method: 'PUT',
      url: `${BASEURL}/api/page/${title}`,
      data: JSON.stringify({ content: newContents }),
      contentType: 'application/json'
    })
    .then(page => dispatch(updateContents(page.content)))
  }
}

export function fetchPage(title) {
  return function(dispatch) {
    dispatch({ type: 'fetch-page-start', title: title });
    $.get(`${BASEURL}/api/page/${title}`)
      .then(page => dispatch(updateContents(page.content)))
      .catch(err => dispatch({ type: 'error', error: err }));
  };
}
