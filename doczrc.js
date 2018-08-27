const Color = {
    PRIMARY: '#2F80ED',
    ACCENT: '#EB5757',
    LIGHT: '#FFFFFF',
    LIGHT_DARK: '#F5F7FA',
    DARK: '#333333',
    DARK_LIGHT: '#CCD1D9',
};

// https://www.docz.site/documentation/project-configuration
export default {
    src: 'src',
    dest: 'docs/',
    base: '/ztopia-ui/',
    hashRouter: true,
    protocol: 'http',
    files: 'src/**/*.mdx',
    title: 'Ztopia UI',
    description: "It's not just another UI library. It's an entire world.",
    typescript: true,
    ordering: 'ascending',
    themeConfig: {
        /**
         * Customize codemirror theme
         * Available themes: https://codemirror.net/theme/
         */
        codemirrorTheme: 'docz-dark',
        /**
         * Logo
         */
        logo: {
            src: null,
            width: null,
        },
        /**
         * Colors (depends on select mode)
         */
        colors: {
            primary: Color.PRIMARY,
            text: Color.DARK,
            link: Color.PRIMARY,
            footerText: Color.PRIMARY,
            sidebarBg: Color.LIGHT_DARK,
            sidebarText: Color.DARK,
            background: Color.LIGHT,
            border: Color.DARK_LIGHT,
            theadColor: Color.DARK,
            theadBg: Color.LIGHT_DARK,
            tableColor: Color.DARK,
        },
        /**
         * Styles
         */
        styles: {
            body: {
                fontFamily: "'Source Sans Pro', Helvetica, sans-serif",
                fontSize: 16,
                lineHeight: 1.6,
            },
            container: {
                width: 920,
                padding: ['20px 30px', '0 40px 40px'],
            },
            h1: {
                margin: ['40px 0 20px', '60px 0 20px', '40px 0'],
                fontSize: [36, 42, 48],
                fontWeight: 400,
                letterSpacing: '-0.02em',
            },
            h2: {
                margin: ['20px 0 20px', '35px 0 20px'],
                lineHeight: ['1.2em', '1.5em'],
                fontSize: 28,
                fontWeight: 400,
                letterSpacing: '-0.02em',
            },
            h3: {
                margin: '25px 0 10px',
                fontSize: [22, 24],
                fontWeight: 400,
            },
            h4: {
                fontSize: 20,
                fontWeight: 400,
            },
            h5: {
                fontSize: 18,
                fontWeight: 400,
            },
            h6: {
                fontSize: 16,
                fontWeight: 400,
            },
            list: {
                padding: 0,
                margin: '10px 0 10px 20px',
            },
            playground: {
                padding: ['1.5em', '2em'],
            },
            code: {
                margin: '0 3px',
                padding: '4px 6px',
                borderRadius: '3px',
                fontFamily: '"Source Code Pro", monospace',
                fontSize: 14,
            },
            pre: {
                fontFamily: '"Source Code Pro", monospace',
                fontSize: 14,
                lineHeight: 1.8,
            },
            table: {
                marginBottom: [20, 40],
                fontFamily: '"Source Code Pro", monospace',
                fontSize: 14,
            },
        },
    },
};
