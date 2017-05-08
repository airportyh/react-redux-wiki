const WIKI_INITIAL_STATE = {
  contents: '',
  editing: false,
  doesntExist: false
};

export default function reducer(state = WIKI_INITIAL_STATE, action) {
  if (action.type === 'toggle-edit') {
    return {
      ...state,
      editing: !state.editing
    };
  } else if (action.type === 'update-page-contents') {
    return {
      ...state,
      contents: action.newContents,
      doesntExist: false
    };
  } else if (action.type === 'error') {
    if (action.error.status === 404) {
      return {
        ...state,
        contents: '',
        doesntExist: true
      };
    }
  }
  return state;
}
