import React from 'react';
import { ValueProps } from '../../src/components/Value';

export const CustomValue = ({ stylePrefix, valueFormatter, value }: ValueProps) => {
  return (
    <span className={`${stylePrefix}__value`}>
      {valueFormatter(value)}
    </span>
  );
};
