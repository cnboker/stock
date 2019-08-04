import React from "react";
import {Link } from "react-router-dom";

export default class Menu extends React.Component {
  render() {
    return (
      <nav className="my-2 my-md-0 mr-md-3">
        <Link className="p-2 text-dark" to="/industry">
          行业
        </Link>
     
        <Link className="p-2 text-dark" to="/stock">
          个股
        </Link>
      
      </nav>
    );
  }
}
