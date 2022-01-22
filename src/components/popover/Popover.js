import React from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';
import View from '../View';
import TextStyleProvider from '../../style/TextStyleProvider';
import PopoverHeader from './PopoverHeader';
import PopoverBody from './PopoverBody';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.popover': css`
    // position: absolute;
    // top: 0;
    // left: 0 #{"/* rtl:ignore */"};
    z-index: $zindex-popover;
    // display: block;
    max-width: $popover-max-width;
    background-color: $popover-bg;
    // background-clip: padding-box;
    border: $popover-border-width solid $popover-border-color;
    border-radius: $popover-border-radius;
    // @include box-shadow($popover-box-shadow);
  `,
  '.popover-text': css`
    // Our parent element can be arbitrary since tooltips are by default inserted as a sibling of their target element.
    // So reset our font and text properties to avoid inheriting weird values.
    // @include reset-text();
    font-size: $popover-font-size;
    // Allow breaking very long words so they don't overflow the popover's bounds
    // word-wrap: break-word;
  `,
});

const Popover = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.popover']);

  const textClasses = getStyles(styles, ['.popover-text']);

  // Accessiblity role tooltip is only supported on web.
  const role = Platform.OS === 'web' ? 'tooltip' : null;

  return (
    <View
      {...elementProps}
      ref={ref}
      accessibilityRole={role}
      style={[classes, style]}
    >
      <TextStyleProvider style={textClasses}>{children}</TextStyleProvider>
    </View>
  );
});

Popover.displayName = 'Popover';
Popover.propTypes = propTypes;

Popover.Header = PopoverHeader;
Popover.Body = PopoverBody;

export default Popover;
