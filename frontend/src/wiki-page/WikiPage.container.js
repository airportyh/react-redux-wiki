import * as actions from './WikiPage.actions';
import WikiPage from './WikiPage';
import * as ReactRedux from 'react-redux';

const WikiPageContainer = ReactRedux.connect(
  state => (state.wikiPage),
  actions
)(WikiPage);

export default WikiPageContainer;
