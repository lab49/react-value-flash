import React from 'react';
import { render, screen } from '@testing-library/react';

import { Flash } from './Flash';
import { Formatter } from './formatters/index';

const currencyFormatterYen = (value: number): string =>
  Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(value);

describe('Given <Flash /> component', () => {
  const testCases: {
    when: string;
    value: number;
    formatter?: 'currency' | 'percentage' | 'number';
    formatterFn?: Formatter;
    then: string;
    formattedValue: string;
  }[] = [
    {
      when: 'formatter is set to number',
      value: 20000,
      formatter: 'number',
      then: 'value should be displayed in number format',
      formattedValue: '20,000',
    },
    {
      when: 'formatter is set to percentage',
      value: 20000,
      formatter: 'percentage',
      then: 'value should be displayed in percentage format',
      formattedValue: '+2,000,000%',
    },
    {
      when: 'formatter is set to currency',
      value: 20000,
      formatter: 'currency',
      then: 'value should be displayed in currency format',
      formattedValue: '$20,000.00',
    },
    {
      when: 'a custom formatter function is provided',
      value: 20000,
      formatterFn: currencyFormatterYen,
      then: 'value should be displayed in custom format',
      formattedValue: '￥20,000',
    },
    {
      when: 'no formatter is set',
      value: 20000,
      then: 'value should be displayed in default number format',
      formattedValue: '20000',
    },
  ];

  testCases.forEach(({ when, value, formatter, then, formattedValue, formatterFn }) => {
    describe(`When ${when}`, () => {
      beforeEach(() => {
        render(<Flash formatter={formatter} value={value} formatterFn={formatterFn} />);
      });
      it(`Then ${then}`, () => {
        const valueEl = screen.getByTestId('value');
        expect(valueEl.textContent).toEqual(formattedValue);
      });
    });
  });
});
