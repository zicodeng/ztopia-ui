import React, { FC } from 'react';

export interface ButtonProps {
  variant: 'primary' | 'secondary';
}

export const Button: FC<ButtonProps> = ({ variant }) => (
  <button>Hello {variant}</button>
);

Button.defaultProps = {
  variant: 'primary',
};
