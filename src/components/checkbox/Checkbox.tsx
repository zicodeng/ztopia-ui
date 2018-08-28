import { ThemeProvider } from 'emotion-theming';
import * as React from 'react';
import styled, { cx } from 'react-emotion';

import CheckboxThemes from 'components/checkbox/checkbox-themes';
import { isThemeValid } from 'components/ztopia-themes';

interface CheckboxProps {
    /** All Ztopia themes can be found in the Design section. */
    ztopiaTheme?: string;
    /** Checkbox name. */
    name?: string;
    /** Checkbox value. */
    value?: string;
    /** Checkbox label to be displayed. */
    label?: string;
    /** Default the checkbox state to checked. */
    defaultChecked?: boolean;
    /** Set checkbox state to disabled. */
    disabled?: boolean;
    /** A callback function triggered when the checkbox checked state changes. */
    onCheck?: (value: string, checked: boolean) => void;
    className?: string;
}

interface CheckboxState {
    checked: boolean;
}

const ZtopiaCheckboxContainer = styled.div(
    {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        '&.disabled': {
            '> .ztopia-checkbox': {
                cursor: 'not-allowed',
            },
        },
        // Hide browser default checkbox style
        '> .ztopia-checkbox': {
            width: '16px',
            height: '16px',
            opacity: 0,
            zIndex: 1,
            cursor: 'pointer',
        },
        '> .ztopia-checkbox-custom': {
            width: '16px',
            height: '16px',
            border: '1px solid',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: '0',
        },
        '> .ztopia-checkbox-label': {
            marginLeft: '10px',
        },
    },
    (props: CheckboxProps) => {
        const { ztopiaTheme } = props;
        return ztopiaTheme && isThemeValid(ztopiaTheme)
            ? CheckboxThemes[ztopiaTheme]
            : {};
    },
);

class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
    static defaultProps = {
        ztopiaTheme: 'Basic',
        defaultChecked: false,
    };

    constructor(props: CheckboxProps) {
        super(props);
        const { defaultChecked } = props;
        this.state = {
            checked: defaultChecked || false,
        };
    }

    public render(): JSX.Element {
        const {
            ztopiaTheme,
            name,
            label,
            value,
            disabled,
            className,
        } = this.props;
        const { checked } = this.state;
        const classNames = cx(
            'ztopia-checkbox-container',
            checked && 'checked',
            disabled && 'disabled',
            className,
        );
        return (
            <ThemeProvider theme={CheckboxThemes}>
                <ZtopiaCheckboxContainer
                    ztopiaTheme={ztopiaTheme}
                    className={classNames}
                >
                    <input
                        type="checkbox"
                        className="ztopia-checkbox"
                        name={name}
                        value={value}
                        checked={checked}
                        disabled={disabled}
                        onChange={this.handleChangeCheckbox}
                    />
                    <span className="ztopia-checkbox-custom" />
                    {label && (
                        <label className="ztopia-checkbox-label">{label}</label>
                    )}
                </ZtopiaCheckboxContainer>
            </ThemeProvider>
        );
    }

    private handleChangeCheckbox = (): void => {
        const { value, onCheck } = this.props;
        const { checked } = this.state;
        const newCheckedState = !checked;
        this.setState({
            checked: newCheckedState,
        });
        if (onCheck) {
            onCheck(value || '', newCheckedState);
        }
    };
}

export default Checkbox;
