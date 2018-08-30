import { ThemeProvider } from 'emotion-theming';
import { find } from 'lodash';
import * as React from 'react';
import styled, { cx } from 'react-emotion';

import Loader from 'components/loader/Loader';
import SelectThemes from 'components/select/select-themes';
import { isThemeValid } from 'components/ztopia-themes';
import IconChevronLeft from 'icons/IconChevronLeft';
import IconCrossMark from 'icons/IconCrossMark';

interface Option {
    key: string;
    label: string;
    value: string;
}

interface SelectProps {
    /** All Ztopia themes can be found in the Design section. */
    ztopiaTheme?: string;
    /** Placeholder of the select. */
    placeholder?: string;
    /** Set the select mode to multi-selection. */
    multiple?: boolean;
    /** Set the select mode to search-selection. */
    search?: boolean;
    /** Define select options. */
    options?: Option[];
    /** Define default selected option or options. */
    defaultValue?: string | string[];
    /** Set the select state to disabled. */
    disabled?: boolean;
    /** Set the select state to loading. */
    loading?: boolean;
    className?: string;
    /** A callback function triggered when an option is selected.  */
    onSelect?: (selectedOption: Option) => void;
    /** A callback function triggered when an option is deselected.  */
    onDeselect?: (deselectedOption: Option) => void;
    /** A callback function triggered when selection changes. */
    onSelectionChange?: (CurrentlySelected: Option | Option[] | null) => void;
    /** A callback function triggered when search input changes. */
    onSearchChange?: (inputValue: string) => void;
}

interface SelectState {
    showOptions: boolean;
    options: Option[];
    selectedOption: Option | null | undefined;
    selectedOptions: Option[];
}

const ZtopiaSelectContainer = styled.div(
    {
        position: 'relative',
        outline: 'none',
        cursor: 'pointer',
        '&[disabled]': {
            cursor: 'not-allowed',
        },
        '&.loading': {
            '.ztopia-select__options': {
                display: 'flex',
                justifyContent: 'center',
            },
        },
        '&.show-options': {
            '.ztopia-select__icon-chevron-left': {
                transform: 'rotate(90deg)',
            },
            '.ztopia-select__options': {
                maxHeight: '200px',
                pointerEvents: 'all',
            },
        },
        '&.search': {
            '.ztopia-select__selected-options-container': {
                cursor: 'text',
            },
        },
        '.ztopia-select__selected-options-container': {
            width: '100%',
            minHeight: '42px',
            padding: '0px 10px 5px 10px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            border: '2px solid',
            borderBottom: 'none',
        },
        '.ztopia-select__placeholder': {
            margin: '5px 5px 0px 0px',
        },
        '.ztopia-select__selected-options': {
            margin: '0px',
            padding: '0px',
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            listStyle: 'none',
        },
        '.ztopia-select__selected-option': {
            height: '30px',
            margin: '5px 5px 0px 0px',
            padding: '0px 26px 0px 10px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            cursor: 'default',
        },
        '.ztopia-select__icon-cross-mark': {
            height: '14px',
            position: 'absolute',
            right: '8px',
            cursor: 'pointer',
        },
        '.ztopia-select__search-box': {
            width: '50px',
            marginTop: '5px',
            border: 'none',
            outline: 'none',
        },
        '.ztopia-select__icon-chevron-left': {
            width: '16px',
            height: '16px',
            marginTop: '3px',
            position: 'absolute',
            right: '6px',
            transform: 'rotate(-90deg)',
        },
        '.ztopia-select__options': {
            width: '100%',
            maxHeight: '0px',
            margin: '0px',
            padding: '0px',
            position: 'absolute',
            border: '2px solid',
            borderTop: 'none',
            listStyle: 'none',
            overflowY: 'auto',
            pointerEvents: 'none',
        },
        '.ztopia-select__option': {
            width: '100%',
            padding: '5px 10px',
            borderTop: '2px solid',
        },
        '.ztopia-select__loader': {
            margin: '20px 20px 30px',
        },
    },
    (props: SelectProps) => {
        const { ztopiaTheme } = props;
        return ztopiaTheme && isThemeValid(ztopiaTheme)
            ? SelectThemes[ztopiaTheme]
            : {};
    },
);

class Select extends React.Component<SelectProps, SelectState> {
    static defaultProps = {
        ztopiaTheme: 'Basic',
        multiple: false,
        search: false,
        disabled: false,
        loading: false,
        options: [],
    };

    private selectContainerRef: React.RefObject<HTMLDivElement>;
    private searchBoxRef: React.RefObject<HTMLInputElement>;

    constructor(props: SelectProps) {
        super(props);
        this.state = {
            showOptions: false,
            options: [],
            selectedOption: null,
            selectedOptions: [],
        };
        this.selectContainerRef = React.createRef();
        this.searchBoxRef = React.createRef();
    }

    public render(): JSX.Element {
        const {
            ztopiaTheme,
            multiple,
            search,
            options,
            disabled,
            loading,
            className,
        } = this.props;
        const { showOptions } = this.state;
        const classNames = cx(
            'ztopia-select__container',
            showOptions && 'show-options',
            multiple && 'multiple',
            search && 'search',
            loading && 'loading',
            className,
        );
        return (
            <ThemeProvider theme={SelectThemes}>
                <ZtopiaSelectContainer
                    ztopiaTheme={ztopiaTheme}
                    className={classNames}
                    options={options}
                    tabIndex={0}
                    onBlur={this.hideOptions}
                    onFocus={this.showOptions}
                    disabled={disabled}
                    innerRef={this.selectContainerRef}
                >
                    <div className="ztopia-select__selected-options-container">
                        {this.renderSelectedOption()}
                        <ul className="ztopia-select__selected-options">
                            {this.renderSelectedOptions()}
                            {this.renderSearchBox()}
                        </ul>
                        <IconChevronLeft className="ztopia-select__icon-chevron-left" />
                    </div>
                    {this.renderOptions()}
                </ZtopiaSelectContainer>
            </ThemeProvider>
        );
    }

    public componentWillMount(): void {
        const { multiple, options, defaultValue } = this.props;
        if (!options) {
            return;
        }
        this.setState({
            options,
        });

        if (!defaultValue) {
            return;
        }
        // Set up default value
        if (multiple) {
            if (typeof defaultValue === 'string') {
                throw new Error(
                    'Invalid defaultValue on multi-selection mode: expect an array, but got a string',
                );
            }
            const selectedOptions = options.filter(
                option => defaultValue.indexOf(option.value) !== -1,
            );
            this.setState({
                selectedOptions,
            });
        } else {
            if (Array.isArray(defaultValue)) {
                throw new Error(
                    'Invalid defaultValue on normal selection mode: expect a string, but got an array',
                );
            }
            const selectedOption = find(options, { value: defaultValue });
            this.setState({
                selectedOption,
            });
        }
    }

    private hideOptions = (): void => {
        this.setState({
            showOptions: false,
        });
    };

    private showOptions = (): void => {
        const { search, disabled } = this.props;
        if (disabled) {
            return;
        }
        // Shift focus to search box
        if (search) {
            this.focusSearchBox();
        }
        this.setState({
            showOptions: true,
        });
    };

    private renderSelectedOption = (): JSX.Element | null => {
        const { placeholder } = this.props;
        const { selectedOption, selectedOptions } = this.state;
        if (!placeholder || selectedOptions.length) {
            return null;
        }
        return (
            <span className="ztopia-select__placeholder">
                {(selectedOption && selectedOption.label) || placeholder}
            </span>
        );
    };

    private renderOptions = (): JSX.Element | null => {
        const { loading } = this.props;
        const { options, selectedOption, selectedOptions } = this.state;
        if (!options) {
            return null;
        }
        const li = options.map(option => {
            const { key, label, value } = option;
            const classNames = cx(
                'ztopia-select__option',
                (find(selectedOptions, { key: key }) ||
                    (selectedOption && selectedOption.key === key)) &&
                    'selected',
            );
            return (
                <li
                    key={key}
                    value={value}
                    className={classNames}
                    onClick={(e: React.MouseEvent<HTMLLIElement>) => {
                        e.currentTarget.classList.contains('selected')
                            ? this.handleDeselectOption(option)
                            : this.handleSelectOption(option);
                    }}
                >
                    {label}
                </li>
            );
        });
        return (
            <ul className="ztopia-select__options">
                {loading ? <Loader className="ztopia-select__loader" /> : li}
            </ul>
        );
    };

    private renderSelectedOptions = (): JSX.Element[] | null => {
        const { multiple } = this.props;
        const { selectedOptions } = this.state;
        if (!multiple || !selectedOptions.length) {
            return null;
        }
        return selectedOptions.map(selectedOption => {
            const { key, label, value } = selectedOption;
            return (
                <li
                    key={key}
                    value={value}
                    className="ztopia-select__selected-option"
                >
                    {label}
                    <IconCrossMark
                        className="ztopia-select__icon-cross-mark"
                        onClick={_ => this.handleDeselectOption(selectedOption)}
                    />
                </li>
            );
        });
    };

    private handleSelectOption = (selectedOption: Option): void => {
        const { multiple, search, onSelect, onSelectionChange } = this.props;
        const { selectedOptions } = this.state;

        if (multiple) {
            // Prevent duplicated options from being selected
            if (!find(selectedOptions, { key: selectedOption.key })) {
                const newSelectedOptions = [...selectedOptions, selectedOption];
                this.setState({
                    showOptions: true,
                    selectedOptions: newSelectedOptions,
                });
                if (onSelectionChange) {
                    onSelectionChange(newSelectedOptions);
                }
            }
        } else {
            this.setState({
                selectedOption,
                showOptions: false,
            });

            const selectContainer = this.selectContainerRef.current;
            if (selectContainer) {
                selectContainer.blur();
            }
            if (onSelectionChange) {
                onSelectionChange(selectedOption);
            }
        }

        if (search) {
            this.focusSearchBox();
            this.setState({
                showOptions: true,
            });
        }

        if (onSelect) {
            onSelect(selectedOption);
        }
    };

    private handleDeselectOption = (deselectedOption: Option): void => {
        const { multiple, search, onDeselect, onSelectionChange } = this.props;
        const { selectedOptions } = this.state;

        if (multiple) {
            const newSelectedOptions = selectedOptions.filter(
                option => option.key !== deselectedOption.key,
            );
            this.setState({
                selectedOptions: newSelectedOptions,
            });
            if (onSelectionChange) {
                onSelectionChange(newSelectedOptions);
            }
        } else {
            const newSelectedOption = null;
            this.setState({
                selectedOption: newSelectedOption,
            });
            if (onSelectionChange) {
                onSelectionChange(newSelectedOption);
            }
        }

        if (search) {
            this.focusSearchBox();
            this.setState({
                showOptions: true,
            });
        }

        if (onDeselect) {
            onDeselect(deselectedOption);
        }
    };

    private renderSearchBox = (): JSX.Element | null => {
        const { search } = this.props;
        if (!search) {
            return null;
        }
        return (
            <input
                type="text"
                className="ztopia-select__search-box"
                onChange={this.handleChangeSearchInput}
                ref={this.searchBoxRef}
            />
        );
    };

    private handleChangeSearchInput = (
        e: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        const { onSearchChange, options } = this.props;
        const { showOptions } = this.state;
        if (!options) {
            return;
        }
        if (!showOptions) {
            this.setState({
                showOptions: true,
            });
        }

        const inputValue = e.currentTarget.value;
        const newOptions = inputValue
            ? options.filter(option =>
                  option.label
                      .toLowerCase()
                      .startsWith(inputValue.toLowerCase()),
              )
            : options;
        this.setState({
            options: newOptions,
        });

        if (onSearchChange) {
            onSearchChange(inputValue);
        }
    };

    private focusSearchBox = (): void => {
        const searchBox = this.searchBoxRef.current;
        if (searchBox) {
            searchBox.focus();
        }
    };
}

export default Select;
