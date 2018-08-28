import { ThemeProvider } from 'emotion-theming';
import * as React from 'react';
import styled, { cx } from 'react-emotion';

import ButtonThemes from 'components/button/button-themes';
import Loader from 'components/loader/Loader';
import { isThemeValid } from 'components/ztopia-themes';

interface ButtonProps {
    /** All Ztopia themes can be found in the Design section. */
    ztopiaTheme?: string;
    /** Make the button background transparent and invert text and border colors. */
    ghost?: boolean;
    /** Set the button state to loading. */
    loading?: boolean;
    /** Set the button state to disabled. */
    disabled?: boolean;
    className?: string;
}

const ZtopiaButton = styled.button(
    // Shared style
    {
        padding: '15px 20px',
        border: '2px solid',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        boxShadow: 'none',
        appearance: 'none',
        outline: 'none',
        '&.ghost': {
            backgroundColor: 'transparent',
        },
        '&.loading, &.ghost.loading': {
            // Hide text
            color: 'transparent',
            '> *': {
                display: 'none',
            },
            '> .ztopia-loader': {
                display: 'block',
            },
        },
        '&[disabled]': {
            cursor: 'not-allowed',
        },
        '> .ztopia-loader': {
            display: 'none',
            position: 'absolute',
        },
    },
    // Theme-specific style
    (props: ButtonProps) => {
        const { ztopiaTheme } = props;
        return ztopiaTheme && isThemeValid(ztopiaTheme)
            ? ButtonThemes[ztopiaTheme]
            : {};
    },
);

const Button: React.SFC<ButtonProps> = props => {
    const {
        ztopiaTheme,
        ghost,
        loading,
        disabled,
        className,
        children,
        ...restProps
    } = props;
    const classNames = cx(
        'ztopia-button',
        ghost && 'ghost',
        loading && 'loading',
        className,
    );
    return (
        <ThemeProvider theme={ButtonThemes}>
            <ZtopiaButton
                ztopiaTheme={ztopiaTheme}
                className={classNames}
                disabled={disabled || loading}
                {...restProps}
            >
                {children}
                <Loader ztopiaTheme={ztopiaTheme || 'Basic'} />
            </ZtopiaButton>
        </ThemeProvider>
    );
};

Button.defaultProps = {
    ztopiaTheme: 'Basic',
    ghost: false,
    loading: false,
    disabled: false,
};

export default Button;
