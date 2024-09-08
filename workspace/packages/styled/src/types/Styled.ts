import type { ComponentType, FunctionComponent } from 'react';
import type { Interpolation } from '@emotion/serialize';
import type { Theme } from '@emotion/react';

export type StyledBaseProps = { className?: string };
export type StyledProps<Props extends StyledBaseProps> =
  Props & {
    as?: StyledTagType<Props>;
    theme?: Theme;
  };

export type StyledTagType<Props extends StyledBaseProps> =
  | string
  | ComponentType<Props>;

export type StyledShouldForwardProp = (propName: string) => boolean;

export type StyledOptions = {
  label?: string,
  shouldForwardProp?: StyledShouldForwardProp,
  target?: string,
};

export type StyledInterpolation<Props extends StyledBaseProps> = Interpolation<Props & { theme: Theme }>;

export type StyledComponent<Props extends StyledBaseProps> =
  FunctionComponent<StyledProps<Props>> & {
    defaultProps?: Props,
    toString: () => string,
    withComponent: (
      nextTag: StyledTagType<Props>,
      nextOptions?: StyledOptions,
    ) => StyledComponent<Props>,
  };

/** @internal */
export type StyledComponentInternal<Props extends StyledBaseProps> =
  StyledComponent<StyledProps<Props>> & {
    __emotion_real: StyledComponent<Props>,
    __emotion_base: StyledTagType<Props>,
    __emotion_styles: StyledInterpolation<Props>[],
    __emotion_forwardProp?: StyledShouldForwardProp,
  };
