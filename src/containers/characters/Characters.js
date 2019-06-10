import React from "react";
import axios from "axios";
import "./styles.css";
import Loader from "../../components/loader/Loader";
import { Link } from "react-router-dom";

class Characters extends React.Component {
  state = {
    characters: null,
    pages: null,
    page: 0,
    dataIsLoading: true,
    filterInput: null
  };

  // GET DATA FROM ALL API's

  getData = async data => {
    let array = []; // IN ORDER TO PUSH ALL API's DATA IN A SINGLE ARRAY
    let pages = []; //NUMBER OF PAGES IS EQUAL TO NUMBER OF API's TO CALL
    for (let i = 1; i <= Math.ceil(data.count / data.results.length); i++) {
      await axios
        .get(`https://swapi.co/api/people/?page=${i}`)
        .then(res => array.push(res.data), pages.push(i));
    }
    this.setState({ characters: array, pages: pages, dataIsLoading: false });
  };

  getInput = event => {
    this.setState({ filterInput: event.target.value });
  };

  // GET CHARACTER ID THROUGH ITS API LINK AS IT HAS NO UNIQUE ID
  getCharacterId = link => {
    const index = link;
    const regex = /https:\/\/swapi.co\/api\/people\//gi;
    const newIndex = index.replace(regex, "");
    return newIndex;
  };

  // MAP ALL CHARACTERS API URL SO WE CAN ACCESS ALL CHARACTERS IN ONCE
  filterByName = () => {
    const { characters, filterInput } = this.state;
    const allData =
      characters &&
      characters.map(x =>
        x.results
          .filter(
            character =>
              character.name
                .toLowerCase()
                .indexOf(filterInput.toLowerCase()) !== -1
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
    const { page, pages } = this.state;

    if (page >= 0 && page < pages.length - 1) {
      this.setState({ page: page + 1 });
    }
  };

  decrementPage = () => {
    const { page, pages } = this.state;
    if (page > 0 && page <= pages.length - 1) {
      this.setState({ page: page - 1 });
    }
  };

  render() {
    const { dataIsLoading } = this.state;
    if (dataIsLoading) {
      return (
        <section className="people">
          <div className="container">
            <Loader />
          </div>
        </section>
      );
    } else {
      const { pages, characters, page, filterInput } = this.state;
      return (
        <section className="people">
          <div className="container">
            <div>
              <input
                placeholder="Cherchez un personnage"
                onChange={event => this.getInput(event)}
              />
            </div>
            {/* IF FILTER INPUT IS USED, ALL DATA WILL BE DISPLAYED IN A SIGNLE PAGE, WHILE REGULAR DATA WILL BE DISPLAYED IN PAGES */}
            {filterInput ? (
              <div>
                <ul className="characters">{this.filterByName()}</ul>
              </div>
            ) : (
              <div className="container">
                <div>
                  <ul className="characters">
                    {characters[page].results.map(character => (
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
                    {pages.map(x => (
                      <li
                        className={
                          page + 1 === x ? "selected-page" : "page-number"
                        }
                        key={x}
                        onClick={() => this.setState({ page: x - 1 })}
                      >
                        <div>{x}</div>
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
      .then(response => this.getData(response.data));
  }
}

export default Characters;
