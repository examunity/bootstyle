import React from 'react';
import PropTypes from 'prop-types';
import StyleSheet from '../../style/StyleSheet';
import Popover from './Popover';
import useOverlay, { OverlayPropTypes } from '../../hooks/useOverlay';

const propTypes = {
  popover: PropTypes.shape({
    title: PropTypes.node,
    content: PropTypes.node.isRequired,
    ...OverlayPropTypes,
  }),
};

export default function injectPopover(Component) {
  const OverlayPopover = React.forwardRef((props, ref) => {
    /* eslint-disable react/prop-types */
    const {
      popover: {
        title,
        content,
        trigger = 'click',
        placement = 'right',
        defaultVisible,
        visible,
        onToggle,
      },
      ...elementProps
    } = props;
    /* eslint-enable */

    const target = <Component {...elementProps} ref={ref} />;

    const template = (
      <Popover>
        {title && <Popover.Header>{title}</Popover.Header>}
        <Popover.Body>{content}</Popover.Body>
      </Popover>
    );

    return useOverlay(target, template, {
      trigger,
      placement,
      defaultVisible,
      visible,
      onToggle,
      arrowStyle: {
        backgroundColor: StyleSheet.value('popover-arrow-outer-color'),
      },
    });
  });

  OverlayPopover.displayName = 'Overlay(Popover)';
  OverlayPopover.propTypes = propTypes;

  return OverlayPopover;
}
