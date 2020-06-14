import React from 'react';
import PropTypes from 'prop-types';
import icons from '../Icons';

import { LinkContainer, LinkIcon, Label } from './styles';

const touchPadding = 44;

// We make the vertical padding smaller
// so that list items in the main menu don't overlap.
const touchPaddingVertical = 8;

const IconLink = ({
  icon,
  label,
  bold,
  onPress,
  linkStyle,
  iconColor,
  accessibilityLabel,
}) => {
  const Icon = icons[icon];

  return (
    <LinkContainer
      hitSlop={{
        top: touchPaddingVertical,
        right: touchPadding,
        bottom: touchPaddingVertical,
        left: touchPadding,
      }}
      onPress={onPress}
      style={linkStyle}
      accessibilityLabel={accessibilityLabel}
    >
      {Icon && (
        <LinkIcon style={{ marginRight: label ? 10 : 0 }}>
          <Icon color={iconColor} />
        </LinkIcon>
      )}
      {label && <Label bold={bold}>{label}</Label>}
    </LinkContainer>
  );
};

IconLink.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};

IconLink.defaultProps = {
  icon: null,
  label: null,
};

export default IconLink;
