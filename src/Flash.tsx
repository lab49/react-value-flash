import classnames from 'classnames';
import React from 'react';

interface Props {
  downColor?: string;
  stylePrefix?: string;
  timeout?: number;
  transition?: string;
  transitionLength?: number;
  upColor?: string;
  value: number;
}

enum FlashDirection {
  Down = 'down',
  Up = 'up',
}

const defaultProps = {
  downColor: '#d43215',
  stylePrefix: 'rvf_Flash',
  timeout: 200,
  transition: undefined,
  transitionLength: 8,
  upColor: '#00d865',
};

export const Flash = ({
  downColor = defaultProps.downColor,
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
    transition: transition || `background-color ${transitionLength / 100}s ease-in-out`,
    ...(flash ? { backgroundColor: flash === FlashDirection.Up ? upColor : downColor } : null),
  };
  const cls = classnames(stylePrefix, {
    [`${stylePrefix}--flashing`]: flash != null,
    [`${stylePrefix}--flashing-${flash}`]: flash != null,
  });

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
      <span className={`${stylePrefix}__value`}>{value}</span>
    </div>
  );
};

Flash.defaultProps = defaultProps;
