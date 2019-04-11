import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    height: "40px"
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center"
  },
  item: {
    justifyContent: "center",
    alignItems: "center"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  }
});

const piadasForm = props => {
  const { classes } = props;
  return (
    <form noValidate autoComplete="off">
      <Grid container className={classes.container} spacing={24}>
        <Grid item className={classes.item} xs={12} sm={6} md={4} lg={4}>
          <TextField
            id="standard-name"
            label="Pergunta"
            className={classes.textField}
            value={props.pergunta}
            onChange={props.handleChange("pergunta")}
            margin="normal"
          />
        </Grid>
        <Grid item className={classes.item} xs={12} sm={6} md={4} lg={4}>
          <TextField
            id="standard-name"
            label="Resposta"
            className={classes.textField}
            value={props.resposta}
            onChange={props.handleChange("resposta")}
            margin="normal"
          />
        </Grid>
        <Grid item className={classes.item} xs={12} sm={12} md={4} lg={4}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={props.handleSave}
          >
            Salvar
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Buscar
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={props.handleClear}
          >
            Limpar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default withStyles(styles)(piadasForm);
