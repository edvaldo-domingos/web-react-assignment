import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MainContext } from "../../../ContextProviders/MainContext";
import GetBrewersDataSource from "../../../Data/DataSource/API/BrewersDataSource";
import GetBrewersDataRepository from "../../../Domain/Repository/Brewer/GetBrewersRepository";
import GetBrewersUseCase from "../../../Domain/UseCase/Brewer/GetBrewersUseCase";
import { BREWERS_BAS_ROUTE } from "../../../utils/constants";

export default function BrewersListViewModel() {
  const limit = 5;
  const history = useHistory();
  // const { setAppBarTitle } = useContext(MainContext);
  const [error, setError] = useState(0);
  const [brewers, setBrewers] = useState([
    { name: "All", value: 0, label: "All", id: 0 },
  ]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [rowsPerPage] = useState(5);

  useEffect(() => {
    // setAppBarTitle("Brewers");
  }, []);

  useEffect(() => {
    getBrewers();
  }, [page]);

  const BrewerUseCase = new GetBrewersUseCase(
    new GetBrewersDataRepository(new GetBrewersDataSource())
  );

  const getBrewers = async () => {
    const skip = limit * page;
    const { result, error } = await BrewerUseCase.getBrewers({ skip, limit });

    if (result && result.length > 0) setBrewers(result);
    setError(error);
  };

  const getBrewersCount = async () => {
    const { result, error } = await BrewerUseCase.getBrewers({
      skip: 0,
    });

    if (result && result.length > 0) {
      setCount(result.length);
    }
    setError(error);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowClick = (id) => {
    history.push(`${BREWERS_BAS_ROUTE}/${id}/info`);
  };

  const handleOnCreateBrewer = (id) => {
    history.push(`${BREWERS_BAS_ROUTE}/new`);
  };

  return {
    page,
    count,
    rowsPerPage,
    brewers,
    handleChangePage,
    handleOnCreateBrewer,
    handleRowClick,
    getBrewersCount,
    getBrewers,
  };
}
