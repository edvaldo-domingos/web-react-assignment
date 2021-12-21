import { useEffect, useState } from "react";
import GetRecipesDataSource from "../../Data/DataSource/API/GetRecipesDataSource";
import GetRecipesDataRepository from "../../Domain/Repository/Recipe/GetRecipesRepository";
import GetRecipesUseCase from "../../Domain/UseCase/Recipe/GetRecipesUseCase";

export default function RecipesViewModel() {
  const limit = 5;
  const [error, setError] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [rowsPerPage] = useState(5);

  useEffect(() => {
    console.log({ page });

    getRecipes();
  }, [page]);

  const UseCase = new GetRecipesUseCase(
    new GetRecipesDataRepository(new GetRecipesDataSource())
  );

  const getRecipes = async () => {
    const skip = limit * page;
    const { result, error } = await UseCase.getRecipes({ skip, limit });

    if (result && result.length > 0) setRecipes(result);
    setError(error);
  };

  const getRecipesCount = async () => {
    const { result, error } = await UseCase.getRecipes({
      skip: 0,
    });

    if (result && result.length > 0) setCount(result.length);
    setError(error);
  };

  return {
    recipes,
    error,
    page,
    rowsPerPage,
    count,
    setPage,
    getRecipes,
    setCount,
    getRecipesCount,
  };
}
