import classnames from 'classnames';
import React from 'react';

import { defaultFormatter, formatters } from './formatters/index';

export enum FlashDirection {
  Down = 'down',
  Up = 'up',
}

export interface Props {
  // Color value when the component flashes 'down'.
  downColor?: string;
  // One of the built in formatters.
  formatter?: 'currency' | 'percentage' | 'number';
  // Pass your own formatter function.
  formatterFn?: (value: Props['value']) => string;
  // Prefix for the CSS selectors in the DOM.
  stylePrefix?: string;
  // Amount of time the flashed state is visible for, in milliseconds.
  timeout?: number;
  // Custom CSS transition property.
  transition?: string;
  // Transition length, in milliseconds.
  transitionLength?: number;
  // Color value when the component flashes 'up'.
  upColor?: string;
  // Value to display. The only required prop.
  value: number;
}

/**
 * Default component props.
 */
const defaultProps = {
  downColor: '#d43215',
  formatter: undefined,
  formatterFn: undefined,
  stylePrefix: 'rvf_Flash',
  timeout: 200,
  transition: undefined,
  transitionLength: 100,
  upColor: '#00d865',
};

/**
 * Flash component.
 */
export const Flash = ({
  downColor = defaultProps.downColor,
  formatter,
  formatterFn,
  timeout,
  transition = defaultProps.transition,
  transitionLength = defaultProps.transitionLength,
  upColor = defaultProps.upColor,
  value,
  stylePrefix = defaultProps.stylePrefix,
}: Props) => {
  const ref = React.useRef<number>(value);
  const [flash, setFlash] = React.useState<FlashDirection | null>(null);
  const style = {
    transition: transition || `background-color ${transitionLength}ms ease-in-out`,
    ...(flash ? { backgroundColor: flash === FlashDirection.Up ? upColor : downColor } : null),
  };
  const cls = classnames(stylePrefix, {
    [`${stylePrefix}--flashing`]: flash != null,
    [`${stylePrefix}--flashing-${flash}`]: flash != null,
    [`${stylePrefix}--even`]: value === 0,
    [`${stylePrefix}--negative`]: value < 0,
    [`${stylePrefix}--positive`]: value > 0,
  });
  const valueFormatter = formatterFn ?? (formatter ? formatters[formatter] : defaultFormatter);

  React.useEffect(() => {
    // If there's no change, only reset (this prevents flash on first render).
    // TODO (brianmcallister) - Which, maybe, people might want?
    if (ref.current === value) {
      setFlash(null);

      return () => {};
    }

    // Set the flash direction.
    setFlash(value > ref.current ? FlashDirection.Up : FlashDirection.Down);

    // Reset the flash state after `timeout`.
    const timeoutInterval = setTimeout(() => {
      setFlash(null);
    }, timeout);

    // Update the ref to reflect the new `value`.
    ref.current = value;

    return () => {
      clearTimeout(timeoutInterval);
    };
  }, [value, timeout]);

  return (
    <div className={cls} style={style}>
      <span className={`${stylePrefix}__value`}>{valueFormatter(value)}</span>
    </div>
  );
};

Flash.defaultProps = defaultProps;
