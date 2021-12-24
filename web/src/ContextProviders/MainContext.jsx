import { createContext, useEffect, useState } from "react";
import RecipesDataSource from "../Data/DataSource/API/RecipesDataSource";
import RecipesDataRepository from "../Domain/Repository/Recipe/RecipesRepository";
import BrewersRepository from "../Domain/Repository/Brewer/BrewersRepository";
import GetRecipesUseCase from "../Domain/UseCase/Recipe/GetRecipesUseCase";
import GetBrewersUseCase from "../Domain/UseCase/Brewer/GetBrewersUseCase";
import BrewersDataSource from "../Data/DataSource/API/BrewersDataSource";

export const MainContext = createContext({});

export const MainContextProvider = ({ children }) => {
  const limit = 5;

  const RecipeUseCase = new GetRecipesUseCase(
    new RecipesDataRepository(new RecipesDataSource())
  );

  const BrewerUseCase = new GetBrewersUseCase(
    new BrewersRepository(new BrewersDataSource())
  );

  const [recipes, setRecipes] = useState([]);
  const [brewers, setBrewers] = useState([{ label: "All", value: "all" }]);
  const [error, setError] = useState(0);
  const [appBarTile, setAppBarTitle] = useState("Recipes");

  useEffect(() => {
    const fetchData = async () => {
      await getBrewers();
      await getRecipes(0, 0);
    };

    fetchData();
  }, []);

  useEffect(() => {}, [brewers]);

  const getRecipes = async (page = 0, limit = 0) => {
    const skip = limit * page;
    const { result, error } = await RecipeUseCase.getRecipes({ skip, limit });

    if (result && result.length > 0) setRecipes(result);
    setError(error);
  };

  const getBrewers = async (page = 0) => {
    const skip = limit * page;
    const { result, error } = await BrewerUseCase.getBrewers({ skip, limit });

    if (result && result.length > 0) {
      const mappedBrewers = result.map((brewer) => {
        return {
          ...brewer,
          label: brewer.name,
          value: brewer.id,
        };
      });

      setBrewers(mappedBrewers);
    }

    setError(error);
  };

  return (
    <MainContext.Provider
      value={{ recipes, getRecipes, brewers, appBarTile, setAppBarTitle }}
    >
      {children}
    </MainContext.Provider>
  );
};
