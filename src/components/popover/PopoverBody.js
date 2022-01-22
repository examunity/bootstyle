import React from 'react';
import PropTypes from 'prop-types';
import View from '../View';
import TextStyleProvider from '../../style/TextStyleProvider';
import StyleSheet from '../../style/StyleSheet';
import { getStyles } from '../../utils';
import css from '../../style/css';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.popover-body': css`
    padding: $popover-body-padding-y $popover-body-padding-x;
  `,
  '.popover-body-text': css`
    color: $popover-body-color;
  `,
});

const PopoverBody = React.forwardRef((props, ref) => {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.popover-body']);

  const textClasses = getStyles(styles, ['.popover-body-text']);

  return (
    <View {...elementProps} ref={ref} style={[classes]}>
      <TextStyleProvider style={textClasses}>{children}</TextStyleProvider>
    </View>
  );
});

PopoverBody.displayName = 'PopoverBody';
PopoverBody.propTypes = propTypes;

export default PopoverBody;
