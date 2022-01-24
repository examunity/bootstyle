import { BOOTSTYLE_ACTION } from '../../symbols';
import CollapseContext from './CollapseContext';

const toggle = {
  $$typeof: BOOTSTYLE_ACTION,
  handle: (props, context) => ({
    nativeID: context.identifier,
    ref: context.triggerRef,
    onPress: () => {
      context.setVisible((value) => !value);
    },
    accessibilityHasPopup: true,
    accessibilityExpanded: context.visible,
  }),
  context: CollapseContext,
};

export default toggle;
