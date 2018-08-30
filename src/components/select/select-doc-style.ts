import { css } from 'react-emotion';

export const playgroundStyle = css`
    min-height: 250px;
    display: flex;
    flex-direction: column;

    > .ztopia-select__container {
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }
    }
`;
