import React from 'react';
import { Formatter, formatters } from '../formatters/index';

export interface CommonProps {
  /**
   * Pass your own formatter function.
   */
  valueFormatter: Formatter;
  /**
   * Prefix for the CSS selectors in the DOM.
   */
  stylePrefix: string;
  /**
   * Value to display..
   */
  value: number;
}

export interface ValueProps extends CommonProps {}

export const Value = ({ valueFormatter, stylePrefix = 'rvf_Flash', value }: ValueProps) => {
  return <span className={`${stylePrefix}__value`}>{valueFormatter(value)}</span>;
};
