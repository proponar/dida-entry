import React from "react";

import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from '@material-ui/core/TextField';

import AsyncAutocomplete from "./AsyncAutocomplete";
//import useStyles from "./useStyles";

const CastObceInput = props => {
	const {
		options
	} = props;

	return (
    <Autocomplete
      id="combo-box-demo"
      options={options}
      getOptionLabel={(option) => option}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Část obce" variant="outlined" />}
    />
	);
};

const LokalizaceInput = props => {
  const {
    onChange
  } = props;

  // FIXME: dynamicky nacist
  const [castiObce, setCastiObce] = React.useState(['tam', 'jinde']);

  const onChangePart = () => {
    alert('onChangePart');
  };

  return (
    <FormControl>
      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item>
					<AsyncAutocomplete onChange={onChange} />
				</Grid>
        <Grid item>
					<CastObceInput onChange={onChangePart} options={castiObce} />
        </Grid>
        <Grid item>Lokalizace</Grid>
      </Grid>
    </FormControl>
  );
}
export default LokalizaceInput;
