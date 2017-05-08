import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

  import { Router, Route, IndexRoute, Link, IndexLink, hashHistory } from 'react-router';


import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';
import * as ReactRouterRedux from 'react-router-redux';
import wikiPageReducer from './wiki-page/WikiPage.reducer';
import WikiPageContainer from './wiki-page/WikiPage.container';
import HomePage from './home-page/HomePage';
import ReduxThunk from 'redux-thunk';

const AppLayout = ({ children }) =>
  <div>
    <ul className="nav">
      <li>

      <IndexLink to="/">Home</IndexLink>

      </li>

      <li><Link to="/page/JavaScript" activeClassName="active">JavaScript</Link></li>


      <li><Link to="/page/PythonLanguage" activeClassName="active">Python</Link></li>
    </ul>
    {children}
  </div>;

const reducer = Redux.combineReducers({
  // routing: ReactRouterRedux.routerReducer,
  wikiPage: wikiPageReducer
});

const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  Redux.applyMiddleware(ReduxThunk)
);

// const history = ReactRouterRedux.syncHistoryWithStore(hashHistory, store);
const history = hashHistory;

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <Router history={history}>
      <Route path="/" component={AppLayout}>
        <IndexRoute component={HomePage}/>
        <Route path="page/:title" component={WikiPageContainer}/>
      </Route>
    </Router>
  </ReactRedux.Provider>,
  document.getElementById('root')
);
