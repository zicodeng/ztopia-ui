import ZtopiaThemes from 'components/ztopia-themes';

const Basic = {
    color: ZtopiaThemes.Basic.Color.LIGHT,
    backgroundColor: ZtopiaThemes.Basic.Color.DARK,
    borderColor: ZtopiaThemes.Basic.Color.DARK,
    '&:not([disabled]):hover': {
        color: ZtopiaThemes.Basic.Color.DARK,
        backgroundColor: 'transparent',
    },
    '> .ztopia-loader': {
        borderTopColor: ZtopiaThemes.Basic.Color.LIGHT,
    },
    '&.ghost': {
        color: ZtopiaThemes.Basic.Color.DARK,
        backgroundColor: ZtopiaThemes.Basic.Color.LIGHT,
        '&:not([disabled]):hover': {
            color: ZtopiaThemes.Basic.Color.LIGHT,
            backgroundColor: ZtopiaThemes.Basic.Color.DARK,
        },
        '> .ztopia-loader': {
            borderTopColor: ZtopiaThemes.Basic.Color.DARK,
        },
    },
};

export default Basic;
