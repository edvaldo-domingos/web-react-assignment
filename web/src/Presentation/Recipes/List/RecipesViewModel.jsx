import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MainContext } from "../../../ContextProviders/MainContext";
import GetBrewersDataSource from "../../../Data/DataSource/API/BrewersDataSource";
import RecipesDataSource from "../../../Data/DataSource/API/RecipesDataSource";
import GetBrewersDataRepository from "../../../Domain/Repository/Brewer/GetBrewersRepository";
import GetRecipesDataRepository from "../../../Domain/Repository/Recipe/RecipesRepository";
import GetBrewersUseCase from "../../../Domain/UseCase/Brewer/GetBrewersUseCase";
import GetRecipesUseCase from "../../../Domain/UseCase/Recipe/GetRecipesUseCase";
import { RECIPES_BAS_ROUTE } from "../../../utils/constants";

export default function RecipesViewModel() {
  const limit = 5;
  const history = useHistory();
  const { setAppBarTitle } = useContext(MainContext);
  const [error, setError] = useState(0);
  const [brewerId, setBrewerId] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [brewers, setBrewers] = useState([
    { name: "All", value: 0, label: "All", id: 0 },
  ]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [rowsPerPage] = useState(5);

  useEffect(() => {
    setAppBarTitle("Recipes");
  }, []);

  useEffect(() => {
    getRecipes();
  }, [page]);

  useEffect(() => {
    setPage(0);
    handleFilterRecipes();
  }, [brewerId]);

  const UseCase = new GetRecipesUseCase(
    new GetRecipesDataRepository(new RecipesDataSource())
  );

  const BrewerUseCase = new GetBrewersUseCase(
    new GetBrewersDataRepository(new GetBrewersDataSource())
  );

  const getRecipes = async () => {
    const skip = limit * page;
    const { result, error } = await UseCase.getRecipes({ skip, limit });

    if (result && result.length > 0) setRecipes(result);
    setError(error);
  };

  const getBrewers = async () => {
    const { result, error } = await BrewerUseCase.getBrewers({ skip: 0 });

    if (result && result.length > 0) {
      const mappedBrewers = result.map((brewer) => {
        return {
          ...brewer,
          label: brewer.name,
          value: brewer.id,
        };
      });

      mappedBrewers.unshift({ name: "All", value: 0, label: "All", id: 0 });
      setCount(mappedBrewers.length);

      setBrewers(mappedBrewers);
    }
    setError(error);
  };

  const getRecipesCount = async () => {
    const { result, error } = await UseCase.getRecipes({
      skip: 0,
    });

    if (result && result.length > 0) {
      setCount(result.length);
    }
    setError(error);
  };

  const handleFilterRecipes = async () => {
    const brewer = brewers.find((b) => b.id === brewerId);

    if (brewerId !== 0) {
      setRecipes(brewer.recipes);
      return setCount(brewer.recipes.length);
    }

    await getRecipesCount();
    await getRecipes();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleOnChangeBrewer = (event) => {
    setBrewerId(event.target.value);
  };

  const handleRowClick = (id) => {
    history.push(`${RECIPES_BAS_ROUTE}/${id}/info`);
  };

  const handleOnCreateRecipe = (id) => {
    history.push(`${RECIPES_BAS_ROUTE}/new`);
  };

  return {
    recipes,
    error,
    page,
    rowsPerPage,
    count,
    brewerId,
    brewers,
    handleChangePage,
    handleOnChangeBrewer,
    handleOnCreateRecipe,
    handleRowClick,
    setPage,
    getRecipes,
    setBrewerId,
    setCount,
    getRecipesCount,
    getBrewers,
  };
}
