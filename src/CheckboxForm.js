import React from "react";
// import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const CheckboxForm = props => {
  const { checks } = props;

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name.substr(3)]: event.target.checked });
  };

  return (
    <div>
      {checks.map(c => (
        <FormControlLabel
          control={
            <Checkbox
              checked={state[c]}
              onChange={handleChange}
              name={"cb_" + c}
              color="primary"
            />
          }
          label={c}
        />
      ))}
    </div>
  );
};

export default CheckboxForm;
