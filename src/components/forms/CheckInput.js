import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import Pressable from '../Pressable';
import View from '../View';
import Text from '../Text';
import { getStyles } from '../../utils';

const propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['checkbox', 'radio', 'switch']).isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  onPress: PropTypes.func,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  inputStyle: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  labelStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  '.form-check': css`
    // display: block;
    flex-direction: row; // added for bootstyle
    min-height: $form-check-min-height;
    padding-left: $form-check-padding-start;
    margin-bottom: $form-check-margin-bottom;
  `,
  '.form-check-disabled': css`
    opacity: $form-check-label-disabled-opacity;
  `,
  '.form-check-input': css`
    @include platform(web) {
      user-select: none; // added for bootstyle
    }

    // Use additional variables instead of brackets, because brackets not supported yet.
    $lineHeight: $line-height-base * 1rem;
    $rawMarginTop: $lineHeight - $form-check-input-width;

    // float: left;
    margin-left: $form-check-padding-start * -1;
    margin-right: $form-check-padding-start - $form-check-input-width; // added for bootstyle

    width: $form-check-input-width;
    height: $form-check-input-width;
    margin-top: $rawMarginTop * 0.5; // line-height minus check height
    // vertical-align: top;
    background-color: $form-check-input-bg;
    // background-repeat: no-repeat;
    // background-position: center;
    // background-size: contain;
    border: $form-check-input-border;
    // appearance: none;
    // color-adjust: exact; // Keep themed appearance for print
    // @include transition($form-check-transition);

    &:active {
      // filter: $form-check-input-active-filter;
    }

    &:focus {
      border-color: $form-check-input-focus-border;
      // outline: 0;
      // box-shadow: $form-check-input-focus-box-shadow;
    }
  `,
  '.form-check-input-checkbox': css`
    border-radius: $form-check-input-border-radius;
  `,
  '.form-check-input-radio': css`
    border-radius: $form-check-radio-border-radius;
  `,
  '.form-check-input-checked': css`
    background-color: $form-check-input-checked-bg-color;
    border-color: $form-check-input-checked-border-color;
  `,
  '.form-check-label': css`
    color: $form-check-label-color;
    @include platform(web) {
      cursor: $form-check-label-cursor;
    }
  `,
  '.form-switch': css`
    padding-left: $form-switch-padding-start;
  `,
  '.form-check-input-switch': css`
    width: $form-switch-width;
    margin-left: $form-switch-padding-start * -1;
    margin-right: $form-switch-padding-start - $form-switch-width; // added for bootstyle
    border-radius: $form-switch-border-radius;
    // @include transition($form-switch-transition);
    align-items: flex-start; // added for bootstyle
    justify-content: center; // added for bootstyle
  `,
  '.form-check-input-switch-checked': css`
    align-items: flex-end; // added for bootstyle
    justify-content: center; // added for bootstyle
  `,
});

const getSvg = (type, value) => {
  if (type === 'checkbox' && value) {
    return StyleSheet.value('form-check-input-checked-bg-image');
  }

  if (type === 'radio' && value) {
    return StyleSheet.value('form-check-radio-checked-bg-image');
  }

  if (type === 'switch') {
    return StyleSheet.value(
      value ? 'form-switch-checked-bg-image' : 'form-switch-bg-image',
    );
  }

  return null;
};

const CheckInput = React.forwardRef((props, ref) => {
  const {
    children,
    type,
    value,
    onChange = () => {},
    onPress = () => {},
    label,
    disabled = false,
    style,
    inputStyle,
    labelStyle,
    ...elementProps
  } = props;

  if (!children && !label) {
    // eslint-disable-next-line no-console
    console.warn(
      'You need to provide either children or a label for accessibility.',
    );
  }

  const classes = getStyles(styles, [
    '.form-check',
    type === 'switch' && '.form-switch',
    disabled && '.form-check-disabled',
  ]);

  const inputClasses = getStyles(styles, [
    '.form-check-input',
    type === 'checkbox' && '.form-check-input-checkbox',
    type === 'radio' && '.form-check-input-radio',
    type === 'switch' && '.form-check-input-switch',
    value && '.form-check-input-checked',
    type === 'switch' && value && '.form-check-input-switch-checked',
  ]);

  const labelClasses = getStyles(styles, ['.form-check-label']);

  const handlePress = (event) => {
    onChange(value);
    onPress(event);
  };

  // TODO &:focus, &:active

  return (
    <Pressable
      {...elementProps}
      ref={ref}
      accessibilityRole={type}
      accessibilityChecked={value}
      accessibilityLabel={label}
      onPress={handlePress}
      disabled={disabled}
      style={[classes, style]}
    >
      <View style={[inputClasses, inputStyle]}>{getSvg(type, value)}</View>
      {children && <Text style={[labelClasses, labelStyle]}>{children}</Text>}
    </Pressable>
  );
});

CheckInput.displayName = 'CheckInput';
CheckInput.propTypes = propTypes;

export default CheckInput;