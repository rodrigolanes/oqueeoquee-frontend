import React, { Component } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import PiadasForm from "./piadasForm";
import PiadasList from "./piadasList";
import consts from "../commons/constants";

const styles = theme => ({
  table: {
    minWidth: 400
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
      total: 0,
      piada: {
        id: "",
        pergunta: "",
        resposta: ""
      }
    };

    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleClear = this.handleClear.bind(this);

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
      .get(`${consts.BASE_URL}/piadas?page=${page}&limit=${limit}`)
      .then(result => this.setState({ ...this.state, ...result.data }));
  }

  handleChangePage(event, page) {
    this.refresh(page + 1);
  }

  handleChangeRowsPerPage(event) {
    const limit = event.target.value;
    this.refresh(1, +limit);
  }

  handleChange = name => event => {
    const novaPiada = { ...this.state.piada, [name]: event.target.value };
    this.setState({ ...this.state, piada: novaPiada });
  };

  handleEdit(piada) {
    this.setState({
      ...this.state,
      piada: {
        id: piada._id,
        pergunta: piada.pergunta,
        resposta: piada.resposta
      }
    });
  }

  handleSearch = () => {
    const { pergunta, resposta } = this.state.piada;
    axios
      .get(`${consts.BASE_URL}/piadas`, {
        pergunta,
        resposta
      })
      .then(result => this.setState({ ...this.state, ...result.data }));
  };

  handleAdd = () => {
    const { pergunta, resposta } = this.state.piada;
    axios
      .post(`${consts.BASE_URL}/piadas`, {
        pergunta,
        resposta
      })
      .then(result => this.handleClear());
  };

  handleUpdate = () => {
    const { id, pergunta, resposta } = this.state.piada;
    axios
      .put(`${consts.BASE_URL}/piadas/${id}`, {
        pergunta,
        resposta
      })
      .then(result => this.handleClear());
  };

  handleSave = () => {
    if (this.state.piada.id) {
      this.handleUpdate();
    } else {
      this.handleAdd();
    }
  };

  handleDelete = id => {
    axios
      .delete(`${consts.BASE_URL}/piadas/${id}`)
      .then(result => this.refresh());
  };

  handleClear = () => {
    this.setState({
      ...this.state,
      piada: {
        id: "",
        pergunta: "",
        resposta: ""
      }
    });
    this.refresh();
  };

  render() {
    return (
      <>
        <PiadasForm
          pergunta={this.state.piada.pergunta}
          resposta={this.state.piada.resposta}
          handleChange={this.handleChange}
          handleSave={this.handleSave}
          handleClear={this.handleClear}
          handleSearch={this.handleSearch}
        />
        <PiadasList
          rows={this.state.items}
          rowsPerPage={this.state.limit}
          page={this.state.currentPage}
          total={this.state.total}
          handleChangePage={this.handleChangePage}
          handleChangeRowsPerPage={this.handleChangeRowsPerPage}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
        />
      </>
    );
  }
}

export default withStyles(styles)(Piadas);
