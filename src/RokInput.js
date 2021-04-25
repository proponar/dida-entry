import React from "react";

import TextField from "@material-ui/core/TextField";
import NumberFormat from 'react-number-format';

const NumberFormatCustom = ({name, inputRef, onChange, ...other}) => (
  <NumberFormat
    {...other}
    getInputRef={inputRef}
    onValueChange={(values) => {
      onChange({
        target: {
          name: name,
          value: values.value,
        },
      });
    }}
    thousandSeparator
    isNumericString
		format="####"
  />
);

const RokInput = ({value, onChange, dense}) => (
  <TextField
    variant={(dense && "filled") || "outlined"}
    margin={(dense && "dense") || "normal"}
    label="Rok"
    value={value}
    onChange={onChange}
    name="rok"
    id="rok-input"
    InputProps={{
      inputComponent: NumberFormatCustom,
    }}
  />
);

export default RokInput;
