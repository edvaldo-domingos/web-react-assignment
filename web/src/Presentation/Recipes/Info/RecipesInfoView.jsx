import { ViewWrapper } from "../../../components/ViewWrapper";
import Paper from "@mui/material/Paper";
import useViewModel from "./RecipesInfoViewModel";
import { Grid } from "@material-ui/core";
import Button from "@mui/material/Button";
import { ICONS } from "../../../utils/icons";
import { ACTION_BUTTONS } from "../../../utils/constants";
import ConfirmDialog from "../../../components/ConfirmDialog";

function RecipesInfoView() {
  const {
    recipe,
    isDeleting,
    handleOnEditClick,
    handleOnDeleteClick,
    handleOnConfirm,
    handleOnCancel,
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
              startIcon={ICONS[ACTION_BUTTONS.edit.name]}
              size="medium"
              onClick={handleOnEditClick}
            >
              {ACTION_BUTTONS.edit.name}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="error"
              startIcon={ICONS[ACTION_BUTTONS.delete.name]}
              size="medium"
              onClick={handleOnDeleteClick}
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
      </Paper>
      {isDeleting && (
        <ConfirmDialog
          setOpen={handleOnDeleteClick}
          message={"Would you like to proceed to delete this recipe ?"}
          handleOnConfirm={handleOnConfirm}
          handleOnCancel={handleOnCancel}
        />
      )}

      {/* TODO: Add a snak bar or an alert to tell the user when he sucessfully deleted something add 
      - Disable Delete and Edit button 
      - Add time about after 5 seconts move to the recipes list  */}
    </ViewWrapper>
  );
}

export default RecipesInfoView;
