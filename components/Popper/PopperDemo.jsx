import React, { forwardRef } from 'react';

export const Box = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{
      width: 150,
      height: 150,
      fontSize: 14,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'yellow',
    }}
    {...props}
  />
));
