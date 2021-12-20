import { useState } from "react";
import { Box, Container, Toolbar, Typography } from "@material-ui/core";
import styled from "styled-components";
import { ViewWrapper } from "../../components/ViewWrapper";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import SelectField from "../../components/SelectField";
import { v4 as uuidv4 } from "uuid";
import dummyData from "./dummy_recipes.json";

const StyledTableCell = styled(TableCell)``;
const StyledTableRow = styled(TableRow)``;
const StyledTableHead = styled(TableHead)`
  ${StyledTableCell} {
    text-transform: capitalize;
    font-weight: 700;
  }
`;

const rows = dummyData;

function RecipesView() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [brewerId, setBrewerId] = useState(0);

  const columns = [
    { id: "title", label: "title", minWidth: 170 },
    {
      id: "bean_type",
      label: "bean type",
      minWidth: 170,
    },
    {
      id: "brew_time",
      label: "brew time",
      minWidth: 170,
    },
    {
      id: "brew_method",
      label: "brew method",
      minWidth: 170,
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <ViewWrapper>
      <SelectField
        handleChange={(event) => setBrewerId(event.target.value)}
        value={brewerId}
        label={"Brewer"}
        options={[
          { name: "All", value: 0, label: "All", id: 0 },
          { name: "Edvaldo", value: 1, label: "Edvaldo", id: 1 },
          { name: "Tester", value: 2, label: "Tester", id: 2 },
          { name: "John", value: 3, label: "John", id: 3 },
        ]}
      />
      <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "20px" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <StyledTableHead>
              <StyledTableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={uuidv4()}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            </StyledTableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <StyledTableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={uuidv4()}
                      onClick={() => console.log(row)}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <StyledTableCell key={uuidv4()} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </StyledTableCell>
                        );
                      })}
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </ViewWrapper>
  );
}

export default RecipesView;
