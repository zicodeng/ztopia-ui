import React, { FC, ReactNode, memo } from 'react';
import Joyride, { Locale, Styles } from 'react-joyride';

export type Placement = 'top' | 'bottom' | 'left' | 'right' | 'auto' | 'center';

export interface Step {
  title?: ReactNode;
  content: ReactNode;
  placement?: Placement;
  target: string | HTMLElement;
}

export interface TourGuideProps {
  locale?: Locale;
  styles?: Styles;
  steps: Step[];
}

export const TourGuide: FC<TourGuideProps> = memo(props => (
  <Joyride
    disableCloseOnEsc
    disableOverlayClose
    showProgress
    showSkipButton
    continuous
    {...props}
  />
));
