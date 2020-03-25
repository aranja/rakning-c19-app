import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import colors from '../../constants/Colors';

export const Close = props => (
  <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <Path
      d="M16 2L2 16"
      strokeWidth="2"
      stroke={props.color || colors.breidholtAtNight}
      strokeMiterlimit="10"
      strokeLinecap="square"
    />
    <Path
      d="M16 16L2 2"
      strokeWidth="2"
      stroke={props.color || colors.breidholtAtNight}
      strokeMiterlimit="10"
      strokeLinecap="square"
    />
  </Svg>
);

export const CheckIcon = ({ isChecked }) =>
  isChecked ? (
    <Svg width="18" height="19" fill="none">
      <Rect
        width="16"
        height="16"
        x="1"
        y="1.5723"
        fill="#ff7a4c"
        stroke="#ff7a4c"
        strokeWidth="2"
        rx="2"
      />
      <Path
        fill="#000"
        d="M6.8061 12.2245L3.9517 9.3701l-.972.9652 3.8264 3.8264 8.2142-8.2141-.9652-.9652-7.249 7.2421z"
      />
    </Svg>
  ) : (
    <Svg width="18" height="19" fill="none">
      <Rect
        width="16"
        height="16"
        x="1"
        y="1.5723"
        stroke="#ff7a4c"
        strokeWidth="2"
        rx="2"
      />
    </Svg>
  );

export default {
  close: Close,
  check: CheckIcon,
};
