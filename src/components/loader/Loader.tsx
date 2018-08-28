import * as React from 'react';
import { cx } from 'react-emotion';

import LoaderThemes from 'components/loader/loader-themes';
import { isThemeValid } from 'components/ztopia-themes';

interface LoaderProps {
    /** All Ztopia themes can be found in Design section. */
    ztopiaTheme?: string;
    className?: string;
}

const Loader: React.SFC<LoaderProps> = props => {
    const { ztopiaTheme, className, ...restProps } = props;
    if (!ztopiaTheme || !isThemeValid(ztopiaTheme)) {
        return null;
    }
    const ZtopiaLoader = LoaderThemes[ztopiaTheme];
    const classNames = cx('ztopia-loader', className);
    return <ZtopiaLoader {...restProps} className={classNames} />;
};

Loader.defaultProps = {
    ztopiaTheme: 'Basic',
};

export default Loader;
