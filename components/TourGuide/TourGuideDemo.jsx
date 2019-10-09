import React from 'react';

export const Box = ({ style, ...restProps }) => (
  <div
    {...restProps}
    style={{
      width: 100,
      height: 100,
      color: 'white',
      backgroundColor: '#35bb9b',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      ...style,
    }}
  />
);
