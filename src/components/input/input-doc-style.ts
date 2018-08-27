import { css } from 'react-emotion';

export const playgroundStyle = css`
    display: flex;
    flex-direction: column;

    > .ztopia-input-outer-container {
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }
    }
`;
