import { createContext, useEffect, useState } from "react";
import RecipesDataSource from "../Data/DataSource/API/RecipesDataSource";
import RecipesDataRepository from "../Domain/Repository/Recipe/RecipesRepository";
import GetRecipesUseCase from "../Domain/UseCase/Recipe/GetRecipesUseCase";
import GetBrewersUseCase from "../Domain/UseCase/Brewer/GetBrewersUseCase";
import BrewersDataRepository from "../Domain/Repository/Brewer/GetBrewersRepository";
import BrewersDataSource from "../Data/DataSource/API/GetBrewersDataSource";

export const MainContext = createContext({});

export const MainContextProvider = ({ children }) => {
  const limit = 5;

  const RecipeUseCase = new GetRecipesUseCase(
    new RecipesDataRepository(new RecipesDataSource())
  );

  const BrewerUseCase = new GetBrewersUseCase(
    new BrewersDataRepository(new BrewersDataSource())
  );

  const [recipes, setRecipes] = useState([]);
  const [brewers, setBrewers] = useState([{ label: "All", value: "all" }]);
  const [error, setError] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      await getBrewers();
      await getRecipes();
    };

    fetchData();
  }, []);

  useEffect(() => {}, [brewers]);

  const getRecipes = async (page = 0) => {
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
    <MainContext.Provider value={{ recipes, getRecipes, brewers }}>
      {children}
    </MainContext.Provider>
  );
};