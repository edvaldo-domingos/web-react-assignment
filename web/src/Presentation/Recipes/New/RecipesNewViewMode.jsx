import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { MainContext } from "../../../ContextProviders/MainContext";
// import GetBrewersDataSource from "../../Data/DataSource/API/GetBrewersDataSource";
// import GetBrewersDataRepository from "../../Domain/Repository/Brewer/GetBrewersRepository";
// import GetRecipesDataRepository from "../../Domain/Repository/Recipe/GetRecipesRepository";
import RecipesDataSource from "../../../Data/DataSource/API/RecipesDataSource";
import DeleteRecipeUseCase from "../../../Domain/UseCase/Recipe/DeleteRecipeUseCase";
import RecipesRepository from "../../../Domain/Repository/Recipe/RecipesRepository";
import { RECIPES_BAS_ROUTE, RECIPE_API_URL } from "../../../utils/constants";
import { isEqual } from "lodash";
// import GetRecipesUseCase from "../../Domain/UseCase/Recipe/GetRecipesUseCase";

export default function RecipesNewViewModel() {
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

  const history = useHistory();
  const { brewers, recipes } = useContext(MainContext);

  const { id } = useParams();
  const [error, setError] = useState(null);
  const [recipe, setRecipe] = useState(initialState);
  const [isSaving, setIsSaving] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");

  useEffect(() => {
    return () => {
      setAlertMessage("");
      setSeverity("");
      setIsSaving(false);
    };
  }, []);

  const onConfirm = async () => {
    const { result, error } = await UseCase.deleteRecipe(id);

    if (result) {
      setIsSaving(!isSaving);
      setAlertMessage("Successfully deleted recipe");
      setSeverity("success");
    }

    setError(error);
  };

  const clearNotification = () => {
    setAlertMessage("");
    setSeverity("");
    setIsSaving(false);
    history.replace(`${RECIPES_BAS_ROUTE}`);
  };

  const handleOnEditClick = () => {};

  const handleOnFormChange = (event) => {
    console.log(event.target.name, event.target.value);
    setRecipe({ ...recipe, [event.target.name]: event.target.value });
  };

  const handleOnCancelClick = () => {
    if (!isFormEdited()) {
      return history.push(`${RECIPES_BAS_ROUTE}`);
    }

    setConfirmMessage(
      "You have unsaved work, would like to proceed cancelling"
    );
  };

  const handleOnConfirm = () => {
    history.push(`${RECIPES_BAS_ROUTE}`);
  };

  const isFormEdited = () => {
    return !isEqual(initialState, recipe);
  };

  const handleOnCancelConfirmDialog = () => {
    setConfirmMessage("");
  };

  return {
    recipe,
    brewers,
    confirmMessage,
    isSaving,
    alertMessage,
    severity,
    setIsSaving,
    handleOnFormChange,
    handleOnEditClick,
    handleOnCancelClick,
    handleOnConfirm,
    handleOnCancelConfirmDialog,
    clearNotification,
  };
}
