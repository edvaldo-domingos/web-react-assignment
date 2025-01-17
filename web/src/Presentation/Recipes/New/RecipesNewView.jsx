import { ViewWrapper } from "../../../components/ViewWrapper";
import Paper from "@mui/material/Paper";
import useViewModel from "./RecipesNewViewMode";
import { Grid } from "@material-ui/core";
import Button from "@mui/material/Button";
import { ICONS } from "../../../utils/icons";
import { ACTION_BUTTONS, beanTypes, brewTypes } from "../../../utils/constants";
import ConfirmDialog from "../../../components/ConfirmDialog";
import BasicAlert from "../../../components/Alert";
import FormTextField from "../../../components/FormTextField";
import SelectField from "../../../components/SelectField";

function RecipesNewView() {
  const {
    recipe,
    errorMessage,
    filterBrewers,
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
  } = useViewModel();

  const {
    title,
    description,
    bean_type,
    brew_time,
    brew_method,
    taste_notes,
    tags,
    brewer_id,
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
              startIcon={ICONS[ACTION_BUTTONS.save.name]}
              size="medium"
              color="success"
              onClick={handleOnSaveClick}
              disabled={!isFormEdited() || isSaving || Boolean(alertMessage)}
            >
              {ACTION_BUTTONS.save.name}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="error"
              startIcon={ICONS[ACTION_BUTTONS.cancel.name]}
              size="medium"
              onClick={handleOnCancelClick}
              disabled={isSaving || Boolean(alertMessage)}
            >
              {ACTION_BUTTONS.cancel.name}
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          style={{ marginTop: "20px" }}
          direction="column"
          spacing={4}
        >
          <Grid item xs={12}>
            <FormTextField
              label={"Title"}
              value={title}
              onChange={handleOnFormChange}
              error={error?.title}
              name={"title"}
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              label={"Description"}
              value={description}
              onChange={handleOnFormChange}
              error={error?.description}
              name={"description"}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectField
              handleChange={handleOnFormChange}
              value={bean_type}
              label={"Bean type"}
              options={beanTypes}
              name={"bean_type"}
              error={error?.bean_type}
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              label={"Brew time (in minutes)"}
              value={brew_time}
              onChange={handleOnFormChange}
              error={error?.brew_time}
              name={"brew_time"}
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <SelectField
              name={"brew_method"}
              handleChange={handleOnFormChange}
              value={brew_method}
              label={"Brew method"}
              options={brewTypes}
              error={error?.brew_method}
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              name={"taste_notes"}
              label={"Taste notes"}
              onChange={handleOnFormChange}
              value={taste_notes}
              error={error?.taste_notes}
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              label={"Tags"}
              value={tags}
              onChange={handleOnFormChange}
              name={"tags"}
              error={error?.tags}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectField
              handleChange={handleOnFormChange}
              value={brewer_id}
              name={"brewer_id"}
              label={"Brewer"}
              options={filterBrewers()}
              error={error?.brewer_id}
            />
          </Grid>
        </Grid>

        <Grid container style={{ marginTop: "20px" }}>
          {(alertMessage || errorMessage) && (
            <BasicAlert
              message={alertMessage || errorMessage}
              severity={severity}
            />
          )}
        </Grid>
      </Paper>
      {confirmMessage && (
        <ConfirmDialog
          setOpen={handleOnCancelConfirmDialog}
          message={confirmMessage}
          handleOnConfirm={handleOnConfirm}
          handleOnCancel={handleOnCancelConfirmDialog}
        />
      )}
    </ViewWrapper>
  );
}

export default RecipesNewView;
