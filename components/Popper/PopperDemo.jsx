import React from 'react';

export const Box = props => (
  <div
    style={{
      width: 100,
      height: 100,
      fontSize: 14,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'yellow',
    }}
    {...props}
  />
);
