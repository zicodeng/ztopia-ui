import * as React from 'react';
import { cx } from 'react-emotion';

import IconChevronLeft from 'icons/IconChevronLeft';

export interface PanelProps {
    /** Title of the panel. */
    header: string;
    /** Unique key identifying the panel from among its siblings. */
    panelKey: string;
    /** A function that toggles panel active state and is triggered when accordion panel header is clicked. */
    togglePanel?: (e: React.MouseEvent<HTMLElement>, panelKey: string) => void;
    /** Set the panel state to open. */
    open?: boolean;
    className?: string;
}

interface PanelState {
    maxPanelContentHeight: number;
}

interface PanelContentRefs {
    [key: string]: any;
}

class Panel extends React.Component<PanelProps, PanelState> {
    static defaultProps = {
        open: false,
    };

    private panelContentRefs: PanelContentRefs = {};

    constructor(props: PanelProps) {
        super(props);
        this.state = {
            maxPanelContentHeight: 0,
        };
    }

    public render(): JSX.Element {
        const {
            header,
            open,
            panelKey,
            togglePanel,
            className,
            children,
            ...restProps
        } = this.props;
        const { maxPanelContentHeight } = this.state;
        const classNames = cx('ztopia-panel', open && 'active', className);
        return (
            <li className={classNames} {...restProps} key={panelKey}>
                <header
                    className="ztopia-panel-header"
                    onClick={togglePanel && (e => togglePanel(e, panelKey))}
                >
                    {header}
                    <IconChevronLeft />
                </header>
                <div
                    className="ztopia-panel-content"
                    style={{ maxHeight: maxPanelContentHeight }}
                >
                    {React.Children.map(children, (child, idx) => {
                        this.validateChild(child);
                        return React.cloneElement(
                            child as React.ReactElement<any>,
                            {
                                ref: this.panelContentRefs[idx],
                            },
                        );
                    })}
                </div>
            </li>
        );
    }

    public componentWillMount(): void {
        const { children } = this.props;
        // Initialize panel content refs
        React.Children.forEach(children, (_, i) => {
            this.panelContentRefs[i] = React.createRef();
        });
    }

    public componentDidMount(): void {
        const { open } = this.props;
        this.expandContent(open);
    }

    public componentDidUpdate(prevProps: PanelProps): void {
        if (prevProps.open !== this.props.open) {
            this.expandContent(this.props.open);
        }
    }

    private expandContent = (open: boolean | undefined): void => {
        const maxPanelContentHeight = open ? this.calcPanelContentHeight() : 0;
        this.setState({
            maxPanelContentHeight,
        });
    };

    /**
     * Panel content height is the sum of each individual child element's
     * visible content (clientHeight), margin top and margin bottom.
     */
    calcPanelContentHeight = (): number =>
        Object.keys(this.panelContentRefs).reduce(
            (panelContentHeight: number, key: string): number => {
                const { current } = this.panelContentRefs[key];

                panelContentHeight += current.clientHeight;

                const marginTop = window
                    .getComputedStyle(current)
                    .getPropertyValue('margin-top');
                panelContentHeight += parseInt(marginTop, 10);

                const marginBottom = window
                    .getComputedStyle(current)
                    .getPropertyValue('margin-bottom');
                panelContentHeight += parseInt(marginBottom, 10);

                return panelContentHeight;
            },
            0,
        );

    private validateChild = (child: React.ReactChild): void => {
        if (!React.isValidElement(child)) {
            throw new Error(
                `${child} is not a valid React element. Try wrapping it inside a tag.`,
            );
        }
    };
}

export default Panel;
