import React from "react";
import Moment from "react-moment";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import "moment/locale/pt-br";

import TablePaginationActions from "../commons/tablePaginationActions";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

const PiadasList = props => {
  const { classes, rows, rowsPerPage, page, total } = props;

  const renderRows = () => {
    const list = rows || [];
    return list.map(piada => (
      <TableRow key={piada._id}>
        <TableCell>{piada.pergunta}</TableCell>
        <TableCell>{piada.resposta}</TableCell>
        <TableCell>
          <Moment locale="pt-br" format="L LT">
            {piada.createdAt}
          </Moment>
        </TableCell>
        <TableCell>
          {" "}
          <Moment locale="pt-br" format="L LT">
            {piada.updatedAt}
          </Moment>
        </TableCell>
        <TableCell />
      </TableRow>
    ));
  };

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Pergunta</TableCell>
          <TableCell>Resposta</TableCell>
          <TableCell>Criada</TableCell>
          <TableCell>Atualizada</TableCell>
          <TableCell>Ações</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{renderRows()}</TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[10, 20, 50, 99]}
            colSpan={5}
            count={total}
            rowsPerPage={rowsPerPage}
            page={page - 1}
            SelectProps={{
              native: true
            }}
            onChangePage={props.handleChangePage}
            onChangeRowsPerPage={props.handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default withStyles(styles)(PiadasList);
