import React from 'react';
import { Flash } from './Flash';

export const UseFlash = () => {
  return (
    <div>
      <Flash render={(value, valueFormatter) => <div>{valueFormatter(value)}</div>} />
    </div>
  );
};
