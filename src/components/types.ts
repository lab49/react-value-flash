import { ComponentType } from 'react';
import { ContainerProps } from './Container';
import { ValueProps } from './Value';

export interface ComponentsConfig {
  Container: ComponentType<ContainerProps>;
  Value: ComponentType<ValueProps>;
}
