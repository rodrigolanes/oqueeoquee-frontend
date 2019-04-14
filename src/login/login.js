import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import consts from "../commons/constants";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  loginIcons: { marginTop: theme.spacing.unit * 2 },
  paper: {
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  facebookButton: {
    marginLeft: theme.spacing.unit * 3
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };

    this.responseFacebookSucess = this.responseFacebookSucess.bind(this);
    this.responseGoogleFailure = this.responseGoogleFailure.bind(this);
    this.responseGoogleSucess = this.responseGoogleSucess.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  responseGoogleSucess = response => {
    const { tokenId } = response;
    axios
      .post(`${consts.BASE_URL}/users/googleLogin`, { token: tokenId })
      .then(resp => {
        localStorage.setItem(consts.USER_KEY, JSON.stringify(resp.data));
        axios.defaults.headers.common["authorization"] = resp.data.token;
        this.props.handleLoginSucess();
      })
      .catch(e => {
        console.log(e);
      });
    //
  };

  responseGoogleFailure = response => {
    console.log(response);
  };

  responseFacebookSucess = response => {
    const { accessToken } = response;
    axios
      .post(`${consts.BASE_URL}/users/facebookLogin`, { token: accessToken })
      .then(resp => {
        localStorage.setItem(consts.USER_KEY, JSON.stringify(resp.data));
        axios.defaults.headers.common["authorization"] = resp.data.token;
        this.props.handleLoginSucess();
      })
      .catch(e => {
        console.log(e);
      });
    //
  };

  // responseFacebook = response => {
  //   console.log(response);
  // };

  handleChange(event, field) {
    this.setState({ ...this.state, [field]: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    axios
      .post(`${consts.BASE_URL}/users/login`, this.state)
      .then(resp => {
        localStorage.setItem(consts.USER_KEY, JSON.stringify(resp.data));
        axios.defaults.headers.common["authorization"] = resp.data.token;
        this.props.handleLoginSucess();
      })
      .catch(e => {
        console.log(e);
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                value={this.state.email}
                onChange={e => this.handleChange(e, "email")}
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={e => this.handleChange(e, "password")}
              />
            </FormControl>
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
          </form>
          <div className={classes.loginIcons}>
            <GoogleLogin
              clientId="261371279843-puia2ushkcotak6dkpr8mdsk95kor4qd.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={this.responseGoogleSucess}
              onFailure={this.responseGoogleFailure}
              cookiePolicy={"single_host_origin"}
              render={renderProps => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="icon-button google-plus"
                >
                  <i className="icon-google-plus" />
                  <span />
                </button>
              )}
            />
            <FacebookLogin
              appId="238298849588299"
              fields="name,email,picture"
              callback={this.responseFacebookSucess}
              render={renderProps => (
                <button
                  onClick={renderProps.onClick}
                  className="icon-button facebook"
                >
                  <i className="icon-facebook" />
                  <span />
                </button>
              )}
            />
          </div>
        </Paper>
      </main>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
