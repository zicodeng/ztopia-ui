import React, { memo, ReactNode } from 'react';
import Joyride, { Locale, Styles } from 'react-joyride';

export type Placement = 'top' | 'bottom' | 'left' | 'right' | 'auto' | 'center';

export interface Step {
  title?: ReactNode;
  content: ReactNode;
  placement?: Placement;
  target: string | HTMLElement;
}

export interface TourGuideProps {
  /**
   * Setting a number here will turn it into controlled mode
   */
  stepIndex?: number;
  locale?: Locale;
  styles?: Styles;
  steps: Step[];
}

export const TourGuide = memo<TourGuideProps>((props) => (
  <Joyride
    disableCloseOnEsc
    disableOverlayClose
    showProgress
    showSkipButton
    continuous
    {...props}
  />
));
