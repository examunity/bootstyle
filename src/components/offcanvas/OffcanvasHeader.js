import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import View from '../View';
import css from '../../style/css';
import { getStyles } from '../../utils';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  '.offcanvas-header': css`
    display: flex;
    flex-direction: row; // added for bootstyle
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    padding: $offcanvas-padding-y $offcanvas-padding-x;
  `,
});

function OffcanvasHeader(props) {
  const { children, style, ...elementProps } = props;

  const classes = getStyles(styles, ['.offcanvas-header']);

  return (
    <View {...elementProps} style={[classes, style]}>
      {children}
    </View>
  );
}

OffcanvasHeader.propTypes = propTypes;

export default OffcanvasHeader;
