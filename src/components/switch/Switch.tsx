import { ThemeProvider } from 'emotion-theming';
import * as React from 'react';
import styled, { cx } from 'react-emotion';

import Loader from 'components/loader/Loader';
import SwitchThemes from 'components/switch/switch-themes';
import { isThemeValid } from 'components/ztopia-themes';

interface SwitchProps {
    /** All Ztopia themes can be found in the Design section. */
    ztopiaTheme?: string;
    /** Default the switch state to active. */
    defaultActive?: boolean;
    /** Text to be shown when the switch state is active. */
    activeText?: string;
    /** Text to be shown when the switch state is inactive. */
    inactiveText?: string;
    /** Set the switch state to loading. */
    loading?: boolean;
    /** Set the switch state to disabled. */
    disabled?: boolean;
    /** A callback function triggered when the switch active state changes. */
    onSwitch?: (isActive: boolean) => void;
    className?: string;
}

interface SwitchState {
    isActive: boolean;
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
        '&.active': {
            '> .ztopia-switch-active-text': {
                opacity: 1,
            },
            '> .ztopia-switch-button': {
                left: '100%',
                // The subtracted 2px is the border width
                transform: 'translateX(calc(-100% - 2px))',
            },
            '> .ztopia-switch-inactive-text': {
                opacity: 0,
            },
        },
        '&.loading': {
            cursor: 'not-allowed',
            '> .ztopia-switch-active-text, > .ztopia-switch-button, > .ztopia-switch-inactive-text': {
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
        '> .ztopia-switch-active-text': {
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
        '> .ztopia-switch-inactive-text': {
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
        defaultActive: false,
        loading: false,
        disabled: false,
    };

    constructor(props: SwitchProps) {
        super(props);
        const { defaultActive } = props;
        this.state = {
            isActive: defaultActive || false,
        };
    }

    render() {
        const {
            ztopiaTheme,
            activeText,
            inactiveText,
            loading,
            disabled,
            className,
        } = this.props;
        const { isActive } = this.state;
        const classNames = cx(
            'ztopia-switch',
            isActive && 'active',
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
                    {activeText && (
                        <span className="ztopia-switch-active-text">
                            {activeText}
                        </span>
                    )}
                    {loading && <Loader />}
                    <div className="ztopia-switch-button" />
                    {inactiveText && (
                        <span className="ztopia-switch-inactive-text">
                            {inactiveText}
                        </span>
                    )}
                </ZtopiaSwitch>
            </ThemeProvider>
        );
    }

    private handleClickSwitch = (): void => {
        const { loading, disabled, onSwitch } = this.props;
        const { isActive } = this.state;
        if (disabled || loading) {
            return;
        }
        const newActiveState = !isActive;
        this.setState({
            isActive: newActiveState,
        });
        if (onSwitch) {
            onSwitch(newActiveState);
        }
    };
}

export default Switch;
