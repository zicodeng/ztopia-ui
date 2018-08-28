import ZtopiaThemes from 'components/ztopia-themes';

const Basic = {
    color: ZtopiaThemes.Basic.Color.DARK_LIGHT,
    backgroundColor: 'transparent',
    borderColor: ZtopiaThemes.Basic.Color.DARK_LIGHT,
    transition: ZtopiaThemes.Basic.Animation.TRANSITION,
    '&.active': {
        backgroundColor: ZtopiaThemes.Basic.Color.LIGHT,
        borderColor: ZtopiaThemes.Basic.Color.DARK,
        '> .ztopia-switch-active-text': {
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
    '> .ztopia-switch-active-text': {
        transition: ZtopiaThemes.Basic.Animation.TRANSITION,
    },
    '> .ztopia-switch-button': {
        backgroundColor: ZtopiaThemes.Basic.Color.DARK_LIGHT,
        transition: ZtopiaThemes.Basic.Animation.TRANSITION,
    },
    '> .ztopia-switch-inactive-text': {
        transition: ZtopiaThemes.Basic.Animation.TRANSITION,
    },
};

export default Basic;
