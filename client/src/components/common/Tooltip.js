import React from 'react';
import Tippy from '@tippyjs/react';
import {followCursor} from 'tippy.js';

import { TooltipContent } from '../../styles/common/Tooltip';

const Tooltip = props => {
  return (
    <Tippy
      duration={[2000, 0]}
      // placement="right-start"
      followCursor={true}
      plugins={[followCursor]}
      content={<TooltipContent>{props.tooltip}</TooltipContent>}
    >
      {props.children}
    </Tippy>
  );
};

export default Tooltip;
