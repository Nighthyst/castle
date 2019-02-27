import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <html>
    <head>
        <meta charset="utf-8" />
        <title>Paragraphes</title>
    </head>

    <body>
      <h1> Welcome to Relais&Châteaux x Michelin advisor </h1>
        <p>The purpose of this website is to help you to choose the best property for your week-end<br/>
           To do so, please fill the information bellow so we can process the best choice for you.</p>
        <p>First please choose a starting date :</p>
        <input type="date" name="starting_date"/>
        <p>Then the date you want to leave :</p>
        <input type="date" min="starting_date" name="end_date"/>
        <p>Then how many rooms do you need ? </p>
        <input type="text" name="rooms"/>

        <p>So you want </p>
        <script>
          console.log("Bonjour");

        </script>
    </body>

  </html>,
  document.getElementById('root')
  //<App />, document.getElementById('root')

);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
