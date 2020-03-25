import React from 'react';
import styled, { css } from 'styled-components';

type Unit = 0 | 0.5 | 1 | 1.25 | 1.5 | 1.75 | 2 | 2.5 | 3;
type Props = { unit?: Unit; fill?: boolean };

const VerticalSpacer = styled.View<Props>`
  height: ${({ unit = 1 }) => 16 * unit};
  width: 100%;

  ${({ fill }) =>
    !fill
      ? null
      : css`
          flex: 1;
        `}
`;

export const Vertical = (props: Props) => <VerticalSpacer {...props} />;
