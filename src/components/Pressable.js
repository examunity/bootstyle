import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Pressable as BasePressable } from 'react-native';
import TextStyleContext from '../style/TextStyleContext';
import useMedia from '../hooks/useMedia';
import useStyle from '../hooks/useStyle';
import { concatRefs } from '../utils';
import { BOOTSTYLE_ACTION } from '../symbols';

const propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  textStyle: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  styleName: PropTypes.any,
};

const Pressable = React.forwardRef((props, ref) => {
  const {
    children,
    onPress: action = () => {},
    style,
    textStyle,
    styleName,
    ...elementProps
  } = props;

  // Resolve action props
  let actionProps;
  if (action && action.$$typeof === BOOTSTYLE_ACTION) {
    const context = useContext(action.context);
    actionProps = action.handle(props, context);
  } else {
    actionProps = { onPress: action };
  }

  const media = useMedia();
  const resolveStyle = useStyle(style, styleName);
  const context = useContext(TextStyleContext);
  const resolveTextStyle = useStyle([context && context.style, textStyle]);

  const hasTextStyle = (context && context.style) || textStyle;

  return (
    <BasePressable
      {...elementProps}
      {...actionProps}
      ref={concatRefs(actionProps.ref, ref)}
      style={(interaction) => resolveStyle({ media, interaction })}
    >
      {hasTextStyle
        ? (interaction) => (
            <TextStyleContext.Provider
              value={{
                style: resolveTextStyle({ media, interaction }),
                hasAncestor: context && context.hasTextAncestor,
              }}
            >
              {children}
            </TextStyleContext.Provider>
          )
        : children}
    </BasePressable>
  );
});

Pressable.displayName = 'Pressable';
Pressable.propTypes = propTypes;

export default Pressable;
