import type { Props } from '../Flash';

type Formatters = {
  [K in Extract<Props['formatter'], string>]: (value: Props['value']) => string;
};

const numberFormatter = (value: number) => Intl.NumberFormat('en').format(value);

const currencyFormatter = (value: number) =>
  Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(value);

const percentageFormatter = (value: number) =>
  Intl.NumberFormat('en', {
    style: 'percent',
    // See: https://github.com/microsoft/TypeScript/issues/36533
    // @ts-ignore
    signDisplay: 'exceptZero',
  }).format(value);

export const defaultFormatter = (value: number) => value;

export const formatters: Formatters = {
  number: numberFormatter,
  currency: currencyFormatter,
  percentage: percentageFormatter,
};
