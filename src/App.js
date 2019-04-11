import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Piadas from "./piadas/piadas";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  }
});

const App = props => {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Piadas />
    </Paper>
  );
};

export default withStyles(styles)(App);
