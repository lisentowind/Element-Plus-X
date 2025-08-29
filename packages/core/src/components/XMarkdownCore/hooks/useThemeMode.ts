import { useGlobalThemeManager } from './useGlobalThemeManager';

export function useDarkModeWatcher() {
  const globalThemeManager = useGlobalThemeManager();

  return {
    isDark: globalThemeManager.isDark
  };
}
