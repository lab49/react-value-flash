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
  const [hasRan, setHasRan] = React.useState<boolean>(false);
  const [val, setVal] = React.useState<number>(1);

  useInterval(() => {
    if (Math.random() > 0.8) {
      setHasRan(true);
      setVal(Math.floor(Math.random() * 100) - 50);
    }
  }, 300);

  return (
    <div>
      <p>
        Stream:&nbsp;
        {hasRan ? 'Connected!' : 'Loading...'}
      </p>

      <Flash value={val} />
    </div>
  );
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
      {(value: number) => (
        <Flash value={value} formatterFn={(val) => `[${`${val}`.split('').join(',')}]`} />
      )}
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

export const MakeItNice = () => {
  return (
    <>
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
          .rvf_Flash {
            border: 1px solid rgba(0, 0, 0, .1);
            border-radius: 3px;
            display: inline-flex;
            margin: 50px;
            width: 150px;
            padding: 20px 40px 25px;
            align-items: center;
            justify-content: center;
            font-family: -apple-system, BlinkMacSystemFont;
            font-size: 42px;
            font-weight: 200;
            box-shadow: 0 11px 17px -8px rgba(0, 0, 0, 0.3);
            transition-property: background-color, box-shadow, border-color !important;
          }

          .rvf_Flash:hover {
            box-shadow: 0 11px 14px -11px rgba(0, 0, 0, 0.3);
          }

          .rvf_Flash:hover:not(.rvf_Flash--flashing) {
            background-color: rgba(0, 0, 0, 0.03);
          }

          .rvf_Flash__value {
            transition: color .1s ease-in-out;
          }

          .rvf_Flash--flashing-up {
            border-color: #07b357;
          }

          .rvf_Flash--flashing-down {
            border-color: #912b19;
          }

          .rvf_Flash--flashing .rvf_Flash__value {
            color: #fff;
          }
        `,
        }}
      />

      <ValueSetter initialValue={999}>
        {(value: number) => (
          <div className="example-wrapper">
            <Flash value={value} formatter="currency" />
          </div>
        )}
      </ValueSetter>
    </>
  );
};
