import styled from 'styled-components/native';
import Colors from '../../constants/Colors';

export const AskContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding-horizontal: 24px;
  background-color: ${Colors.orange};
`;

export const Icon = styled.Image`
  height: 64px;
  width: 64px;
  margin-bottom: 42px;
  resize-mode: contain;
`;

export const Title = styled.Text`
  color: ${Colors.almostWhite};
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  text-transform: uppercase;
`;

export const Description = styled.Text`
  color: ${Colors.almostWhite};
  font-size: 16px;
  padding-horizontal: 24px;
  text-align: center;
  margin-bottom: 42px;
`;

export const AskText = styled.Text`
  color: ${Colors.almostWhite};
  font-size: 16px;
  padding-horizontal: 24px;
`;
