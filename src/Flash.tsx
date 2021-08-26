import classnames from 'classnames';
import React from 'react';

import { formatters, Formatter } from './formatters/index';

export enum FlashDirection {
  Down = 'down',
  Up = 'up',
}

export interface Props {
  /**
   * Color value when the component flashes 'down'.
   */
  downColor?: string;
  /**
   * One of the built in formatters.
   */
  formatter?: 'currency' | 'percentage' | 'number';
  /**
   * Pass your own formatter function.
   */
  formatterFn?: Formatter;
  /**
   * Prefix for the CSS selectors in the DOM.
   */
  stylePrefix?: string;
  /**
   * Amount of time the flashed state is visible for, in milliseconds.
   */
  timeout?: number;
  /**
   * Custom CSS transition property.
   */
  transition?: string;
  /**
   * Transition length, in milliseconds.
   */
  transitionLength?: number;
  /**
   * Color value when the component flashes 'up'.
   */
  upColor?: string;
  /**
   * Value to display. The only required prop.
   */
  value: number;
}

/**
 * Flash component.
 *
 * `react-value-flash` will display a flashed value on screen based
 * on some value change. This pattern is extremely common in financial
 * applications, and at Lab49, we're focused on the finance industry.
 *
 * Incorporate this component into your application and pass along a
 * number. As that number changes, this component will briefly flash
 * a color, letting the user know the number has changed. By default,
 * this component will flash green when the value changes up, or red
 * when the value changes down.
 *
 * Not only are these colors configurable, but the properties of the
 * flash itself and the formatting of the value are configurable as well.
 *
 * Furthermore, this component doesn't come with any styles, but does
 * provide plenty of hooks to add your own styles. Even though flash
 * color and transition properties are configurable as props, you can
 * still use the generated classnames (which are also configurable) to
 * add your own unique styles.
 */
export const Flash = ({
  downColor = '#d43215',
  formatter,
  formatterFn,
  timeout = 200,
  transition,
  transitionLength = 100,
  upColor = '#00d865',
  value,
  stylePrefix = 'rvf_Flash',
}: Props) => {
  const valueRef = React.useRef<number>(value);

  const valueFormatter = formatterFn ?? (formatter ? formatters[formatter] : formatters.default);
  const formattedValue = valueFormatter(value);
  const formattedValueRef = React.useRef<string>(formattedValue);

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

  React.useEffect(() => {
    // If there's no change, only reset (this prevents flash on first render).
    // TODO (brianmcallister) - Which, maybe, people might want?
    if (formattedValueRef.current === formattedValue) {
      setFlash(null);

      return () => {};
    }

    // Set the flash direction.
    setFlash(value > valueRef.current ? FlashDirection.Up : FlashDirection.Down);

    // Reset the flash state after `timeout`.
    const timeoutInterval = setTimeout(() => {
      setFlash(null);
    }, timeout);

    // Update the ref to reflect the new `value`.
    valueRef.current = value;
    formattedValueRef.current = valueFormatter(value);

    return () => {
      clearTimeout(timeoutInterval);
    };
  }, [value, formattedValue, timeout, valueFormatter]);

  return (
    <div data-testid="flash" className={cls} style={style}>
      <span className={`${stylePrefix}__value`}>{formattedValue}</span>
    </div>
  );
};
