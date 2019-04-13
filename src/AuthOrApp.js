import React, { Component } from "react";
import axios from "axios";

import Login from "./login/login";
import App from "./App";
import consts from "./commons/constants";

class AuthOrApp extends Component {
  constructor(props) {
    super(props);
    this.userStorage = JSON.parse(localStorage.getItem(consts.USER_KEY));
    this.state = { showLogin: true };
  }

  componentWillMount() {
    if (!this.userStorage) return <Login />;
    else {
      const { token } = this.userStorage;

      axios
        .post(`${consts.BASE_URL}/users/validateToken`, { token })
        .then(resp => {
          if (!resp.data.valid) {
            localStorage.removeItem(consts.USER_KEY);
          } else {
            axios.defaults.headers.common["authorization"] = token;
            this.setState({ showLogin: false });
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  render() {
    return this.state.showLogin === true ? <Login /> : <App />;
  }
}

export default AuthOrApp;
