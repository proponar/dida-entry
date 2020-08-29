import React from "react";

import TextField from "@material-ui/core/TextField";
import NumberFormat from 'react-number-format';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      // prefix="$"
			format="####"
    />
  );
}

// NumberFormatCustom.propTypes = {
//   inputRef: PropTypes.func.isRequired,
//   name: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
// };

const RokInput = props => {
  const {
    value,
    onChange
  } = props;

  return (
    <TextField
      label="Rok"
      value={value}
      onChange={onChange}
      name="rok"
      id="rok-input"
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
    />
  )
};

export default RokInput;
