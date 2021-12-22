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
// import GetRecipesUseCase from "../../Domain/UseCase/Recipe/GetRecipesUseCase";

export default function RecipesDetailViewModel() {
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
  const [isDeleting, setIsDeleting] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");

  useEffect(() => {
    return () => {
      setAlertMessage("");
      setSeverity("");
      setIsDeleting(false);
    };
  }, []);

  const onDelete = async () => {
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

  const handleOnEditClick = () => {
    history.push(`${RECIPES_BAS_ROUTE}/${id}/detail`);
  };

  const handleOnDeleteClick = (event) => {
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
    brewers,
    confirmMessage,
    isDeleting,
    alertMessage,
    severity,
    setIsDeleting,
    handleOnEditClick,
    handleOnDeleteClick,
    handleOnConfirm,
    handleOnCancel,
    clearNotification,
  };
}
