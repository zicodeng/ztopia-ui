import ZtopiaThemes from 'components/ztopia-themes';

const Basic = {
    '&.checked': {
        '> .ztopia-checkbox-custom': {
            borderColor: ZtopiaThemes.Basic.Color.DARK_LIGHT,
            '&::after': {
                display: 'block',
            },
        },
    },
    '&.disabled': {
        '> .ztopia-checkbox-custom': {
            '&::after': {
                backgroundColor: ZtopiaThemes.Basic.Color.DARK_LIGHT,
            },
        },
    },
    '> .ztopia-checkbox': {},
    '> .ztopia-checkbox-custom': {
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
