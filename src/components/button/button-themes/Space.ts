import ZtopiaThemes from 'components/ztopia-themes';

const Space = {
    color: ZtopiaThemes.Space.Color.LIGHT,
    backgroundColor: ZtopiaThemes.Space.Color.PRIMARY,
    borderColor: ZtopiaThemes.Space.Color.PRIMARY,
    transition: ZtopiaThemes.Space.Animation.TRANSITION,
    '&:not([disabled]):hover': {
        textShadow: `0 0 4px ${ZtopiaThemes.Space.Color.LIGHT}`,
        boxShadow: `
            0 0 8px ${ZtopiaThemes.Space.Color.PRIMARY},
            inset 0 0 8px ${ZtopiaThemes.Space.Color.PRIMARY}
        `,
    },
    '> .ztopia-loader > div': {
        backgroundColor: ZtopiaThemes.Space.Color.LIGHT,
    },
    '&.ghost': {
        color: ZtopiaThemes.Space.Color.PRIMARY,
        borderColor: ZtopiaThemes.Space.Color.PRIMARY,
        '&:not([disabled]):hover': {
            color: ZtopiaThemes.Space.Color.PRIMARY,
            textShadow: `0 0 2px ${ZtopiaThemes.Space.Color.PRIMARY}`,
            boxShadow: `
                0 0 4px ${ZtopiaThemes.Space.Color.PRIMARY},
                inset 0 0 4px ${ZtopiaThemes.Space.Color.PRIMARY}
            `,
        },
        '> .ztopia-loader > div': {
            backgroundColor: ZtopiaThemes.Space.Color.PRIMARY,
        },
    },
};

export default Space;
