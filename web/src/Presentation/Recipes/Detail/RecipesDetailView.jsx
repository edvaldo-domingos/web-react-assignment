import { ViewWrapper } from "../../../components/ViewWrapper";
import Paper from "@mui/material/Paper";
import useViewModel from "./RecipesDetailViewModel";
import { Grid } from "@material-ui/core";
import Button from "@mui/material/Button";
import { ICONS } from "../../../utils/icons";
import { ACTION_BUTTONS, beanTypes, brewTypes } from "../../../utils/constants";
import ConfirmDialog from "../../../components/ConfirmDialog";
import BasicAlert from "../../../components/Alert";
import FormTextField from "../../../components/FormTextField";
import SelectField from "../../../components/SelectField";

function RecipesDetailView() {
  const {
    recipe,
    brewers,
    confirmMessage,
    isDeleting,
    alertMessage,
    severity,
    handleOnEditClick,
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
              startIcon={ICONS[ACTION_BUTTONS.save.name]}
              size="medium"
              color="success"
              onClick={handleOnEditClick}
              disabled={isDeleting || Boolean(alertMessage)}
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
              onClick={handleOnDeleteClick}
              disabled={isDeleting || Boolean(alertMessage)}
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
              error={null}
              name={title}
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              label={"Description"}
              value={description}
              error={null}
              name={title}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectField
              handleChange={() => null}
              value={bean_type}
              label={"Bean type"}
              options={beanTypes}
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              label={"Brew time (in minutes)"}
              value={brew_time}
              error={null}
              name={title}
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <SelectField
              handleChange={() => null}
              value={brew_method}
              label={"Brew method"}
              options={brewTypes}
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              label={"Taste notes"}
              value={taste_notes}
              error={null}
              name={title}
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              label={"Tags"}
              value={tags}
              error={null}
              name={title}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectField
              handleChange={() => null}
              value={brewer}
              label={"Brewer"}
              options={brewers}
            />
          </Grid>
        </Grid>

        {alertMessage &&
          setTimeout(() => {
            clearNotification();
          }, 5000)}
        <Grid container style={{ marginTop: "20px" }}>
          {alertMessage && (
            <BasicAlert message={alertMessage} severity={severity} />
          )}
        </Grid>
      </Paper>
      {isDeleting && (
        <ConfirmDialog
          setOpen={handleOnDeleteClick}
          message={confirmMessage}
          handleOnConfirm={handleOnConfirm}
          handleOnCancel={handleOnCancel}
        />
      )}
    </ViewWrapper>
  );
}

export default RecipesDetailView;
