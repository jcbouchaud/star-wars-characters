import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

class Header extends React.Component {
  state = {};
  render() {
    return (
      <header>
        <div className="container">
          <nav>
            <Link to="/">
              <li>CHARACTERS</li>
            </Link>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
