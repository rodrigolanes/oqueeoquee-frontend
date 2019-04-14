import React, { Component } from "react";
import axios from "axios";

import Login from "./login/login";
import Piadas from "./piadas/piadas";
import consts from "./commons/constants";

class AuthOrApp extends Component {
  constructor(props) {
    super(props);
    this.userStorage = JSON.parse(localStorage.getItem(consts.USER_KEY));
    this.state = { showComponent: "" };

    this.handleLoginSucess = this.handleLoginSucess.bind(this);
  }

  componentWillMount() {
    if (!this.userStorage) this.setState({ showComponent: "login" });
    else {
      const { token } = this.userStorage;

      axios
        .post(`${consts.BASE_URL}/users/validateToken`, { token })
        .then(resp => {
          if (!resp.data.valid) {
            localStorage.removeItem(consts.USER_KEY);
            this.setState({ showComponent: "login" });
          } else {
            axios.defaults.headers.common["authorization"] = token;
            this.setState({ showComponent: "piadas" });
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  handleLoginSucess() {
    this.setState({ showComponent: "piadas" });
  }

  render() {
    switch (this.state.showComponent) {
      case "login":
        return <Login handleLoginSucess={this.handleLoginSucess} />;
      case "piadas":
        return <Piadas />;
      default:
        return null;
    }
  }
}

export default AuthOrApp;
