import React from "react";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import useStyles from "./useStyles";

const RodSelect = props => {
  const classes = useStyles();

  const {
    id,
    rod,
    handleRodChange,
  } = props;

  const labelId = `${id}-label` ;

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={labelId}>Rod</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={rod}
        onChange={handleRodChange}
      >
        <MenuItem value='m'>m.</MenuItem>
        <MenuItem value='f'>f.</MenuItem>
        <MenuItem value='n'>n.</MenuItem>
      </Select>
    </FormControl>
  );
}
export default RodSelect;
