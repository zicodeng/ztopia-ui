import * as React from 'react';
import styled, { keyframes } from 'react-emotion';

import ZtopiaThemes from 'components/ztopia-themes';

const rotate = keyframes`
   0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const loaderSize = '25px';

const BasicLoader = styled.div`
    width: ${loaderSize};
    height: ${loaderSize};
    border-radius: ${loaderSize};
    position: relative;
    border: 2px solid transparent;
    border-top-color: ${ZtopiaThemes.Basic.Color.DARK};
    animation: ${rotate} 1s infinite linear;
`;

const Basic: React.SFC<{}> = props => {
    const { ...restProps } = props;
    return <BasicLoader {...restProps} />;
};

export default Basic;
