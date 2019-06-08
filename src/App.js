import React from "react";
import Characters from "./containers/characters/Characters";
import Character from "./containers/character/Character";

import Header from "./components/header/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      pages: null,
      dataIsLoading: true
    };
  }
  getData = async data => {
    let array = [];
    let pages = [];
    for (let i = 1; i <= Math.ceil(data.count / data.results.length); i++) {
      await axios
        .get(`https://swapi.co/api/people/?page=${i}`)
        .then(res => array.push(res.data), pages.push(i));
    }
    this.setState({ data: array, pages: pages, dataIsLoading: false });
  };

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
        </Router>
      </div>
    );
  }
}

export default App;
