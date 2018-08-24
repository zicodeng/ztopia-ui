import * as React from 'react';

import LoaderThemes from 'components/loader/loader-themes';
import { isThemeValid } from 'components/ztopia-themes';

interface LoaderProps {
    /** All Ztopia themes can be found in Introduction section. */
    ztopiaTheme?: string;
}

const Loader: React.SFC<LoaderProps> = props => {
    const { ztopiaTheme, ...restProps } = props;
    if (!ztopiaTheme || !isThemeValid(ztopiaTheme)) {
        return null;
    }
    const ZtopiaLoader = LoaderThemes[ztopiaTheme];
    return <ZtopiaLoader {...restProps} className="ztopia-loader" />;
};

Loader.defaultProps = {
    ztopiaTheme: 'Basic',
};

export default Loader;
