import React, { Component } from "react";
import { Route,Redirect} from "react-router-dom";

import Menu from "./menu";
import IndustryStock from "./charts/industryStock";
import XuqiuStock from "./charts/xuqiuStock";
class App extends Component {
  
  componentDidMount() {}

  render() {
    return (
      <div>
        <Menu />
        <div className="container-fluid">
            <Route exact path="/industy" component={IndustryStock} />
            <Route exact path="/stock" component={XuqiuStock} />
            <Redirect from="/" to="/industy"/>
        </div>
      </div>
    );
  }
}

export default App;
