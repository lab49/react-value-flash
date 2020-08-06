import React from 'react';

import { Flash } from '../src/Flash';
import { ValueSetter } from './components/ValueSetter';

export default {
  title: 'Flash',
  component: Flash,
};

export const Default = () => {
  return <ValueSetter>{(value: number) => <Flash value={value} />}</ValueSetter>;
};

export const WithCustomColors = () => {
  return (
    <ValueSetter>
      {(value: number) => <Flash value={value} upColor="blue" downColor="purple" />}
    </ValueSetter>
  );
};

export const WithNoTransition = () => {
  return <ValueSetter>{(value: number) => <Flash value={value} transition="none" />}</ValueSetter>;
};

export const WithTransitionLength = () => {
  return (
    <ValueSetter>
      {(value: number) => <Flash value={value} timeout={1200} transitionLength={1000} />}
    </ValueSetter>
  );
};

export const WithNumberFormatter = () => {
  return <ValueSetter>{(value: number) => <Flash value={value} formatter="number" />}</ValueSetter>;
};

export const WithCurrencyFormatter = () => {
  return (
    <ValueSetter upLabel="Add one dollar" downLabel="Subtract one dollar">
      {(value: number) => <Flash value={value} formatter="currency" />}
    </ValueSetter>
  );
};

export const WithPercentageFormatter = () => {
  return (
    <ValueSetter initialValue={1} upLabel="Add 100%" downLabel="Subtract 100%">
      {(value: number) => <Flash value={value} formatter="percentage" />}
    </ValueSetter>
  );
};

export const WithCustomFormatter = () => {
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

      <ValueSetter initialValue={1}>{(value: number) => <Flash value={value} />}</ValueSetter>
    </>
  );
};
