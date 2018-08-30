import ZtopiaThemes from 'components/ztopia-themes';

const Basic = {
    '.ztopia-select__selected-options-container': {
        borderColor: ZtopiaThemes.Basic.Color.DARK,
    },
    '.ztopia-select__selected-option': {
        color: ZtopiaThemes.Basic.Color.LIGHT,
        backgroundColor: ZtopiaThemes.Basic.Color.DARK,
    },
    '.ztopia-select__icon-chevron-left': {
        transition: ZtopiaThemes.Basic.Animation.TRANSITION,
    },
    '.ztopia-select__options': {
        borderColor: ZtopiaThemes.Basic.Color.DARK,
        transition: ZtopiaThemes.Basic.Animation.TRANSITION,
    },
    '.ztopia-select__option': {
        borderColor: ZtopiaThemes.Basic.Color.DARK,
        '&:hover': {
            color: ZtopiaThemes.Basic.Color.LIGHT,
            backgroundColor: ZtopiaThemes.Basic.Color.DARK,
        },
        '&.selected': {
            color: ZtopiaThemes.Basic.Color.LIGHT,
            backgroundColor: ZtopiaThemes.Basic.Color.DARK,
        },
    },
};

export default Basic;
