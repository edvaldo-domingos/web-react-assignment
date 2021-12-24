import { ViewWrapper } from "../../../components/ViewWrapper";
import Paper from "@mui/material/Paper";
import useViewModel from "./BrewersInfoViewModel";
import { Grid } from "@material-ui/core";
import Button from "@mui/material/Button";
import { ICONS } from "../../../utils/icons";
import { ACTION_BUTTONS } from "../../../utils/constants";
import ConfirmDialog from "../../../components/ConfirmDialog";
import BasicAlert from "../../../components/Alert";

function BrewersInfoView() {
  const {
    brewer,
    isDeleting,
    alertMessage,
    severity,
    handleOnBackClick,
    handleOnDeleteClick,
    handleOnConfirm,
    handleOnCancel,
  } = useViewModel();

  const { name } = brewer;

  return (
    <ViewWrapper>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          marginTop: "20px",
          padding: "20px",
        }}
      >
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Button
              variant="outlined"
              startIcon={ICONS[ACTION_BUTTONS.back.name]}
              size="medium"
              onClick={handleOnBackClick}
              disabled={isDeleting || Boolean(alertMessage)}
            >
              Back to List
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="error"
              startIcon={ICONS[ACTION_BUTTONS.delete.name]}
              size="medium"
              onClick={handleOnDeleteClick}
              disabled={isDeleting || Boolean(alertMessage)}
            >
              {ACTION_BUTTONS.delete.name}
            </Button>
          </Grid>
        </Grid>
        <label>
          <b>Name</b>
          <p>{name}</p>
        </label>

        <Grid container style={{ marginTop: "20px" }}>
          {alertMessage && (
            <BasicAlert message={alertMessage} severity={severity} />
          )}
        </Grid>
      </Paper>
      {isDeleting && (
        <ConfirmDialog
          setOpen={handleOnDeleteClick}
          message={"Would you like to proceed to delete this Brewer ?"}
          handleOnConfirm={handleOnConfirm}
          handleOnCancel={handleOnCancel}
        />
      )}
    </ViewWrapper>
  );
}

export default BrewersInfoView;
