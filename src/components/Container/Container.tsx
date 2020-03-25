import React from 'react';

import { Wrapper } from './styles';

interface ContainerProps {
  children: React.ReactNode;
  noHorizontalPadding?: boolean;
}

const Container = ({
  children,
  noHorizontalPadding = false,
}: ContainerProps) => (
  <Wrapper noHorizontalPadding={noHorizontalPadding}>{children}</Wrapper>
);

export default Container;
