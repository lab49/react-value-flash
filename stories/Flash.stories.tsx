import React from 'react';

import { Flash } from '../src/Flash';
import { ValueSetter } from './components/ValueSetter';
import { useInterval } from './useInterval';

export default {
  title: 'Flash',
  component: Flash,
};

export const Default = () => {
  return <ValueSetter>{(value: number) => <Flash value={value} />}</ValueSetter>;
};

export const StreamingData = () => {
  const [val, setVal] = React.useState<number>(1);

  useInterval(() => {
    if (Math.random() > 0.8) {
      setVal(Math.floor(Math.random() * 100) - 50);
    }
  }, 300);

  return <Flash value={val} />;
};

export const CustomColors = () => {
  return (
    <ValueSetter>
      {(value: number) => <Flash value={value} upColor="blue" downColor="purple" />}
    </ValueSetter>
  );
};

export const NoTransition = () => {
  return <ValueSetter>{(value: number) => <Flash value={value} transition="none" />}</ValueSetter>;
};

export const TransitionLength = () => {
  return (
    <ValueSetter>
      {(value: number) => <Flash value={value} timeout={1200} transitionLength={1000} />}
    </ValueSetter>
  );
};

export const NumberFormatter = () => {
  return <ValueSetter>{(value: number) => <Flash value={value} formatter="number" />}</ValueSetter>;
};

export const CurrencyFormatter = () => {
  return (
    <ValueSetter upLabel="Add one dollar" downLabel="Subtract one dollar">
      {(value: number) => <Flash value={value} formatter="currency" />}
    </ValueSetter>
  );
};

export const PercentageFormatter = () => {
  return (
    <ValueSetter initialValue={1} upLabel="Add 100%" downLabel="Subtract 100%">
      {(value: number) => <Flash value={value} formatter="percentage" />}
    </ValueSetter>
  );
};

export const CustomFormatter = () => {
  return (
    <ValueSetter>
      {(value: number) => <Flash value={value} formatterFn={(val) => `My value is: ${val}`} />}
    </ValueSetter>
  );
};

export const StylingComponentClassNames = () => {
  return (
    <>
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
          .rvf_Flash--positive:after {
            content: '👍';
          }

          .rvf_Flash--negative:after {
            content: '👎';
          }

          .rvf_Flash--even:after {
            content: '🤙';
          }

          .rvf_Flash--flashing {
            color: #fff;
          }

          .rvf_Flash--flashing-up {
            background-color: blue !important;
          }

          .rvf_Flash--flashing-down {
            background-color: orange !important;
          }
        `,
        }}
      />

      <ValueSetter initialValue={0}>{(value: number) => <Flash value={value} />}</ValueSetter>
    </>
  );
};
