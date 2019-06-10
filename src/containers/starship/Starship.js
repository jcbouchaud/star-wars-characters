import React from "react";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import { Link } from "react-router-dom";
import "./styles.css";

class Starship extends React.Component {
  state = { data: null, dataIsLoading: true, pilots: null };

  getPilotData = async () => {
    const pilotsArray = [];
    await this.state.data.pilots.map(url =>
      axios
        .get(url)
        .then(response => pilotsArray.push(response.data))
        .then(() =>
          this.setState({ pilots: pilotsArray, dataIsLoading: false }, () =>
            console.log(this.state.pilots)
          )
        )
    );
  };

  // GET CHARACTER ID THROUGH ITS API LINK AS IT HAS NO UNIQUE ID

  getPilotId = link => {
    const index = link;
    const regex = /https:\/\/swapi.co\/api\/people\//gi;
    const newIndex = index.replace(regex, "");
    console.log(newIndex);
    return newIndex;
  };

  render() {
    if (this.state.dataIsLoading) {
      return (
        <section className="starship-details">
          <div className="container">
            <Loader />
          </div>
        </section>
      );
    } else {
      const { name, model, manufacturer } = this.state.data;
      const { pilots } = this.state;

      return (
        <section className="starship-details">
          <div className="container">
            <div className="thumbnail">
              <div className="info">
                <div>NAME</div>
                <div>{name}</div>
              </div>
              <div className="info">
                <div>MODEL</div>
                <div>{model}</div>
              </div>
              <div className="info">
                <div>MANUFACTURER</div>
                <div>{manufacturer}</div>
              </div>
              <div className="info">
                <div>PILOTS</div>
                <ul>
                  {pilots
                    ? pilots.map(pilot => (
                        <Link
                          key={pilot.url}
                          to={`/character/${this.getPilotId(pilot.url)}`}
                        >
                          <li className="pilot">
                            <div>{pilot.name.toUpperCase()}</div>
                          </li>
                        </Link>
                      ))
                    : "aucun"}
                </ul>
              </div>
            </div>
          </div>
        </section>
      );
    }
  }
  componentDidMount() {
    axios
      .get(`https://swapi.co/api/starships/` + this.props.match.params.id)
      .then(response =>
        this.setState({ data: response.data }, () => {
          this.getPilotData();
        })
      );
  }
}

export default Starship;
