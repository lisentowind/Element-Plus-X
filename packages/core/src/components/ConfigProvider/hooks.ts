import { APP_CONFIG_PROVIDE_KEY, DEFAULT_APP_CONFIG } from './constants';

export function useConfigProvider() {
  return inject(APP_CONFIG_PROVIDE_KEY, DEFAULT_APP_CONFIG);
}
