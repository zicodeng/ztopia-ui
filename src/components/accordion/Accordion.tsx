import { ThemeProvider } from 'emotion-theming';
import * as React from 'react';
import styled, { cx } from 'react-emotion';

import AccordionThemes from 'components/accordion/accordion-themes';
import { isThemeValid } from 'components/ztopia-themes';
import Panel, { PanelProps } from './Panel';

interface AccordionProps {
    /** All Ztopia themes can be found in Introduction section. */
    ztopiaTheme?: string;
    /** Allow multiple panels to be opened simultaneously. */
    multiOpen?: boolean;
    /** Start with all panels open or closed. */
    defaultOpenAll?: boolean;
    className?: string;
}

interface IPanelToggleStates {
    [key: string]: boolean;
}

interface AccordionState {
    panelToggleStates: IPanelToggleStates;
}

const ZtopiaAccordion = styled.ul(
    {
        width: '100%',
        padding: '0',
        margin: '0',
        listStyle: 'none',
        border: '2px solid',
        '> .ztopia-panel': {
            '&:last-child': {
                '> .ztopia-panel-content': {
                    '> p, > div': {
                        marginBottom: '10px',
                    },
                },
            },
            '&:not(:last-child)': {
                marginBottom: '2px',
            },
            '&.active > .ztopia-panel-header > .ztopia-icon-chevron-left': {
                transform: 'rotate(-90deg)',
            },
            '> .ztopia-panel-header': {
                padding: '10px',
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                '> .ztopia-icon-chevron-left': {
                    width: '10px',
                    position: 'absolute',
                    right: '10px',
                    transition: 'all 0.5s ease',
                },
            },
            '> .ztopia-panel-content': {
                overflow: 'hidden',
                transition: 'all 0.5s ease',
                '> p, > div': {
                    margin: '10px',
                    '&:last-child': {
                        marginBottom: '8px',
                    },
                },
            },
        },
    },
    (props: AccordionProps) => {
        const { ztopiaTheme } = props;
        return ztopiaTheme && isThemeValid(ztopiaTheme)
            ? AccordionThemes[ztopiaTheme]
            : {};
    },
);

class Accordion extends React.Component<AccordionProps, AccordionState> {
    static defaultProps = {
        ztopiaTheme: 'Basic',
        multiOpen: false,
        defaultOpenAll: false,
    };

    constructor(props: AccordionProps) {
        super(props);
        this.state = {
            panelToggleStates: {},
        };
    }

    public render(): JSX.Element {
        const { ztopiaTheme, className, children } = this.props;
        const { panelToggleStates } = this.state;
        const classNames = cx('ztopia-accordion', className);

        return (
            <ThemeProvider theme={AccordionThemes}>
                <ZtopiaAccordion
                    ztopiaTheme={ztopiaTheme}
                    className={classNames}
                >
                    {React.Children.map(children, child => {
                        const {
                            panelKey,
                            togglePanel,
                        } = (child as React.ReactElement<PanelProps>).props;
                        return React.cloneElement(
                            child as React.ReactElement<PanelProps>,
                            {
                                open: panelToggleStates[panelKey],
                                togglePanel: togglePanel || this.togglePanel,
                            },
                        );
                    })}
                </ZtopiaAccordion>
            </ThemeProvider>
        );
    }

    public componentWillMount(): void {
        const panelToggleStates = this.initPanelToggleStates();
        this.setState({
            panelToggleStates,
        });
    }

    private initPanelToggleStates = () => {
        const { children, defaultOpenAll } = this.props;

        this.validateChildrenQuantity(children);

        return React.Children.toArray(children).reduce(
            (panelToggleStates, child) => {
                this.validateChildType(child);
                this.validateChildProps(child);

                const childProps = (child as React.ReactElement<PanelProps>)
                    .props;
                const { panelKey, open } = childProps;

                panelToggleStates[panelKey] = open || defaultOpenAll || false;
                return panelToggleStates;
            },
            {} as IPanelToggleStates,
        );
    };

    private validateChildrenQuantity = (children: React.ReactNode): void => {
        if (!children) {
            throw new Error(
                'No children found. Please create at lease one Panel element under Accordion.',
            );
        }
    };

    private validateChildType = (child: React.ReactChild): void => {
        if (!React.isValidElement(child)) {
            throw new Error(
                `${child} is not a valid React element. Try wrapping it inside a Panel element.`,
            );
        }
        if (
            typeof child.type === 'string' ||
            (child.type && child.type instanceof Panel)
        ) {
            throw new Error(
                `Element type ${
                    child.type
                } is not supported. Please wrap it inside a Panel element.`,
            );
        }
    };

    private validateChildProps = (child: React.ReactChild): void => {
        const { panelKey } = (child as React.ReactElement<PanelProps>).props;
        if (!panelKey) {
            throw new Error('panelKey is a required props for Panel.');
        }
    };

    private togglePanel = (
        e: React.MouseEvent<HTMLElement>,
        panelKey: string,
    ) => {
        e.preventDefault();

        const { multiOpen } = this.props;
        const { panelToggleStates } = this.state;

        const panelToggleStatesCopy = { ...panelToggleStates };

        // If a different panel is clicked on non-multi-open mode,
        // close all panels first.
        if (!multiOpen) {
            Object.keys(panelToggleStatesCopy).forEach(panelKey => {
                panelToggleStatesCopy[panelKey] = false;
            });
        }
        panelToggleStatesCopy[panelKey] = !panelToggleStates[panelKey];

        this.setState({
            panelToggleStates: panelToggleStatesCopy,
        });
    };
}

export default Accordion;
