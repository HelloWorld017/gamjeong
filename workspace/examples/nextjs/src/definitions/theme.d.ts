import { Theme as AppTheme } from '@/features/theme';

declare module '@emotion/react' {
  declare interface Theme extends AppTheme {};
}
