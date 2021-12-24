import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MainContext } from "../../../ContextProviders/MainContext";
import BrewersDataSource from "../../../Data/DataSource/API/BrewersDataSource";
import CreateBrewerUseCase from "../../../Domain/UseCase/Brewer/CreateBrewerUseCase";
import BrewersRepository from "../../../Domain/Repository/Brewer/BrewersRepository";
import { BREWERS_BAS_ROUTE } from "../../../utils/constants";
import { isEqual, reduce } from "lodash";

export default function BrewersNewViewModel() {
  const initialState = {
    name: "",
  };

  const UseCase = new CreateBrewerUseCase(
    new BrewersRepository(new BrewersDataSource())
  );

  const history = useHistory();
  const { setAppBarTitle } = useContext(MainContext);

  const [error, setError] = useState(null);
  const [brewer, setBrewer] = useState(initialState);
  const [isSaving, setIsSaving] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");

  useEffect(() => {
    setAppBarTitle("Create a New Brewer");
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
    const { result, error } = await UseCase.createBrewer(brewer);

    if (result) {
      setBrewer(result);
      setAlertMessage("Successfully created brewer");
      setSeverity("success");
    }

    setError(error);
  };

  const clearNotification = () => {
    setAlertMessage("");
    setSeverity("");
    setIsSaving(!isSaving);
    history.replace(`${BREWERS_BAS_ROUTE}/${brewer.id}/info`);
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
        return isEqual(value, brewer[key]) ? result : result.concat(key);
      },
      []
    ).reduce((acc, curr) => ((acc[curr] = ""), acc), {});

    const errorObj = {};
    for (let property in brewer) {
      if (!(property in filledValues)) {
        errorObj[property] = true;
      }
    }

    setError(errorObj);
    return !Object.keys(errorObj).length > 0;
  };

  const handleOnFormChange = (event) => {
    setBrewer({ ...brewer, [event.target.name]: event.target.value });

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
      return history.push(`${BREWERS_BAS_ROUTE}`);
    }

    setConfirmMessage(
      "You have unsaved work, would like to proceed cancelling"
    );
  };

  const handleOnConfirm = () => {
    history.push(`${BREWERS_BAS_ROUTE}`);
  };

  const isFormEdited = () => {
    return !isEqual(initialState, brewer);
  };

  const handleOnCancelConfirmDialog = () => {
    setConfirmMessage("");
  };

  return {
    brewer,
    error,
    confirmMessage,
    isSaving,
    alertMessage,
    severity,
    isFormEdited,
    handleOnSaveClick,
    handleOnCancelClick,
    handleOnFormChange,
    handleOnConfirm,
    handleOnCancelConfirmDialog,
    clearNotification,
  };
}
