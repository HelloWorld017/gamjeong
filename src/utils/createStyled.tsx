/** @jsxImportSource gamjeong */

import isPropValid from '@emotion/is-prop-valid';
import { forwardRef } from 'react';
import type { Interpolation } from '@emotion/serialize';
import type {
  StyledBaseProps,
  StyledComponentInternal,
  StyledInterpolation,
  StyledOptions,
  StyledProps,
  StyledTagType,
} from '@/types/Styled';
import type { Theme } from '@emotion/react';

const testOmitPropsOnStringTag = isPropValid;
const testOmitPropsOnComponent = (key: string) => key !== 'theme';

export const getDefaultShouldForwardProp =
  <Props extends StyledBaseProps>(tag: StyledTagType<Props>) =>
    typeof tag === 'string' &&
    tag.charCodeAt(0) > 96
      ? testOmitPropsOnStringTag
      : testOmitPropsOnComponent;

export const composeShouldForwardProps =
  <Props extends StyledBaseProps>(
    tag: StyledComponentInternal<Props> | string,
    options: StyledOptions | undefined,
    isReal: boolean
  ) => {
    const optionsShouldForwardProp = options?.shouldForwardProp;
    if (optionsShouldForwardProp) {
      if (typeof tag === 'string' || !tag.__emotion_forwardProp) {
        return optionsShouldForwardProp;
      }

      return (propName: string) =>
        !!tag.__emotion_forwardProp?.(propName) &&
        optionsShouldForwardProp(propName);
    }

    if (isReal && typeof tag !== 'string') {
      return tag.__emotion_forwardProp;
    }

    return undefined;
  };


const ILLEGAL_ESCAPE_SEQUENCE_ERROR =
`You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`;

const isTemplateStringsArray = (value: unknown): value is TemplateStringsArray =>
  Array.isArray(value) && 'raw' in value && value.raw !== null && value.raw !== undefined;

export const createStyled = <Props extends StyledBaseProps>(
  tag: StyledTagType<Props>,
  options?: StyledOptions
) => {
  if (process.env.NODE_ENV !== 'production') {
    if (tag === undefined) {
      throw new Error(
        'You are trying to create a styled element with an undefined component.\n' +
        'You may have forgotten to import it.'
      );
    }
  }

  const internalTag = tag as StyledComponentInternal<Props> | string;
  const isReal = typeof internalTag !== 'string' && internalTag.__emotion_real === tag;
  const baseTag = (isReal && internalTag.__emotion_base) || internalTag;

  let identifierName: string | undefined;
  let targetClassName: string | undefined;
  if (options !== undefined) {
    identifierName = options.label;
    targetClassName = options.target;
  }

  const shouldForwardProp = composeShouldForwardProps(internalTag, options, isReal);
  const defaultShouldForwardProp =
    shouldForwardProp || getDefaultShouldForwardProp(baseTag);

  const shouldUseAs = !defaultShouldForwardProp('as');

  return (
    template: StyledInterpolation<Props> | TemplateStringsArray | null | undefined,
    ...interpolations: StyledInterpolation<Props>[]
  ): StyledComponentInternal<Props> => {
    let styles =
      isReal && internalTag.__emotion_styles !== undefined
        ? internalTag.__emotion_styles.slice(0)
        : [];

    if (identifierName !== undefined) {
      styles.push(`label:${identifierName};`);
    }


    if (template === null || template === undefined) { /* Do nothing */ }
    else if (!isTemplateStringsArray(template)) {
      styles.push(template);
      styles.push(...interpolations);
    }
    else {
      if (process.env.NODE_ENV !== 'production' && template[0] === undefined) {
        console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR)
      }

      styles.push(template[0]);

      for (let i = 0; i < interpolations.length; i++) {
        if (process.env.NODE_ENV !== 'production' && template[i] === undefined) {
          console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR)
        }

        styles.push(interpolations[i], template[i + 1]);
      }
    }

    const Styled = forwardRef<
      (Props & { ref?: unknown })['ref'],
      StyledProps<Props>
    >((props, ref) => {
      const FinalTag = (shouldUseAs && props.as) || baseTag

      const isPropsIncomplete = props.theme === undefined || props.theme === null;
      const handleInterpolation = (
        interp: StyledInterpolation<Props>,
        mergedProps: Props & { theme: Theme }
      ): Interpolation<Theme> => {
        if (Array.isArray(interp)) {
          return interp.map(next => handleInterpolation(next, mergedProps));
        }

        if (typeof interp === 'function') {
          return handleInterpolation(interp(mergedProps), mergedProps);
        }

        return interp;
      };

      const css = isPropsIncomplete
        ? (theme: Theme) => {
          const mergedProps = { ...props, theme };
          return handleInterpolation(styles, mergedProps);
        }
        : handleInterpolation(styles, props as Props & { theme: Theme });

      const finalShouldForwardProp =
        shouldUseAs && shouldForwardProp === undefined
          ? getDefaultShouldForwardProp(FinalTag)
          : defaultShouldForwardProp;

      const newProps: Partial<Props> = {};
      for (let key in props) {
        if (shouldUseAs && key === 'as') continue
        if (finalShouldForwardProp(key)) {
          newProps[key as keyof Props] = props[key as keyof Props];
        }
      }

      (newProps as Props & { ref?: unknown }).ref = ref;
      (newProps as Props & { css?: Interpolation<Theme> }).css = css;
      return <FinalTag {...newProps as Props} />;
    }) as unknown as StyledComponentInternal<Props>;

    Styled.displayName =
      identifierName !== undefined
        ? identifierName
        : `Styled(${
            typeof baseTag === 'string'
              ? baseTag
              : baseTag.displayName || baseTag.name || 'Component'
          })`;

    Styled.defaultProps = typeof internalTag !== 'string'
      ? internalTag.defaultProps
      : undefined;
    Styled.__emotion_real = Styled;
    Styled.__emotion_base = baseTag;
    Styled.__emotion_styles = styles;
    Styled.__emotion_forwardProp = shouldForwardProp;

    Object.defineProperty(Styled, 'toString', {
      value() {
        if (targetClassName === undefined && process.env.NODE_ENV !== 'production') {
          return 'NO_COMPONENT_SELECTOR';
        }

        return `.${targetClassName}`;
      }
    });

    Styled.withComponent = (
      nextTag: StyledTagType<Props>,
      nextOptions?: StyledOptions
    ) => {
      return createStyled(nextTag, {
        ...options,
        ...nextOptions,
        shouldForwardProp: composeShouldForwardProps(Styled, nextOptions, true)
      })(styles);
    };

    return Styled;
  }
};
