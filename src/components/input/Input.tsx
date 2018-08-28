import { ThemeProvider } from 'emotion-theming';
import * as React from 'react';
import styled, { cx } from 'react-emotion';

import InputThemes from 'components/input/input-themes';
import { isThemeValid } from 'components/ztopia-themes';

interface InputProps {
    /** All Ztopia themes can be found in Design section. */
    ztopiaTheme?: string;
    /** The icon displayed before (on the left side of) the input field. */
    prefixIcon?: React.ReactElement<any>;
    /** The label text displayed before (on the left side of) the input field. */
    prefixLabel?: string;
    /** The icon displayed after (on the right side of) the input field. */
    suffixIcon?: React.ReactElement<any>;
    /** The label text displayed after (on the right side of) the input field. */
    suffixLabel?: string;
    /** Set input disabled state. */
    disabled?: boolean;
    /** Display a given error message. */
    errorMessage?: string;
    /** The callback function that is triggered when Enter key is pressed. */
    onPressEnter?: Function;
    className?: string;
}

const ZtopiaInputOuterContainer = styled.div(
    {
        position: 'relative',
        '> .ztopia-input-inner-container': {
            width: '100%',
            height: '40px',
            border: '2px solid',
            backgroundColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            '> .ztopia-prefix-icon, > .ztopia-prefix-label, > .ztopia-suffix-icon, > .ztopia-suffix-label': {
                height: '100%',
                padding: '0 10px',
                display: 'flex',
                alignItems: 'center',
            },
            '> .ztopia-prefix-icon + .ztopia-prefix-label, > .ztopia-suffix-icon + .ztopia-suffix-label': {
                paddingLeft: '0',
            },
            '> .ztopia-prefix-icon > svg, > .ztopia-suffix-icon > svg': {
                width: '15px',
            },
            '> .ztopia-input': {
                width: '100%',
                height: '100%',
                padding: '0 10px',
                border: 'none',
                boxShadow: 'none',
                appearance: 'none',
                outline: 'none',
                '&[disabled]': {
                    cursor: 'not-allowed',
                },
            },
        },
    },
    (props: InputProps) => {
        const { ztopiaTheme } = props;
        return ztopiaTheme && isThemeValid(ztopiaTheme)
            ? InputThemes[ztopiaTheme]
            : {};
    },
);

const Input: React.SFC<InputProps> = props => {
    const {
        ztopiaTheme,
        prefixIcon,
        prefixLabel,
        suffixIcon,
        suffixLabel,
        disabled,
        errorMessage,
        onPressEnter,
        className,
        ...restProps
    } = props;

    const classNames = cx(
        'ztopia-input-outer-container',
        errorMessage && 'error',
        className,
    );

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (onPressEnter && e.key === 'Enter') {
            onPressEnter();
        }
    };

    return (
        <ThemeProvider theme={InputThemes}>
            <ZtopiaInputOuterContainer
                ztopiaTheme={ztopiaTheme}
                className={classNames}
            >
                <div className="ztopia-input-inner-container">
                    {prefixIcon && (
                        <span className="ztopia-prefix-icon">{prefixIcon}</span>
                    )}
                    {prefixLabel && (
                        <span className="ztopia-prefix-label">
                            {prefixLabel}
                        </span>
                    )}
                    <input
                        className="ztopia-input"
                        {...restProps}
                        disabled={disabled}
                        onKeyPress={onPressEnter && handleKeyPress}
                    />
                    {suffixIcon && (
                        <span className="ztopia-suffix-icon">{suffixIcon}</span>
                    )}
                    {suffixLabel && (
                        <span className="ztopia-suffix-label">
                            {suffixLabel}
                        </span>
                    )}
                </div>
                {errorMessage && (
                    <p className="ztopia-input-error-message">{errorMessage}</p>
                )}
            </ZtopiaInputOuterContainer>
        </ThemeProvider>
    );
};

Input.defaultProps = {
    ztopiaTheme: 'Basic',
    disabled: false,
};

export default Input;
