import React from 'react';
import { Platform, I18nManager } from 'react-native';
import StyleSheet from '../../style/StyleSheet';
import css from '../../style/css';
import { getStyles, optional } from '../../utils';
import useForcedContext from '../../hooks/useForcedContext';
import ListContext from '../helpers/ListContext';
import View from '../View';
import Text from '../Text';

export interface BreadcrumbItemProps {
  children: React.ReactNode;
  active: boolean;
  style?: React.CSSProperties;
  textStyle?: any;
  [key: string]: any;
}

const styles = StyleSheet.create({
  '.breadcrumb-item + .breadcrumb-item': css`
    flex-direction: row; // added for bootstrap-rn
    padding-left: $breadcrumb-item-padding-x;
  `,
  '.breadcrumb-item + .breadcrumb-item::before': css`
    // float: left; // Suppress inline spacings and underlining of the separator
    padding-right: $breadcrumb-item-padding-x;
    color: $breadcrumb-divider-color;
  `,
  '.breadcrumb-item.active --text': css`
    color: $breadcrumb-active-color;
  `,
});

const BreadcrumbItem = React.forwardRef<any, BreadcrumbItemProps>(
  (props, ref) => {
    const {
      children,
      active = false,
      style,
      dividerStyle,
      textStyle,
      ...elementProps
    } = props;

    const { first } = useForcedContext(ListContext);

    const classes = getStyles(styles, [
      !first && '.breadcrumb-item + .breadcrumb-item',
    ]);
    const textClasses = getStyles(styles, [
      active && '.breadcrumb-item.active --text',
    ]);
    const dividerClasses = getStyles(styles, [
      '.breadcrumb-item + .breadcrumb-item::before',
    ]);

    const role = Platform.OS === 'web' ? 'listitem' : null;

    return (
      <View
        {...elementProps}
        ref={ref}
        role={role}
        {...optional(active, { 'aria-current': 'page' })}
        style={[classes, style]}
        textStyle={[textClasses, textStyle]}
      >
        {!first && (
          <Text style={[dividerClasses, dividerStyle]}>
            {I18nManager.isRTL
              ? StyleSheet.value('breadcrumb-divider-flipped')
              : StyleSheet.value('breadcrumb-divider')}
          </Text>
        )}
        {children}
      </View>
    );
  },
);

BreadcrumbItem.displayName = 'BreadcrumbItem';

export default BreadcrumbItem;
