import ZtopiaThemes from 'components/ztopia-themes';

const Basic = {
    color: ZtopiaThemes.Basic.Color.DARK_LIGHT,
    backgroundColor: 'transparent',
    borderColor: ZtopiaThemes.Basic.Color.DARK_LIGHT,
    transition: ZtopiaThemes.Basic.Animation.TRANSITION,
    '&.checked': {
        backgroundColor: ZtopiaThemes.Basic.Color.LIGHT,
        borderColor: ZtopiaThemes.Basic.Color.DARK,
        '> .ztopia-switch-checked-text': {
            color: ZtopiaThemes.Basic.Color.DARK,
        },
        '> .ztopia-switch-button': {
            backgroundColor: ZtopiaThemes.Basic.Color.DARK,
        },
    },
    '&.loading': {
        '> .ztopia-loader': {
            borderTopColor: ZtopiaThemes.Basic.Color.DARK_LIGHT,
        },
    },
    '&[disabled]': {
        borderColor: ZtopiaThemes.Basic.Color.DARK_LIGHT,
        '> .ztopia-switch-button': {
            backgroundColor: ZtopiaThemes.Basic.Color.DARK_LIGHT,
            borderColor: ZtopiaThemes.Basic.Color.DARK_LIGHT,
        },
    },
    '> .ztopia-switch-checked-text': {
        transition: ZtopiaThemes.Basic.Animation.TRANSITION,
    },
    '> .ztopia-switch-button': {
        backgroundColor: ZtopiaThemes.Basic.Color.DARK_LIGHT,
        transition: ZtopiaThemes.Basic.Animation.TRANSITION,
    },
    '> .ztopia-switch-unchecked-text': {
        transition: ZtopiaThemes.Basic.Animation.TRANSITION,
    },
};

export default Basic;
