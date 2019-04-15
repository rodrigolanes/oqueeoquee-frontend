import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import AuthOrApp from "./AuthOrApp";
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  showLogoff() {
    const isLoggedIn = this.state.isLoggedIn;
    if (isLoggedIn) {
      return (
        <Button color="inherit" onClick={() => this.handleLogin(false)}>
          Logoff
        </Button>
      );
    }
  }

  handleLogin = isLoggedIn => {
    if (!isLoggedIn) {
      localStorage.removeItem(consts.USER_KEY);
    }
    this.setState({ ...this.state, isLoggedIn });
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
            {this.showLogoff()}
          </Toolbar>
        </AppBar>
        <AuthOrApp
          handleLogin={this.handleLogin}
          isLoggedIn={this.state.isLoggedIn}
        />
      </Paper>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
