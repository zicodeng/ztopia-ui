import { ThemeProvider } from 'emotion-theming';
import * as React from 'react';
import styled, { cx } from 'react-emotion';

import Loader from 'components/loader/Loader';
import SwitchThemes from 'components/switch/switch-themes';
import { isThemeValid } from 'components/ztopia-themes';

interface SwitchProps {
    /** All Ztopia themes can be found in Design section. */
    ztopiaTheme?: string;
    /** Default checked state. */
    defaultChecked?: boolean;
    /** Text to be shown when the state is checked. */
    checkedText?: string;
    /** Text to be shown when the state is unchecked. */
    uncheckedText?: string;
    /** Set switch loading state. */
    loading?: boolean;
    disabled?: boolean;
    /** A callback function triggered when the checked state is switching. */
    onSwitch?: (checked: boolean) => void;
    className?: string;
}

interface SwitchState {
    checked: boolean;
}

const ZtopiaSwitch = styled.div(
    {
        width: '55px',
        height: '30px',
        border: '2px solid',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative',
        '&.checked': {
            '> .ztopia-switch-checked-text': {
                opacity: 1,
            },
            '> .ztopia-switch-button': {
                left: '100%',
                // The subtracted 2px is the border width
                transform: 'translateX(calc(-100% - 2px))',
            },
            '> .ztopia-switch-unchecked-text': {
                opacity: 0,
            },
        },
        '&.loading': {
            cursor: 'not-allowed',
            '> .ztopia-switch-checked-text, > .ztopia-switch-button, > .ztopia-switch-unchecked-text': {
                display: 'none',
            },
            '> .ztopia-loader': {
                width: '20px',
                height: '20px',
            },
        },
        '&[disabled]': {
            cursor: 'not-allowed',
        },
        '> .ztopia-switch-checked-text': {
            position: 'absolute',
            left: '4px',
            opacity: 0,
        },
        '> .ztopia-switch-button': {
            width: '22px',
            height: '22px',
            left: '2px',
            position: 'absolute',
        },
        '> .ztopia-switch-unchecked-text': {
            position: 'absolute',
            right: '4px',
            opacity: 1,
        },
    },
    (props: SwitchProps) => {
        const { ztopiaTheme } = props;
        return ztopiaTheme && isThemeValid(ztopiaTheme)
            ? SwitchThemes[ztopiaTheme]
            : {};
    },
);

class Switch extends React.Component<SwitchProps, SwitchState> {
    static defaultProps = {
        ztopiaTheme: 'Basic',
        defaultChecked: false,
        loading: false,
        disabled: false,
    };

    constructor(props: SwitchProps) {
        super(props);
        const { defaultChecked } = props;
        this.state = {
            checked: defaultChecked || false,
        };
    }

    render() {
        const {
            ztopiaTheme,
            checkedText,
            uncheckedText,
            loading,
            disabled,
            className,
        } = this.props;
        const { checked } = this.state;
        const classNames = cx(
            'ztopia-switch',
            checked && 'checked',
            loading && 'loading',
            className,
        );
        return (
            <ThemeProvider theme={SwitchThemes}>
                <ZtopiaSwitch
                    ztopiaTheme={ztopiaTheme}
                    className={classNames}
                    disabled={disabled}
                    onClick={this.handleClickSwitch}
                >
                    {checkedText && (
                        <span className="ztopia-switch-checked-text">
                            {checkedText}
                        </span>
                    )}
                    {loading && <Loader />}
                    <div className="ztopia-switch-button" />
                    {uncheckedText && (
                        <span className="ztopia-switch-unchecked-text">
                            {uncheckedText}
                        </span>
                    )}
                </ZtopiaSwitch>
            </ThemeProvider>
        );
    }

    private handleClickSwitch = (): void => {
        const { loading, disabled, onSwitch } = this.props;
        const { checked } = this.state;
        if (disabled || loading) {
            return;
        }
        const newChecked = !checked;
        this.setState({
            checked: newChecked,
        });
        if (onSwitch) {
            onSwitch(newChecked);
        }
    };
}

export default Switch;
