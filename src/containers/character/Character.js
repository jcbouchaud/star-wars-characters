import React from "react";
import "./styles.css";
import axios from "axios";
import Loader from "../../components/loader/Loader";

class Character extends React.Component {
  state = { data: null, dataIsLoading: true, starships: null };

  render() {
    if (this.state.dataIsLoading) {
      return (
        <div>
          <Loader />
        </div>
      );
    } else {
      return (
        <section className="selected-character">
          <div className="container">
            <div>{this.state.data.name}</div>
            <div>{this.state.data.eye_color}</div>
            <div>{this.state.data.birth_year}</div>
            <div onClick={() => console.log(this.state.starships)}>
              {this.state.data.gender}
            </div>
            <div>
              {this.state.starships &&
                this.state.starships.map((x, index) => (
                  <div key={index}>{x.name}1</div>
                ))}
            </div>
            <div>{this.state.data.created}</div>
            <div>{this.state.data.edited}</div>
          </div>
        </section>
      );
    }
  }
  componentDidMount() {
    axios
      .get(`https://swapi.co/api/people/` + this.props.match.params.id)
      .then(response =>
        this.setState({ data: response.data, dataIsLoading: false })
      );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.data !== this.state.data;
  }

  componentDidUpdate(prevProps, prevState) {
    const starshipsArray = [];
    console.log(this.state.data.starships);
    this.state.data.starships.map(url =>
      axios.get(url).then(response => starshipsArray.push(response.data))
    );
    if (prevState && prevState.starships !== starshipsArray) {
      this.setState({ starships: starshipsArray }, () =>
        console.log(this.state)
      );
    }
  }
}

export default Character;
