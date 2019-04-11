import React, { Component } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import PiadasList from "./piadasList";

// const BASE_URL = "http://localhost:4000/api/v1";
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const styles = theme => ({
  table: {
    minWidth: 700
  }
});

class Piadas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      currentPage: 1,
      pageSize: 0,
      limit: 10,
      pages: 0,
      total: 0
    };

    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);

    this.refresh();
  }

  refresh(page, limit) {
    if (!page) page = this.state.currentPage;

    if (!limit) {
      limit = this.state.limit;
    } else {
      this.setState({ ...this.setState, limit });
    }

    axios
      .get(`${BASE_URL}/piadas?page=${page}&limit=${limit}`)
      .then(result => this.setState({ ...this.state, ...result.data }));
  }

  handleChangePage(event, page) {
    this.refresh(page + 1);
  }

  handleChangeRowsPerPage(event) {
    const limit = event.target.value;
    this.refresh(1, +limit);
  }

  render() {
    return (
      <PiadasList
        rows={this.state.items}
        rowsPerPage={this.state.limit}
        page={this.state.currentPage}
        total={this.state.total}
        handleChangePage={this.handleChangePage}
        handleChangeRowsPerPage={this.handleChangeRowsPerPage}
      />
    );
  }
}

export default withStyles(styles)(Piadas);
