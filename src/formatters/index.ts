import type { Props } from '../Flash';

export type Formatter = (value: Props['value']) => string;

export type Formatters = {
  [K in Extract<Props['formatter'], string>]: (value: Props['value']) => string;
} & {
  default: Formatter;
};

export type RenderProp = (value: Props['value'], valueFormatter: Formatter) => JSX.Element;

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

const defaultFormatter = (value: number) => `${value}`;

export const formatters: Formatters = {
  default: defaultFormatter,
  number: numberFormatter,
  currency: currencyFormatter,
  percentage: percentageFormatter,
};
