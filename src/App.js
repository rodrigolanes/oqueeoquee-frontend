import React, { Component } from "react";
import axios from "axios";
import { Route, Redirect, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Login from "./login/login";
import Piadas from "./piadas/piadas";
import consts from "./commons/constants";

const styles = theme => ({
  root: {
    width: "100%",

    overflowX: "auto"
  },
  grow: {
    flexGrow: 1
  }
});

const ProtectedRoute = ({ isAllowed, ...props }) =>
  isAllowed ? <Route {...props} /> : <Redirect to="/login" />;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuthenticated: false };

    this.handleLoginSucess = this.handleLoginSucess.bind(this);
  }

  componentWillMount() {
    this.userStorage = JSON.parse(localStorage.getItem(consts.USER_KEY));
    if (this.userStorage) {
      const { token } = this.userStorage;
      axios
        .post(`${consts.BASE_URL}/users/validateToken`, { token })
        .then(resp => {
          if (resp.data.valid) {
            axios.defaults.headers.common["authorization"] = token;
            this.setState({ ...this.state, isAuthenticated: true });
            this.props.history.push("piadas");
          } else {
            localStorage.removeItem(consts.USER_KEY);
            this.setState({ ...this.state, isAuthenticated: false });
            this.props.history.push("login");
          }
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      this.props.history.push("login");
    }
  }

  showLogoffButton() {
    if (this.state.isAuthenticated) {
      return (
        <Button color="inherit" onClick={() => this.handleLogoff()}>
          Logoff
        </Button>
      );
    } else {
      return false;
    }
  }

  handleLogoff = () => {
    localStorage.removeItem(consts.USER_KEY);
    this.setState({ ...this.state, isAuthenticated: false });
    this.props.history.push("login");
  };

  handleLoginSucess = () => {
    this.setState({ ...this.state, isAuthenticated: true });
    this.props.history.push("piadas");
  };

  render() {
    return (
      <Paper className={this.props.classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              color="inherit"
              className={this.props.classes.grow}
            >
              O que é o que é?
            </Typography>
            {this.showLogoffButton()}
          </Toolbar>
        </AppBar>
        <Route
          path="/login"
          render={() => <Login handleLoginSucess={this.handleLoginSucess} />}
        />
        <ProtectedRoute
          isAllowed={() => this.state.isAuthenticated}
          path="/piadas"
          component={Piadas}
        />
      </Paper>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(App));
