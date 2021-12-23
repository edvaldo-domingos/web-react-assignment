import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { v4 as uuidv4 } from "uuid";

function SelectField({ value, handleChange, options, label, name, error }) {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        id="demo-simple-select"
        name={name}
        value={value}
        label={label}
        onChange={handleChange}
        error={error}
      >
        {(options || []).map((option) => (
          <MenuItem value={option.value} key={uuidv4()}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectField;
