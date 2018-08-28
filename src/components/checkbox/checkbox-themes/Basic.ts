import ZtopiaThemes from 'components/ztopia-themes';

const Basic = {
    '&.checked': {
        '> .ztopia-checkbox-custom': {
            '&::after': {
                display: 'block',
            },
        },
    },
    '> .ztopia-checkbox': {},
    '> .ztopia-checkbox-custom': {
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
