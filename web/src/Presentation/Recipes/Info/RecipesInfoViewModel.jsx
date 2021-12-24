import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { MainContext } from "../../../ContextProviders/MainContext";
import RecipesDataSource from "../../../Data/DataSource/API/RecipesDataSource";
import DeleteRecipeUseCase from "../../../Domain/UseCase/Recipe/DeleteRecipeUseCase";
import RecipesRepository from "../../../Domain/Repository/Recipe/RecipesRepository";
import { RECIPES_BAS_ROUTE } from "../../../utils/constants";

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

  const UseCase = new DeleteRecipeUseCase(
    new RecipesRepository(new RecipesDataSource())
  );

  const { recipes, setAppBarTitle } = useContext(MainContext);
  const history = useHistory();
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [recipe, setRecipe] = useState(initialState);
  const [isDeleting, setIsDeleting] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    setAppBarTitle("Recipe Detail");

    return () => {
      setAlertMessage("");
      setSeverity("");
      setIsDeleting(false);
    };
  }, []);

  useEffect(() => {
    const recipe = (recipes || []).find(
      (contextRecipe) => contextRecipe.id === parseInt(id, 10)
    );

    if (recipe) setRecipe(recipe);
  }, [id, recipes]);

  useEffect(() => {
    alertMessage &&
      setTimeout(() => {
        clearNotification();
      }, 3000);
  }, [alertMessage]);

  const onDelete = async () => {
    console.log({ UseCase });
    const { result, error } = await UseCase.deleteRecipe(id);

    if (result) {
      setIsDeleting(!isDeleting);
      setAlertMessage("Successfully deleted recipe");
      setSeverity("success");
    }

    setError(error);
  };

  const clearNotification = () => {
    setAlertMessage("");
    setSeverity("");
    setIsDeleting(false);
    history.replace(`${RECIPES_BAS_ROUTE}`);
  };

  const handleOnBackClick = () => {
    history.push(`${RECIPES_BAS_ROUTE}`);
  };

  const handleOnDeleteClick = () => {
    setIsDeleting(!isDeleting);
  };

  const handleOnConfirm = () => {
    onDelete();
  };
  const handleOnCancel = () => {
    setIsDeleting(false);
  };

  return {
    recipe,
    isDeleting,
    alertMessage,
    severity,
    setIsDeleting,
    handleOnBackClick,
    handleOnDeleteClick,
    handleOnConfirm,
    handleOnCancel,
    clearNotification,
  };
}
