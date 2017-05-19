

export default function reducer(state = null, action) {
  if (action.type === 'auth-success') {
    return action.data;
  } else {
    return state;
  }
}
