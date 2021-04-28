/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ValueSetter } from './ValueSetter';
import '@testing-library/jest-dom/extend-expect';

const propsSample = {
  initialValue: 20000,
  children: (val: number) => {
    return val;
  },
  upLabel: 'increase',
  downLabel: 'decrease',
};

describe('<ValueSetter component functionality testing/>', () => {
  it('ValueSetter should be rendered with two buttons with increase and decrease as the labels', () => {
    const { getByText } = render(<ValueSetter {...propsSample} />);

    expect(getByText('increase')).toBeInTheDocument();
  });
  it('ValueSetter should render the value on the screen as per the child that is passed to it', () => {
    const { getByText } = render(<ValueSetter {...propsSample} />);

    expect(getByText('20000')).toBeInTheDocument();
  });
  it('ValueSetter should increment the value passes to child on clicking the button with upLabel text', () => {
    const { getByText } = render(<ValueSetter {...propsSample} />);

    fireEvent.click(getByText('increase'));
    expect(getByText('20001')).toBeInTheDocument();
  });
  it('ValueSetter should decrement the value passes to child on clicking the button with downLabel text', () => {
    const { getByText } = render(<ValueSetter {...propsSample} />);

    fireEvent.click(getByText('decrease'));
    expect(getByText('19999')).toBeInTheDocument();
  });
});
