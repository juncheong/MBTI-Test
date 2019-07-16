import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import {Route, Switch} from "react-router-dom";
import Test from './Test/Test';
import Result from './Result/Result';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Test}/>
        <Route
          exact
          path="/result/:id"
          render={(routeProps) =>
            <Result {...routeProps}/>
          }
        />
      </Switch>
    </div>
  );
}

export default App;
