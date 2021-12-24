import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MainContext } from "../../../ContextProviders/MainContext";
import RecipesDataSource from "../../../Data/DataSource/API/RecipesDataSource";
import CreateRecipeUseCase from "../../../Domain/UseCase/Recipe/CreateRecipeUseCase";
import RecipesRepository from "../../../Domain/Repository/Recipe/RecipesRepository";
import { RECIPES_BAS_ROUTE } from "../../../utils/constants";
import { isEqual, reduce } from "lodash";

export default function RecipesNewViewModel() {
  const initialState = {
    title: "",
    description: "",
    bean_type: "",
    brew_time: 0,
    brew_method: "",
    taste_notes: "",
    tags: "",
    brewer_id: "",
  };

  const UseCase = new CreateRecipeUseCase(
    new RecipesRepository(new RecipesDataSource())
  );

  const history = useHistory();
  const { brewers, getRecipes, setAppBarTitle } = useContext(MainContext);

  const [error, setError] = useState(null);
  const [recipe, setRecipe] = useState(initialState);
  const [isSaving, setIsSaving] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");

  useEffect(() => {
    setAppBarTitle("Create a New Recipe");
    return () => {
      setAlertMessage("");
      setSeverity("");
      setIsSaving(false);
    };
  }, []);

  useEffect(() => {
    alertMessage &&
      setTimeout(() => {
        clearNotification();
      }, 3000);
  }, [alertMessage]);

  const onSave = async () => {
    const { result, error } = await UseCase.createRecipe(recipe);

    if (result) {
      await getRecipes();
      setRecipe(result);
      setAlertMessage("Successfully created recipe");
      setSeverity("success");
    }

    setError(error);
  };

  const clearNotification = () => {
    setAlertMessage("");
    setSeverity("");
    setIsSaving(!isSaving);
    history.replace(`${RECIPES_BAS_ROUTE}/${recipe.id}/info`);
  };

  const handleOnSaveClick = () => {
    if (isFormValid()) {
      setIsSaving(true);
      onSave();
    }
  };

  const isFormValid = () => {
    const filledValues = reduce(
      initialState,
      function (result, value, key) {
        return isEqual(value, recipe[key]) ? result : result.concat(key);
      },
      []
    ).reduce((acc, curr) => ((acc[curr] = ""), acc), {});

    const errorObj = {};
    for (let property in recipe) {
      if (!(property in filledValues)) {
        errorObj[property] = true;
      }
    }

    setError(errorObj);
    return !Object.keys(errorObj).length > 0;
  };

  const handleOnFormChange = (event) => {
    setRecipe({ ...recipe, [event.target.name]: event.target.value });

    if (error) {
      const newErrors = { ...error };
      if (!event.target.value) {
        newErrors[event.target.name] = true;
      } else {
        delete newErrors[event.target.name];
      }
      setError(newErrors);
    }
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
    error,
    isFormEdited,
    setIsSaving,
    handleOnFormChange,
    handleOnSaveClick,
    handleOnCancelClick,
    handleOnConfirm,
    handleOnCancelConfirmDialog,
  };
}
