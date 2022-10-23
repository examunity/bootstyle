import { PixelRatio, I18nManager } from 'react-native';

export function each(source, apply) {
  return Object.entries(source)
    .map(([key, value]) => {
      const resolve = typeof value === 'function' ? value : () => value;

      return apply(key, resolve);
    })
    .reduce((carry, item) => Object.assign(carry, item), {});
}

export function normalize(value) {
  return value.reduce((carry, item) => Object.assign(carry, item), {});
}

export function makeProxy(name, keys) {
  return keys.reduce(
    (result, key) => ({ ...result, [key]: (t) => t[name][key] }),
    {},
  );
}

export function makeArray(length, callback) {
  return Array.from({ length }, (_, i) => (callback ? callback(i) : i));
}

export function getStyles(styles, keys) {
  return keys.filter((key) => !!key).map((key) => styles[key]);
}

export function concatRefs(...refs) {
  return (element) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        // eslint-disable-next-line no-param-reassign
        ref.current = element;
      }
    });
  };
}

export function concatFns(...fns) {
  return (event) => {
    fns.forEach((fn) => {
      if (fn) {
        fn(event);
      }
    });
  };
}

export function optional(condition, value) {
  return condition ? value : undefined;
}

export function getElementId(identifier, name) {
  return `${identifier}${name ? `-${name}` : ''}`;
}

export function transformPlacement(placement) {
  if (placement === 'left') {
    return I18nManager.isRTL ? 'end' : 'start';
  }

  if (placement === 'right') {
    return I18nManager.isRTL ? 'start' : 'end';
  }

  return placement;
}

export function convertToNumber(value) {
  return parseFloat(
    value.replace(
      /([+-])?([\d.Ee]+)rem/g,
      (_, unary, number) =>
        `${unary || ''}${PixelRatio.getFontScale() * 16 * number}px`,
    ),
  );
}
