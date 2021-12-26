import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MainContext } from "../../../ContextProviders/MainContext";
import BrewersDataSource from "../../../Data/DataSource/API/BrewersDataSource";
import GetBrewersUseCase from "../../../Domain/UseCase/Brewer/GetBrewersUseCase";
import BrewersRepository from "../../../Domain/Repository/Brewer/BrewersRepository";
import { BREWERS_BAS_ROUTE } from "../../../utils/constants";

export default function BrewersListViewModel() {
  const limit = 5;
  const history = useHistory();
  const { setAppBarTitle } = useContext(MainContext);
  const [error, setError] = useState(null);
  const [brewers, setBrewers] = useState([
    { name: "All", value: 0, label: "All", id: 0 },
  ]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [rowsPerPage] = useState(5);
  const [severity, setSeverity] = useState("success");

  useEffect(() => {
    setAppBarTitle && setAppBarTitle("Brewers");
  }, []);

  useEffect(() => {
    getBrewers();
  }, [page]);

  useEffect(() => {
    error &&
      setTimeout(() => {
        setError("");
        setSeverity("success");
      }, 5000);
  }, [error]);

  const BrewerUseCase = new GetBrewersUseCase(
    new BrewersRepository(new BrewersDataSource())
  );

  const getBrewers = async () => {
    const skip = limit * page;
    const { result, error } = await BrewerUseCase.getBrewers({ skip, limit });

    if (result && result.length > 0) setBrewers(result);
    if (error) {
      setError(error);
      setSeverity("error");
    }
  };

  const getBrewersCount = async () => {
    const { result, error } = await BrewerUseCase.getBrewers({
      skip: 0,
    });

    if (result && result.length > 0) {
      setCount(result.length);
    }
    if (error) {
      setError(error);
      setSeverity("error");
    }
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
    error,
    severity,
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
