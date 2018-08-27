/**
 * Available Ztopia themes.
 */
export const ztopiaThemes = ['Basic', 'Space'];

export const isThemeValid = (theme: string): boolean => {
    if (ztopiaThemes.indexOf(theme) === -1) {
        throw new Error(
            `${theme} is an invalid Ztopia theme. Please read Introduction section to view all available Ztopia themes.`,
        );
    }
    return true;
};

export interface IZtopiaThemes {
    Basic: any;
    Space: any;
    [key: string]: any;
}

const ZtopiaThemes: IZtopiaThemes = {
    Basic: {
        Color: {
            PRIMARY: '',
            PRIMARY_LIGHT: '',
            PRIMARY_DARK: '',
            ACCENT: 'red',
            ACCENT_LIGHT: '',
            ACCENT_DARK: '',
            LIGHT: '#FFFFFF',
            LIGHT_LIGHT: '',
            LIGHT_DARK: '',
            DARK: '#000000',
            DARK_LIGHT: '',
            DARK_DARK: '',
        },
        Animation: {
            TRANSITION: '',
        },
    },
    Space: {
        Color: {
            PRIMARY: '#36E2D2',
            PRIMARY_LIGHT: '',
            PRIMARY_DARK: '#2EACCC',
            ACCENT: '',
            ACCENT_LIGHT: '',
            ACCENT_DARK: '',
            LIGHT: '#FFFFFF',
            LIGHT_LIGHT: '',
            LIGHT_DARK: '',
            DARK: '#1A1A1A',
            DARK_LIGHT: '#A5A5A5',
            DARK_DARK: '',
        },
        Animation: {
            TRANSITION: 'all .5s ease',
        },
    },
};

export default ZtopiaThemes;
