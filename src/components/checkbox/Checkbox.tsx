import { ThemeProvider } from 'emotion-theming';
import * as React from 'react';
import styled, { cx } from 'react-emotion';

import CheckboxThemes from 'components/checkbox/checkbox-themes';
import { isThemeValid } from 'components/ztopia-themes';

interface CheckboxProps {
    /** All Ztopia themes can be found in Design section. */
    ztopiaTheme?: string;
    /** Label to be displayed. */
    label?: string;
    /** Set checkbox value. */
    value?: string;
    /** Default checked state. */
    defaultChecked?: boolean;
    /** A callback function triggered when the checked state is changing. */
    onCheck?: (value: string, checked: boolean) => void;
    className?: string;
}

interface CheckboxState {
    checked: boolean;
    value: string;
}

const ZtopiaCheckboxContainer = styled.div(
    {
        display: 'flex',
        alignItems: 'center',
        '&.checked': {
            '> .ztopia-checkbox': {},
        },
        '> .ztopia-checkbox': {
            width: '16px',
            height: '16px',
            border: '1px solid',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
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
        const { defaultChecked, value } = props;
        this.state = {
            checked: defaultChecked || false,
            value: value || '',
        };
    }

    public render(): JSX.Element {
        const { ztopiaTheme, label, className } = this.props;
        const { checked } = this.state;
        const classNames = cx(
            'ztopia-checkbox-container',
            checked && 'checked',
            className,
        );
        return (
            <ThemeProvider theme={CheckboxThemes}>
                <ZtopiaCheckboxContainer
                    ztopiaTheme={ztopiaTheme}
                    className={classNames}
                >
                    <div
                        className="ztopia-checkbox"
                        onClick={this.handleClickCheckbox}
                    />
                    {label && (
                        <label className="ztopia-checkbox-label">{label}</label>
                    )}
                </ZtopiaCheckboxContainer>
            </ThemeProvider>
        );
    }

    private handleClickCheckbox = (): void => {
        const { value, onCheck } = this.props;
        const { checked } = this.state;
        const newChecked = !checked;
        this.setState({
            checked: newChecked,
        });
        if (onCheck) {
            onCheck(value || '', newChecked);
        }
    };
}

export default Checkbox;
