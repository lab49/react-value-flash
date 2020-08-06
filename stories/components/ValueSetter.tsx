import React from 'react';

interface Props {
  children: (val: number) => void;
  downLabel?: string;
  initialValue?: number;
  upLabel?: string;
}

const defaultProps = {
  downLabel: 'Subtract one',
  initialValue: 20_000,
  upLabel: 'Add one',
};

export const ValueSetter = ({
  initialValue = defaultProps.initialValue,
  children,
  upLabel,
  downLabel,
}: Props) => {
  const [value, setValue] = React.useState<number>(initialValue);

  return (
    <div>
      <div>
        <button type="button" onClick={() => setValue(value + 1)}>
          {upLabel}
        </button>

        <button type="button" onClick={() => setValue(value - 1)}>
          {downLabel}
        </button>
      </div>

      <hr />

      {children(value)}
    </div>
  );
};

ValueSetter.defaultProps = defaultProps;
