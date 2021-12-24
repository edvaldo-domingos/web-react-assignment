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
  const [, setError] = useState(null);
  const [brewer, setBrewer] = useState(initialState);
  const [isDeleting, setIsDeleting] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    setAppBarTitle("Brewer Detail");

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

  const onDelete = async () => {
    const { result, error } = await DeleteUseCase.deleteBrewer(id);

    if (result) {
      setIsDeleting(!isDeleting);
      setAlertMessage("Successfully deleted brewer");
      setSeverity("success");
    }

    setError(error);
  };

  const getBrewer = async () => {
    const { result, error } = await GetUseCase.getBrewer(id);

    if (result) {
      setBrewer(result);
    }

    setError(error);
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
