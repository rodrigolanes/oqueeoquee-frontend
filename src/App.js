import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import AuthOrApp from "./AuthOrApp";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  grow: {
    flexGrow: 1
  }
});

const App = props => {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            O que é o que é?
          </Typography>
        </Toolbar>
      </AppBar>
      <AuthOrApp />
    </Paper>
  );
};

export default withStyles(styles)(App);
