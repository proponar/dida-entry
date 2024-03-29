import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const filter2chips = filter => {
  var chips = []
  if (filter.oblast !== undefined) {
    chips = [
      ...chips,
      { key: 'oblast', label: `oblast: ${filter.oblast.identifikator}` }
    ]
  }

  if (filter.obec !== undefined) {
    chips = [
      ...chips,
      { key: 'obec', label: `obec: ${filter.obec.lokalizace_obec_text}` }
    ]
  }

  if (filter.castObce !== undefined) {
    chips = [
      ...chips,
      { key: 'castObce', label: `část obce: ${filter.castObce.lokalizace_cast_obce_text}` }
    ]
  }

  if (filter.entry !== undefined) {
    chips = [
      ...chips,
      { key: 'entry', label: `heslo: ${filter.entry.heslo}` }
    ]
  }

  if (filter.vetne !== undefined) {
    chips = [
      ...chips,
      { key: 'vetne', label: `větné: ${filter.vetne ? 'ano' : 'ne'}` }
    ]
  }

  if (filter.rok !== undefined) {
    chips = [
      ...chips,
      { key: 'rok', label: `rok: ${filter.rok}` }
    ]
  }

  if (filter.exemp !== undefined) {
    chips = [
      ...chips,
      { key: 'exemp', label: `exemplifikace: ${filter.exemp}` }
    ]
  }

  return chips
}

const FilterChips = ({filter, onDelete}) => {
  const classes = useStyles();
  const [chipData, setChipData] = React.useState([]);

  useEffect(() => {
    setChipData(filter2chips(filter));
  }, [filter]);

  const handleDelete = (chip) => () => {
    onDelete(chip.key);
    // setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  return (
    <Toolbar>
      {chipData.map((data) => {
        return (
          <Chip
            key={data.key}
            label={data.label}
            onDelete={handleDelete(data)}
            className={classes.chip}
          />
        );
      })}
    </Toolbar>
  );
}

export default FilterChips;
