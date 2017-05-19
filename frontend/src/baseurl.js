let BASEURL = 'http://localhost:4000';
if (location.hostname !== 'localhost') {
  BASEURL = '';
}

export default BASEURL;
