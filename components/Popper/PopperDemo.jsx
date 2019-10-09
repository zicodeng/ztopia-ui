import React from 'react';

export const Box = props => (
  <div
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
);
