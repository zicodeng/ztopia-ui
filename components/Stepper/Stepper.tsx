import React, { FC, memo, ReactNode } from 'react';
import classNames from 'classnames';

import { Checkmark } from '../Icons';

import './Stepper.css';

export interface Step {
  title?: string;
  desc?: string;
  indicator?: ReactNode;
  content?: ReactNode;
}

export interface StepperProps {
  /**
   * If all steps are completed, then the Stepper should be considered as finished
   *
   * <@default=`false`>
   */
  isFinished?: boolean;
  /**
   * <@default=`1`>
   */
  currentStep?: number;
  className?: string;
  steps: Step[];
}

export const Stepper: FC<StepperProps> = memo(
  ({ isFinished = false, currentStep = 1, className, steps }) => {
    let currIdx = currentStep - 1;
    if (currentStep < 1 || currentStep > steps.length) {
      throw new Error(
        `Stepper: the value of prop currentStep must be a number between 0 and ${steps.length}`,
      );
    }
    return (
      <section className={classNames(className, 'ztopia-stepper')}>
        <ul className="ztopia-stepper__header">
          {steps.map(({ indicator, title, desc }, i) => {
            const isCurrent = !isFinished && currIdx === i;
            const isCompleted = isFinished || currIdx > i;
            return (
              <li key={i} className="ztopia-stepper__step">
                <span
                  className={classNames('ztopia-stepper__step-indicator', {
                    'is-completed': isCompleted,
                    'is-current': isCurrent,
                  })}
                >
                  {isCompleted && !isCurrent ? (
                    <Checkmark />
                  ) : (
                    indicator || i + 1
                  )}
                </span>
                {i < steps.length - 1 && (
                  <span
                    className={classNames('ztopia-stepper__step-tail', {
                      'is-completed': isCompleted,
                    })}
                  />
                )}
                {Boolean(title || desc) && (
                  <div className="ztopia-stepper__step-info">
                    {title && (
                      <h3 className="ztopia-stepper__step-title">{title}</h3>
                    )}
                    {desc && (
                      <p className="ztopia-stepper__step-desc">{desc}</p>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <div className="ztopia-stepper__content">{steps[currIdx].content}</div>
      </section>
    );
  },
);