import React, { ReactNode } from 'react';

export interface CommonProps {
  /**
   * classnames to be used with the Container component
   */
  cls: string;

  /**
   * Custom styles to be used for the Container component
   */
  style: React.CSSProperties;
}

export interface ContainerProps extends CommonProps {
  children: ReactNode;
}

export const Container = ({ children, cls, style }: ContainerProps) => {
  return (
    <div className={cls} style={style}>
      {children}
    </div>
  );
};
