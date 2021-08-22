import React, { memo, ReactNode } from 'react';
import Joyride, { CallBackProps, Locale, Styles } from 'react-joyride';

export type Placement = 'top' | 'bottom' | 'left' | 'right' | 'auto' | 'center';

export enum Action {
  Init = 'init',
  Start = 'start',
  Stop = 'stop',
  Reset = 'reset',
  Restart = 'restart',
  Prev = 'prev',
  Next = 'next',
  Go = 'go',
  Index = 'index',
  Close = 'close',
  Skip = 'skip',
  Update = 'update',
}

export enum Status {
  Idle = 'idle',
  Ready = 'ready',
  Waiting = 'waiting',
  Running = 'running',
  Paused = 'paused',
  Skipped = 'skipped',
  Finished = 'finished',
  Error = 'error',
}

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
  callback?: (data: CallBackProps) => void;
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
