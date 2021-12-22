import { createContext, useEffect, useState } from "react";
import RecipesDataSource from "../Data/DataSource/API/RecipesDataSource";
import GetRecipesDataRepository from "../Domain/Repository/Recipe/GetRecipesRepository";
import GetRecipesUseCase from "../Domain/UseCase/Recipe/GetRecipesUseCase";

export const RecipesContext = createContext({});

export const RecipesContextProvider = ({ children }) => {
  const limit = 5;

  const UseCase = new GetRecipesUseCase(
    new GetRecipesDataRepository(new RecipesDataSource())
  );

  useEffect(() => {
    const fetchData = async () => {
      await getRecipes();
    };

    fetchData();
  }, []);

  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(0);

  const getRecipes = async (page = 0) => {
    const skip = limit * page;
    const { result, error } = await UseCase.getRecipes({ skip, limit });

    if (result && result.length > 0) setRecipes(result);
    setError(error);
  };

  return (
    <RecipesContext.Provider value={{ recipes, getRecipes }}>
      {children}
    </RecipesContext.Provider>
  );
};
