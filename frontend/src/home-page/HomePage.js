import React from 'react';
import { Link } from 'react-router';

const HomePage = () =>
  <div>
    <h1>Welcome to our Wiki!</h1>
    <p>
      Please feel free to poke around! We talk about <Link to="/page/JavaScript">JavaScript</Link> and <Link to="/page/PythonLanguage">PythonLanguage</Link>.
    </p>
  </div>;

export default HomePage;
