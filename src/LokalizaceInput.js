import React from "react";

import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';

import LokalizaceObec from "./LokalizaceObec";
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
    valueObec,
    valueCast,
    onChange
  } = props;

  const onChangeInternal = (event) => {
    console.log(`Lokalizace setting ${event.target.name} to ${event.target.value}`);
    onChange(event);
  };

  // FIXME: dynamicky nacist
  const [castiObce, setCastiObce] = React.useState(['tam', 'jinde']);

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await axios.get(
  //         baseUrl + `locations/parts/${id}`, {
  //         headers: {
  //           Authorization: `Token ${window.localStorage.getItem('auth-token')}`
  //         }
  //       }
  //     );
  //     console.log('loaded entry:', response.data);
  //     //setEntry(response.data);
  //   }
  //   if (id) {
  //     fetchData();
  //   } else {
  //     //setEntry({});
  //   }
  // }, [id]);

  const onChangePart = () => {
    alert('onChangePart');
  };

  return (
    <FormControl>
      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item>
					<LokalizaceObec value={valueObec} onChange={onChangeInternal} />
				</Grid>
      </Grid>
    </FormControl>
  );
}
/*
        <Grid item>
					<CastObceInput value={valueCast} onChange={onChangePart} options={castiObce} />
        </Grid>
        <Grid item>Lokalizace</Grid>
*/
export default LokalizaceInput;
