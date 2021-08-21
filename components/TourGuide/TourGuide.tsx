import React, { memo, ReactNode } from 'react';
import Joyride, { CallBackProps,Locale, Styles } from 'react-joyride';

export type Placement = 'top' | 'bottom' | 'left' | 'right' | 'auto' | 'center';

export interface Actions {
  INIT: 'init';
  START: 'start';
  STOP: 'stop';
  RESET: 'reset';
  RESTART: 'restart';
  PREV: 'prev';
  NEXT: 'next';
  GO: 'go';
  INDEX: 'index';
  CLOSE: 'close';
  SKIP: 'skip';
  UPDATE: 'update';
}

export interface Status {
  IDLE: 'idle';
  READY: 'ready';
  WAITING: 'waiting';
  RUNNING: 'running';
  PAUSED: 'paused';
  SKIPPED: 'skipped';
  FINISHED: 'finished';
  ERROR: 'error';
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
