import {
  ViewStyle as BaseViewStyle,
  ImageStyle as BaseImageStyle,
  TextStyle as BaseTextStyle,
} from 'react-native';
import type {
  Placement as BasePlacement,
  PlacementAxis as BasePlacementAxis,
} from '@react-types/overlays';
import { BOOTSTRAP_RN_STYLE } from './style/createStyle';

// Styles

export type UniversalBaseStyle = BaseViewStyle | BaseImageStyle | BaseTextStyle;

export type Viewport = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type MediaHandler = {
  up: (point: Viewport) => boolean;
  down: (point: Viewport) => boolean;
  only: (point: Viewport) => boolean;
  between: (lower: Viewport, upper: Viewport) => boolean;
};

export type InteractionState = {
  interaction?: {
    hover?: boolean;
    focus: boolean;
    focusVisible: boolean;
    active?: boolean;
  };
  media: MediaHandler;
};

// Ref: https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/StyleSheet/StyleSheet.d.ts
type Falsy = undefined | null | undefined | false | '';
interface RecursiveArray<T>
  extends Array<T | ReadonlyArray<T> | RecursiveArray<T>> {}
type RegisteredStyle<T> = number & { __registeredStyleBrand: T };

export type SpecialInteractionStyle<T> = {
  (state: InteractionState): [T[], T[]];
  $$typeof: typeof BOOTSTRAP_RN_STYLE;
};

type InteractionStyle<T> =
  | SpecialInteractionStyle<T>
  | ((state: InteractionState) => T);

export type StyleProp<T> =
  | T
  | InteractionStyle<T>
  | RegisteredStyle<T>
  | RecursiveArray<T | RegisteredStyle<T> | InteractionStyle<T> | Falsy>
  | Falsy;

export type ViewStyle = StyleProp<BaseViewStyle>;

export type ImageStyle = StyleProp<BaseImageStyle>;

export type TextStyle = StyleProp<BaseTextStyle>;

export type UniversalStyle = StyleProp<
  BaseViewStyle | BaseImageStyle | BaseTextStyle
>;

export type StyleUtilities = Record<string, UniversalStyle>;

export type StyleName = string;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StyleValue = any;

// Theme

export type ThemeVariables = {
  [key: string]: StyleValue;
};

export type FormValidationState = (t: ThemeVariables) => {
  color: string;
  icon: string;
};

export type Modifier = <T>(
  props: T,
  ref: React.Ref<unknown>,
) => T & { ref?: React.Ref<unknown> };

// Navbar

export type NavbarExpand = true | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type NavbarVariant = 'light' | 'dark';
export type NavVariant = 'tabs' | 'pills';
export type SpinnerVariant = 'border' | 'grow';

export type DropDownDirection =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'start'
  | 'end';

// Placement

export type RnPlacement = BasePlacement;
export type RnPlacementAxis = BasePlacementAxis;

export type Placement =
  | RnPlacement
  | 'top center'
  | 'bottom center'
  | 'top center';
