import * as React from 'react';
import styled, { keyframes } from 'react-emotion';

import ZtopiaThemes from 'components/ztopia-themes';

const lineScalePulseOutRapid = keyframes`
    0% {
        transform: scaley(1.0);
    }
    80% {
        transform: scaley(0.3);
    }
    90% {
        transform: scaley(1.0);
    }
`;

const SpaceLoader = styled.div`
    > div {
        width: 2px;
        height: 25px;
        background-color: ${ZtopiaThemes.Space.Color.PRIMARY};
        margin: 2px;
        display: inline-block;
        vertical-align: middle;
        animation: ${lineScalePulseOutRapid} 0.9s -0.5s infinite cubic-bezier(0.11, 0.49, 0.38, 0.78);

        &:nth-child(2),
        &:nth-child(4) {
            animation-delay: -0.25s !important;
        }

        &:nth-child(1),
        &:nth-child(5) {
            animation-delay: 0s !important;
        }
    }
`;

const Space: React.SFC<{}> = props => {
    const { ...restProps } = props;
    return (
        <SpaceLoader {...restProps}>
            <div />
            <div />
            <div />
            <div />
            <div />
        </SpaceLoader>
    );
};

export default Space;
