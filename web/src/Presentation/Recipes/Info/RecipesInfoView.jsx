import { ViewWrapper } from "../../../components/ViewWrapper";
import Paper from "@mui/material/Paper";
import useViewModel from "./RecipesInfoViewModel";
import { Grid } from "@material-ui/core";
import Button from "@mui/material/Button";
import { ICONS } from "../../../utils/icons";
import { ACTION_BUTTONS } from "../../../utils/constants";
import ConfirmDialog from "../../../components/ConfirmDialog";
import BasicAlert from "../../../components/Alert";

function RecipesInfoView() {
  const {
    recipe,
    isDeleting,
    alertMessage,
    severity,
    handleOnBackClick,
    handleOnDeleteClick,
    handleOnConfirm,
    handleOnCancel,
    clearNotification,
  } = useViewModel();

  const {
    title,
    description,
    bean_type,
    brew_time,
    brew_method,
    taste_notes,
    tags,
    brewer,
  } = recipe;

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
          <b>Title</b>
          <p>{title}</p>
        </label>
        <label>
          <b>Description</b>
          <p>{description}</p>
        </label>
        <label>
          <b>Bean Type</b>
          <p>{bean_type}</p>
        </label>
        <label>
          <b>Brew time</b>
          <p>{brew_time}</p>
        </label>
        <label>
          <b>Brew method</b>
          <p>{brew_method}</p>
        </label>
        <label>
          <b>Taste notes</b>
          <p>{taste_notes}</p>
        </label>
        <label>
          <b>Tags</b>
          <p>{tags}</p>
        </label>
        <label>
          <b>Brewer</b>
          <p>{brewer}</p>
        </label>

        {alertMessage &&
          setTimeout(() => {
            clearNotification();
          }, 3000)}
        <Grid container style={{ marginTop: "20px" }}>
          {alertMessage && (
            <BasicAlert message={alertMessage} severity={severity} />
          )}
        </Grid>
      </Paper>
      {isDeleting && (
        <ConfirmDialog
          setOpen={handleOnDeleteClick}
          message={"Would you like to proceed to delete this recipe ?"}
          handleOnConfirm={handleOnConfirm}
          handleOnCancel={handleOnCancel}
        />
      )}
    </ViewWrapper>
  );
}

export default RecipesInfoView;
