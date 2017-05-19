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
import SignUpContainer from './signup/SignUp';
import LoginContainer from './login/Login';
import ReduxThunk from 'redux-thunk';
import loginReducer from './login/Login.reducer';
import { persistStore, autoRehydrate } from 'redux-persist';
import CookieStorage from 'redux-persist-cookie-storage';

const AppLayout = ({ login, children }) =>
  <div>
    <ul className="nav">
      <li>
      <IndexLink to="/">Home</IndexLink>
      </li>
      <li><Link to="/page/JavaScript" activeClassName="active">JavaScript</Link></li>
      <li><Link to="/page/PythonLanguage" activeClassName="active">Python</Link></li>
      <li><Link to="/signup">Sign up</Link></li>
      <li><Link to="/login">Login</Link></li>
      {login ? `Welcome ${login.name}!` : null}
    </ul>
    {children}
  </div>;

const AppLayoutContainer = ReactRedux.connect(
  state => ({ login: state.login }),
  null
)(AppLayout);

const reducer = Redux.combineReducers({
  // routing: ReactRouterRedux.routerReducer,
  wikiPage: wikiPageReducer,
  login: loginReducer
});

const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  Redux.compose(
    Redux.applyMiddleware(ReduxThunk),
    autoRehydrate()
  )
);

persistStore(store, { storage: new CookieStorage() })

// const history = ReactRouterRedux.syncHistoryWithStore(hashHistory, store);
const history = hashHistory;

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <Router history={history}>
      <Route path="/" component={AppLayoutContainer}>
        <IndexRoute component={HomePage}/>
        <Route path="page/:title" component={WikiPageContainer}/>
        <Route path="signup"
          component={SignUpContainer}/>
        <Route path="login"
          component={LoginContainer}/>
      </Route>
    </Router>
  </ReactRedux.Provider>,
  document.getElementById('root')
);
