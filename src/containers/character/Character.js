import React from "react";
import "./styles.css";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import { Link } from "react-router-dom";

class Character extends React.Component {
  state = { data: null, dataIsLoading: true, starships: null };

  // ONCE CHARACTER API DATA IS LOADED, GET THE STARSHIPS API LINKS INTO IT, THEN CALL THEM

  getStarshipsData = async () => {
    const starshipsArray = [];
    await this.state.data.starships.map(url =>
      axios
        .get(url)
        .then(response => starshipsArray.push(response.data))
        .then(() =>
          this.setState({ starships: starshipsArray }, () =>
            console.log(this.state.starships)
          )
        )
    );
  };

  // GET CHARACTER ID THROUGH ITS API LINK AS IT HAS NO UNIQUE ID IN ITS OBJECT

  getStarshipId = link => {
    const index = link;
    const regex = /https:\/\/swapi.co\/api\/starships\//gi;
    const newIndex = index.replace(regex, "");
    return newIndex;
  };

  render() {
    const { dataIsLoading } = this.state;
    if (dataIsLoading) {
      return (
        <section className="selected-character">
          <div className="container">
            <Loader />
          </div>
        </section>
      );
    } else {
      const {
        name,
        eye_color,
        birth_year,
        gender,
        created,
        edited
      } = this.state.data;

      const { starships } = this.state;
      return (
        <section className="selected-character">
          <div className="container">
            <div className="thumbnail">
              <div className="info">
                <div>NAME</div>
                <div>{name.toUpperCase()}</div>
              </div>
              <div className="info">
                <div>EYE COLOR</div>
                <div>{eye_color}</div>
              </div>
              <div className="info">
                <div>BIRTH YEAR</div>
                <div>{birth_year}</div>
              </div>
              <div className="info">
                <div>GENDER</div>
                <div>{gender}</div>
              </div>
              <div className="info">
                <div>STARSHIPS</div>
                <div>
                  {starships
                    ? starships.map(starship => (
                        <Link
                          key={starship.url}
                          to={`/starship/${this.getStarshipId(starship.url)}`}
                        >
                          <li className="starship">
                            <div>{starship.name.toUpperCase()}</div>
                          </li>
                        </Link>
                      ))
                    : "n/a"}
                </div>
              </div>
              <div className="info">
                <div>CREATION DATE</div>
                <div>{created.substr(0, 10)}</div>
              </div>
              <div className="info">
                <div>LAST EDITION DATE</div>
                <div>{edited.substr(0, 10)}</div>
              </div>
            </div>
          </div>
        </section>
      );
    }
  }

  componentDidMount() {
    axios
      .get(`https://swapi.co/api/people/` + this.props.match.params.id)
      .then(response =>
        this.setState({ data: response.data, dataIsLoading: false }, () => {
          this.getStarshipsData();
        })
      );
  }
}

export default Character;
