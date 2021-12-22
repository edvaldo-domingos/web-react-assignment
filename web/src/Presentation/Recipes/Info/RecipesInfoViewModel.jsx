import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { RecipesContext } from "../../../ContextProviders/RecipesContext";
// import GetBrewersDataSource from "../../Data/DataSource/API/GetBrewersDataSource";
// import GetRecipesDataSource from "../../Data/DataSource/API/GetRecipesDataSource";
// import GetBrewersDataRepository from "../../Domain/Repository/Brewer/GetBrewersRepository";
// import GetRecipesDataRepository from "../../Domain/Repository/Recipe/GetRecipesRepository";
// import GetBrewersUseCase from "../../Domain/UseCase/Brewer/GetBrewersUseCase";
// import GetRecipesUseCase from "../../Domain/UseCase/Recipe/GetRecipesUseCase";

export default function RecipesInfoModel() {
  const initialState = {
    title: "",
    description: "",
    bean_type: "",
    brew_time: 0,
    brew_method: "",
    taste_notes: "",
    tags: "",
    id: 0,
    brewer_id: 0,
    brewer: "",
  };

  const { recipes } = useContext(RecipesContext);
  const history = useHistory();
  const { id } = useParams();
  const [recipe, setRecipe] = useState(initialState);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    return () => {
      setIsDeleted(false);
      setIsDeleting(false);
    };
  }, []);

  useEffect(() => {
    const recipe = recipes.find(
      (contextRecipe) => contextRecipe.id === parseInt(id, 10)
    );

    if (recipe) setRecipe(recipe);
  }, [id, recipes]);

  const handleOnEditClick = (event, newPage) => {
    history.push(`{}`);
  };

  const handleOnDeleteClick = (event) => {
    setIsDeleting(!isDeleting);
  };

  const handleOnConfirm = () => {
    setIsDeleting(false);
  };
  const handleOnCancel = () => {
    setIsDeleting(false);
  };

  return {
    recipe,
    isDeleting,
    handleOnEditClick,
    handleOnDeleteClick,
    handleOnConfirm,
    handleOnCancel,
  };
}
