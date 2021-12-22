import TextField from "@mui/material/TextField";

export default function FormTextField({
  error,
  name,
  label,
  defaultValue,
  value,
  type,
  onChange,
}) {
  return (
    <TextField
      label={label}
      name={name}
      defaultValue={defaultValue}
      onChange={onChange}
      value={value}
      id="outlined-error-helper-text"
      error={error}
      helperText={error && "Incorrect entry."}
      fullWidth
      type={type}
    />
  );
}
