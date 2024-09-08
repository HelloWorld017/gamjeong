import ImageLogo from '../../_assets/svgs/ImageLogo.react.svg';
import * as styles from './Footer.styles';

export const Footer = () => (
  <footer css={styles.footerStyle}>
    <div css={styles.footerContentStyle}>
      <div css={styles.sectionStyle}>
        <div css={styles.brandingStyle}>
          <ImageLogo css={styles.brandingIconStyle}/>
          Gamjeong
        </div>
        <div css={styles.sectionItemStyle}>
          Developed by nenw*
        </div>
      </div>
    </div>
  </footer>
);
