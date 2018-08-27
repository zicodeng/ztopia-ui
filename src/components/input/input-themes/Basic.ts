import ZtopiaThemes from 'components/ztopia-themes';

const Basic = {
    color: ZtopiaThemes.Basic.Color.DARK,
    '&.error > .ztopia-input-inner-container': {
        borderColor: ZtopiaThemes.Basic.Color.ACCENT,
    },
    '> .ztopia-input-inner-container': {
        borderColor: ZtopiaThemes.Basic.Color.DARK,
        '> .ztopia-prefix-icon, > .ztopia-prefix-label, > .ztopia-suffix-icon, > .ztopia-suffix-label': {
            color: ZtopiaThemes.Basic.Color.LIGHT,
            backgroundColor: ZtopiaThemes.Basic.Color.DARK,
        },
        '> .ztopia-input': {},
    },
    '> .ztopia-input-error-message': {
        margin: '5px 0',
        color: ZtopiaThemes.Basic.Color.ACCENT,
    },
};

export default Basic;
