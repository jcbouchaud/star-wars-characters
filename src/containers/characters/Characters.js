import React from "react";
import axios from "axios";
import "./styles.css";
import Loader from "../../components/loader/Loader";
import { Link } from "react-router-dom";

class Characters extends React.Component {
  state = { page: 0, filterInput: null };

  getInput = event => {
    this.setState({ filterInput: event.target.value });
  };

  // GET CHARACTER ID THROUGH ITS API LINK AS IT HAS NO UNIQUE ID

  getCharacterId = link => {
    const index = link;
    const regex = /https:\/\/swapi.co\/api\/people\//gi;
    const newIndex = index.replace(regex, "");
    console.log(newIndex);
    return newIndex;
  };

  // MAP ALL CHARACTERS API URL SO WE CAN ACCESS ALL CHARACTERS IN ONCE

  filterByName = () => {
    const allData =
      this.props.data &&
      this.props.data.map(x =>
        x.results
          .filter(
            character =>
              character.name
                .toLowerCase()
                .indexOf(this.state.filterInput.toLowerCase()) !== -1
          )
          .map(character => (
            <Link
              key={character.url}
              to={`/character/${this.getCharacterId(character.url)}`}
            >
              <li className="character">
                <div>{character.name.toUpperCase()}</div>
              </li>
            </Link>
          ))
      );
    return allData;
  };

  incrementPage = () => {
    if (this.state.page >= 0 && this.state.page < this.props.pages.length - 1) {
      this.setState({ page: this.state.page + 1 });
    }
  };

  decrementPage = () => {
    if (this.state.page > 0 && this.state.page <= this.props.pages.length - 1) {
      this.setState({ page: this.state.page - 1 });
    }
  };

  render() {
    if (this.props.dataIsLoading) {
      return (
        <div>
          <Loader />
        </div>
      );
    } else {
      return (
        <section className="people">
          <div className="container">
            <div>
              <input
                placeholder="Cherchez un personnage"
                onChange={event => this.getInput(event)}
              />
            </div>
            {this.state.filterInput ? (
              <div>
                <ul className="characters">{this.filterByName()}</ul>
              </div>
            ) : (
              <div className="container">
                <div>
                  <ul className="characters">
                    {this.props.data[this.state.page].results.map(character => (
                      <Link
                        key={character.url}
                        to={`/character/${this.getCharacterId(character.url)}`}
                      >
                        <li className="character">
                          <div>{character.name.toUpperCase()}</div>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
                <div>
                  <ul className="pages">
                    <i
                      className="fas fa-chevron-left"
                      onClick={() => this.decrementPage()}
                    />
                    {this.props.pages.map(page => (
                      <li
                        className={
                          this.state.page + 1 === page
                            ? "selected-page"
                            : "page-number"
                        }
                        key={page}
                        onClick={() => this.setState({ page: page - 1 })}
                      >
                        <div>{page}</div>
                      </li>
                    ))}
                    <i
                      className="fas fa-chevron-right"
                      onClick={() => this.incrementPage()}
                    />
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>
      );
    }
  }

  componentDidMount() {
    axios
      .get(`https://swapi.co/api/people/`)
      .then(response => this.props.getData(response.data));
  }
}

export default Characters;
