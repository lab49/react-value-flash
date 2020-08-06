import classnames from 'classnames';
import React from 'react';

interface Props {
  downColor?: string;
  formatter?: 'currency' | 'percentage' | 'number';
  formatterFn?: (value: Props['value']) => string;
  stylePrefix?: string;
  timeout?: number;
  transition?: string;
  transitionLength?: number;
  upColor?: string;
  value: number;
}

type Formatters = {
  [K in Extract<Props['formatter'], string>]: (value: Props['value']) => string;
};

enum FlashDirection {
  Down = 'down',
  Up = 'up',
}

const defaultFormatter = (value: number) => value;
const numberFormatter = (value: number) => Intl.NumberFormat('en').format(value);
const currencyFormatter = (value: number) =>
  Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(value);
const percentageFormatter = (value: number) =>
  // See: https://github.com/microsoft/TypeScript/issues/36533
  // @ts-ignore
  Intl.NumberFormat('en', { style: 'percent', signDisplay: 'exceptZero' }).format(value);

const formatters: Formatters = {
  number: numberFormatter,
  currency: currencyFormatter,
  percentage: percentageFormatter,
};

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
    // If there's no change, only reset.
    if (ref.current === value) {
      setFlash(null);

      return () => {};
    }

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
