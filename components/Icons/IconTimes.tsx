import React, { memo } from 'react';

import { Icon, IconProps } from './';

export const IconTimes = memo<IconProps>((props) => (
  <Icon {...props}>
    <svg data-icon="times" viewBox="0 0 512 512">
      <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
    </svg>
  </Icon>
));
