import React, { useState } from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui//core/Typography';
import { withStyles } from '@material-ui/core/styles'

const StyledPopover = withStyles({
  paper: { width: "50%", height: "50%" },
})(Popover);

const Welcome = ({open, anchorEl, onClose}) => {
  const [checked, setChecked] = useState(Boolean(localStorage.getItem("noWelcome")));

  return (
      <StyledPopover
        id="welcome"
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <iframe title="Nápověda" style={{width: "100%", height: "90%"}} src={`/help/intro.html`}>
        </iframe>
        <FormControlLabel
          style={{marginLeft: "8pt"}}
          control={
            <Checkbox
              onClick={e => { if (e.target.checked) {
                localStorage.setItem("noWelcome", "1");
                setChecked(true);
              }} }
              checked={checked}
              name="noWelcome"
              value="noWelcome"
              color="primary"
            />
          }
          label="Příště nezobrazovat"
        />
      </StyledPopover>
  );
};

export default Welcome;
