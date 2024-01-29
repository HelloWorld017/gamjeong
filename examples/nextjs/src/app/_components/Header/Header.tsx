import ImageLogo from '../../_assets/svgs/ImageLogo.react.svg';
import IconEqual from '../../_assets/svgs/IconEqual.react.svg';
import IconNature from '../../_assets/svgs/IconNature.react.svg';
import type { ReactNode } from 'react';
import * as styles from './Header.styles';

type HeaderFeatureItemProps = {
  icon: ReactNode;
  title: string;
  children: ReactNode;
};

const HeaderFeatureItem = ({ icon, title, children }: HeaderFeatureItemProps) => (
  <div css={styles.featureItemStyle}>
    <span css={styles.featureItemIconStyle}>
    {icon}
    </span>
    <div css={styles.featureItemContentsWrapperStyle}>
      <span css={styles.featureItemHeadingStyle}>{title}</span>
      <span css={styles.featureItemContentsStyle}>
        {children}
      </span>
    </div>
  </div>
);

export const Header = () => (
  <header css={styles.containerStyle}>
    <ImageLogo css={styles.imageStyle} />
    <h1 css={styles.headingStyle}>
      Gamjeong
    </h1>
    <div css={styles.sectionStyle}>
      A drop-in replacement of <span css={styles.highlightStyle}>Emotion CSS</span>
      <div css={styles.lineBreakOnMobileSmallStyle} />
      for <span css={styles.highlightStyle}>React Server Components era</span>{'\n'}
    </div>
    <div css={styles.featuresStyle}>
      <HeaderFeatureItem icon={<IconNature />} title="RSC Native">
        Gamjeong leaves no client-side code,
        when used as Server Components.
      </HeaderFeatureItem>
      <HeaderFeatureItem icon={<IconEqual />} title="Isomorphic API">
        Gamjeong just wraps Emotion.
        You can alias @emotion/react with @gamjeong/react.
      </HeaderFeatureItem>
    </div>
    <div css={styles.buttonsStyle}>
      <a css={styles.buttonStyle(true)} href="/docs">
        Documentation
      </a>
      <a
        css={styles.buttonStyle(false)}
        href="https://github.com/HelloWorld017/gamjeong"
        target="_blank"
        rel="noopener noreferrer"
      >
        Source Code
      </a>
    </div>
  </header>
);
