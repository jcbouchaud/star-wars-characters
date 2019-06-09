import React from "react";
import "./styles.scss";
import logo from "../../assets/img/logo.png";

class Loader extends React.Component {
  state = {};
  render() {
    return (
      <div className="loader">
        <img src={logo} alt="Star Wars logo" className="animated-logo" />
      </div>
    );
  }
}

export default Loader;
