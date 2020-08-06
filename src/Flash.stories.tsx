import React from 'react';

import { Flash } from './Flash';

export default {
  title: 'Flash',
  component: Flash,
};

export const Default = () => {
  const [value, setValue] = React.useState<number>(20_000);

  return (
    <div>
      <div>
        <button type="button" onClick={() => setValue(value + 1)}>
          Add one
        </button>

        <button type="button" onClick={() => setValue(value - 1)}>
          Subtract one
        </button>
      </div>

      <hr />

      <Flash value={value} />
    </div>
  );
};
