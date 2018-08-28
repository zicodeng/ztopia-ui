import ZtopiaThemes from 'components/ztopia-themes';

const Basic = {
    '&.checked': {
        '> .ztopia-checkbox': {
            '&::after': {
                display: 'block',
            },
        },
    },
    '> .ztopia-checkbox': {
        borderColor: ZtopiaThemes.Basic.Color.DARK,
        '&::after': {
            content: '""',
            width: '10px',
            height: '10px',
            borderRadius: '10px',
            backgroundColor: ZtopiaThemes.Basic.Color.DARK,
            display: 'none',
        },
    },
    '> .ztopia-checkbox-label': {},
};

export default Basic;
