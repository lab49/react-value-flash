import React from 'react';
import { ContainerProps } from '../../src/components/Container';

export const CustomContainer = ({ children, cls, style }: ContainerProps) => {
  const customStyles: React.CSSProperties = {
    border: '1px solid rgba(0, 0, 0, .1)',
    borderRadius: '3px',
    display: 'inline-flex',
    margin: 50,
    width: 150,
    padding: '20px 40px 25px',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont',
    fontSize: 42,
    fontWeight: 200,
    boxShadow: '0 11px 17px -8px rgba(0, 0, 0, 0.3)',
    transitionProperty: 'background-color, box-shadow, border-color !important',
  };

  return (
    <div className={cls} style={{ ...style, ...customStyles }}>
      {children}
    </div>
  );
};
