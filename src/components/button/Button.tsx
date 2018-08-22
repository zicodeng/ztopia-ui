import { ThemeProvider } from 'emotion-theming';
import * as React from 'react';
import styled from 'react-emotion';

interface ButtonProps {
    /** Available Ztopia themes: space */
    ztopiaTheme?: string;
}

const theme: any = {
    space: {
        color: 'red',
        '&:hover': {
            color: 'blue',
        },
    },
};

const StyledButton = styled.button(
    // Shared style
    {
        padding: '10px 20px',
        cursor: 'pointer',
    },
    // Theme-specific style
    (props: ButtonProps) => {
        const { ztopiaTheme } = props;
        return ztopiaTheme ? theme[ztopiaTheme] : {};
    },
);

const Button: React.SFC<ButtonProps> = props => {
    const { children, ...restProps } = props;
    return (
        <ThemeProvider theme={theme}>
            <StyledButton {...restProps} className="ztopia-button">
                {children}
            </StyledButton>
        </ThemeProvider>
    );
};

Button.defaultProps = {};

export default Button;
