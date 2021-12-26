import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { MainContext } from "../../../ContextProviders/MainContext";
import BrewersDataSource from "../../../Data/DataSource/API/BrewersDataSource";
import DeleteBrewerUseCase from "../../../Domain/UseCase/Brewer/DeleteBrewerUseCase";
import GetBrewerUseCase from "../../../Domain/UseCase/Brewer/GetBrewerUseCase";
import BrewersRepository from "../../../Domain/Repository/Brewer/BrewersRepository";
import { BREWERS_BAS_ROUTE } from "../../../utils/constants";

export default function BrewersInfoModel() {
  const initialState = {
    name: "",
    id: 0,
  };

  const DeleteUseCase = new DeleteBrewerUseCase(
    new BrewersRepository(new BrewersDataSource())
  );

  const GetUseCase = new GetBrewerUseCase(
    new BrewersRepository(new BrewersDataSource())
  );

  const { setAppBarTitle } = useContext(MainContext);
  const history = useHistory();
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [brewer, setBrewer] = useState(initialState);
  const [isDeleting, setIsDeleting] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    setAppBarTitle && setAppBarTitle("Brewer Detail");

    const fetchData = async () => {
      await getBrewer();
    };

    fetchData();

    return () => {
      setAlertMessage("");
      setSeverity("");
      setIsDeleting(false);
    };
  }, []);

  useEffect(() => {
    alertMessage &&
      setTimeout(() => {
        clearNotification();
      }, 3000);
  }, [alertMessage]);

  useEffect(() => {
    error &&
      setTimeout(() => {
        setError("");
        setSeverity("success");
        setAlertMessage("");
        setIsDeleting(false);
      }, 5000);
  }, [error]);

  const onDelete = async () => {
    const { result, error } = await DeleteUseCase.deleteBrewer(id);

    if (result) {
      setIsDeleting(!isDeleting);
      setAlertMessage("Successfully deleted brewer");
      setSeverity("success");
    }

    if (error) {
      setError(error);
      setSeverity("error");
    }
  };

  const getBrewer = async () => {
    const { result, error } = await GetUseCase.getBrewer(id);

    if (result) {
      setBrewer(result);
    }

    if (error) {
      setError(error);
      setSeverity("error");
    }
  };

  const clearNotification = () => {
    setAlertMessage("");
    setSeverity("");
    setIsDeleting(false);
    history.replace(`${BREWERS_BAS_ROUTE}`);
  };

  const handleOnBackClick = () => {
    history.push(`${BREWERS_BAS_ROUTE}`);
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
    brewer,
    error,
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
