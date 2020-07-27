import React, { FC, memo, ReactNode } from 'react';
import classNames from 'classnames';

import { IconCheckmark } from '../Icons';

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
   * <@default=`0`>
   */
  currentStep?: number;
  className?: string;
  steps: Step[];
}

export const Stepper: FC<StepperProps> = memo(
  ({ isFinished = false, currentStep = 0, className, steps }) => {
    if (currentStep < 0 || currentStep >= steps.length) {
      throw new Error(
        `Stepper: prop currentStep must be a number between 0 and ${steps.length -
          1}`,
      );
    }
    return (
      <section className={classNames(className, 'ztopia-stepper')}>
        <ul className="ztopia-stepper__header">
          {steps.map(({ indicator, title, desc }, i) => {
            const isCurrent = !isFinished && currentStep === i;
            const isCompleted = isFinished || currentStep > i;

            return (
              <li key={i} className="ztopia-stepper__step">
                <span
                  className={classNames('ztopia-stepper__step-indicator', {
                    'is-active': isCurrent || isCompleted,
                  })}
                >
                  {isCompleted && !isCurrent ? (
                    <IconCheckmark />
                  ) : (
                    indicator || i + 1
                  )}
                </span>
                {i < steps.length - 1 && (
                  <span
                    className={classNames('ztopia-stepper__step-tail', {
                      'is-active': isCompleted,
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
        <div className="ztopia-stepper__content">
          {steps[currentStep].content}
        </div>
      </section>
    );
  },
);
