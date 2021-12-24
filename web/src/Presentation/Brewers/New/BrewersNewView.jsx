import { ViewWrapper } from "../../../components/ViewWrapper";
import Paper from "@mui/material/Paper";
import useViewModel from "./BrewersNewViewMode";
import { Grid } from "@material-ui/core";
import Button from "@mui/material/Button";
import { ICONS } from "../../../utils/icons";
import { ACTION_BUTTONS } from "../../../utils/constants";
import ConfirmDialog from "../../../components/ConfirmDialog";
import BasicAlert from "../../../components/Alert";
import FormTextField from "../../../components/FormTextField";

function BrewersNewView() {
  const {
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
              label={"Name"}
              value={name}
              onChange={handleOnFormChange}
              error={error?.name}
              name={"name"}
            />
          </Grid>
        </Grid>

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

export default BrewersNewView;
