import React, { useState } from 'react';

import HelpIcon from '@material-ui/icons/Help';
import { withStyles } from '@material-ui/core/styles'
import Popover from '@material-ui/core/Popover';

const StyledPopover = withStyles({
  paper: { width: "70%", height: "70%" },
})(Popover);

const HelpPopover = ({id, help, iconStyle}) => {
  const [helpAnchorEl, setHelpAnchorEl] = useState(null);
  const helpOpened = Boolean(helpAnchorEl);

  return (
    <React.Fragment>
      <HelpIcon style={iconStyle} id="helpIcon" onClick={e => setHelpAnchorEl(e.currentTarget)} />
      <StyledPopover
        id={id}
        open={helpOpened}
        anchorEl={helpAnchorEl}
        onClose={() => setHelpAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <iframe title="Nápověda" style={{width: "100%", height: "100%"}} src={`/help/${help}.html`}>
        </iframe>
      </StyledPopover>
    </React.Fragment>
  );
}

export default HelpPopover;
