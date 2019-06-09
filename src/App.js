import React from "react";
import Characters from "./containers/characters/Characters";
import Character from "./containers/character/Character";
import Starship from "./containers/starship/Starship";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Header />
          <Route
            exact
            path="/"
            render={() => {
              return <Characters getData={this.getData} {...this.state} />;
            }}
          />
          <Route
            exact
            path="/character/:id"
            render={props => {
              return <Character {...this.state} {...props} />;
            }}
          />
          <Route
            exact
            path="/starship/:id"
            render={props => {
              return <Starship {...this.state} {...props} />;
            }}
          />
        </Router>
      </div>
    );
  }
}

export default App;
