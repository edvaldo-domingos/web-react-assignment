import { useEffect } from "react";
import styled from "styled-components";
import { ViewWrapper } from "../../../components/ViewWrapper";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import SelectField from "../../../components/SelectField";
import useViewModel from "./RecipesViewModel";
import { v4 as uuidv4 } from "uuid";
import { ICONS } from "../../../utils/icons";
import { ACTION_BUTTONS } from "../../../utils/constants";
import IconButton from "@mui/material/IconButton";
import { Grid } from "@material-ui/core";
import BasicAlert from "../../../components/Alert";

const StyledTableCell = styled(TableCell)``;
const StyledTableRow = styled(TableRow)``;
const StyledTableHead = styled(TableHead)`
  ${StyledTableCell} {
    text-transform: capitalize;
    font-weight: 700;
  }
`;

function RecipesView() {
  const {
    recipes,
    page,
    count,
    rowsPerPage,
    brewerId,
    brewers,
    severity,
    error,
    handleChangePage,
    handleOnChangeBrewer,
    handleOnCreateRecipe,
    handleRowClick,
    getRecipesCount,
    getRecipes,
    getBrewers,
  } = useViewModel();

  useEffect(() => {
    async function fetchData() {
      await getBrewers();
      await getRecipesCount();
      await getRecipes();
    }

    fetchData();
  }, []);

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
    {
      id: "created",
      minWidth: 170,
      align: "right",
      component: (
        <IconButton
          variant="outlined"
          size="medium"
          onClick={handleOnCreateRecipe}
          color="success"
        >
          {ICONS[ACTION_BUTTONS.create.name]}
        </IconButton>
      ),
    },
  ];

  return (
    <ViewWrapper>
      <SelectField
        handleChange={handleOnChangeBrewer}
        value={brewerId}
        label={"Brewer"}
        options={brewers}
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
                    {column?.label && column?.label}
                    {column?.component}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            </StyledTableHead>
            <TableBody>
              {recipes.map((row) => {
                return (
                  <StyledTableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={uuidv4()}
                    onClick={() => handleRowClick(row.id)}
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
          rowsPerPageOptions={[5]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
        <Grid container style={{ marginTop: "20px" }}>
          {error && <BasicAlert message={error} severity={severity} />}
        </Grid>
      </Paper>
    </ViewWrapper>
  );
}

export default RecipesView;
