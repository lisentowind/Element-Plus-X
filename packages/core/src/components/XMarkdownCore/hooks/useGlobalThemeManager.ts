import { ref, watch } from 'vue';

/**
 * 全局主题管理器
 * 用于在多个 XMarkdown 实例之间共享主题状态
 * 优先保持用户手动切换的主题，而不是被 defaultThemeMode 覆盖
 */
class GlobalThemeManager {
  private static instance: GlobalThemeManager | null = null;

  // 当前主题状态
  private _isDark = ref(document.body.classList.contains('dark'));

  // 标记用户是否手动切换过主题
  private _userHasManuallyChanged = ref(false);

  // 标记是否已经有组件进行过初始化
  private _hasBeenInitialized = ref(false);

  // 存储到 localStorage 的键
  private readonly STORAGE_KEY = 'elx-xmarkdown-user-theme-preference';
  private readonly USER_CHANGED_KEY = 'elx-xmarkdown-user-changed-theme';
  private readonly INITIALIZED_KEY = 'elx-xmarkdown-has-initialized';

  private constructor() {
    this.loadFromStorage();
    this.setupStorageSync();
    this.setupDOMObserver();
  }

  static getInstance(): GlobalThemeManager {
    if (!GlobalThemeManager.instance) {
      GlobalThemeManager.instance = new GlobalThemeManager();
    }
    return GlobalThemeManager.instance;
  }

  /**
   * 全局设置初始主题（建议在应用启动时调用）
   */
  static setGlobalTheme(theme: 'light' | 'dark'): void {
    const manager = GlobalThemeManager.getInstance();
    manager.setTheme(theme, false);
    manager._hasBeenInitialized.value = true;
  }

  /**
   * 获取当前主题状态
   */
  get isDark() {
    return this._isDark;
  }

  /**
   * 检查用户是否手动更改过主题
   */
  get userHasManuallyChanged() {
    return this._userHasManuallyChanged.value;
  }

  /**
   * 检查是否已经初始化过
   */
  get hasBeenInitialized() {
    return this._hasBeenInitialized.value;
  }

  /**
   * 用户手动切换主题
   */
  toggleTheme(): boolean {
    const newTheme = this._isDark.value ? 'light' : 'dark';
    this.setTheme(newTheme, true);
    return this._isDark.value;
  }

  /**
   * 设置主题（支持标记是否为用户手动操作）
   */
  setTheme(theme: 'light' | 'dark', isUserAction = false): void {
    const isDark = theme === 'dark';

    // 更新 DOM
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    // 更新状态
    this._isDark.value = isDark;

    // 如果是用户操作，标记为已手动更改
    if (isUserAction) {
      this._userHasManuallyChanged.value = true;
      this.saveToStorage();
    } else if (this._hasBeenInitialized.value) {
      // 如果已经初始化过，需要保存初始化状态
      try {
        localStorage.setItem(this.INITIALIZED_KEY, 'true');
      } catch (error) {
        console.warn('Failed to save initialization state:', error);
      }
    }
  }

  /**
   * 初始化主题（只在全局第一次初始化时应用 defaultTheme）
   */
  initTheme(defaultTheme: 'light' | 'dark'): void {
    // 检查当前 DOM 状态
    const currentTheme = document.body.classList.contains('dark')
      ? 'dark'
      : 'light';

    // 如果还没有初始化过，这是第一次全局设置，应该应用默认主题
    if (!this._hasBeenInitialized.value) {
      this.setTheme(defaultTheme, false);
      this._hasBeenInitialized.value = true;
      console.log(`[XMarkdown] 首次初始化主题为: ${defaultTheme}`);
      return;
    }

    // 已经初始化过，只同步内部状态，不更改实际主题
    this._isDark.value = currentTheme === 'dark';
  }

  /**
   * 重置用户手动更改标记（用于测试或特殊情况）
   */
  resetUserPreference(): void {
    this._userHasManuallyChanged.value = false;
    this._hasBeenInitialized.value = false;
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.USER_CHANGED_KEY);
    localStorage.removeItem(this.INITIALIZED_KEY);
  }

  /**
   * 从 localStorage 加载用户偏好
   */
  private loadFromStorage(): void {
    try {
      const userChanged = localStorage.getItem(this.USER_CHANGED_KEY);
      const hasInitialized = localStorage.getItem(this.INITIALIZED_KEY);
      const storedTheme = localStorage.getItem(this.STORAGE_KEY);

      if (hasInitialized === 'true') {
        this._hasBeenInitialized.value = true;
      }

      if (userChanged === 'true') {
        this._userHasManuallyChanged.value = true;

        if (storedTheme) {
          const theme = storedTheme as 'light' | 'dark';
          this.setTheme(theme, false);
        }
      }
    } catch (error) {
      // localStorage 可能不可用，忽略错误
      console.warn('Failed to load theme preference from localStorage:', error);
    }
  }

  /**
   * 保存用户偏好到 localStorage
   */

  private saveToStorage(): void {
    try {
      const theme = this._isDark.value ? 'dark' : 'light';
      localStorage.setItem(this.STORAGE_KEY, theme);
      localStorage.setItem(this.USER_CHANGED_KEY, 'true');
      localStorage.setItem(this.INITIALIZED_KEY, 'true');
    } catch (error) {
      // localStorage 可能不可用，忽略错误
      console.warn('Failed to save theme preference to localStorage:', error);
    }
  }

  /**
   * 设置存储同步（当主题改变时自动保存）
   */
  private setupStorageSync(): void {
    watch(this._isDark, () => {
      if (this._userHasManuallyChanged.value) {
        this.saveToStorage();
      }
    });
  }

  /**
   * 监听 DOM 变化（处理外部主题切换）
   */
  private setupDOMObserver(): void {
    const observer = new MutationObserver(() => {
      const isDark = document.body.classList.contains('dark');
      if (this._isDark.value !== isDark) {
        this._isDark.value = isDark;
      }
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
}

// 全局单例实例
let globalThemeManager: GlobalThemeManager | undefined;

/**
 * Hook: 使用全局主题管理器
 */
export function useGlobalThemeManager() {
  if (!globalThemeManager) {
    globalThemeManager = GlobalThemeManager.getInstance();
  }

  return {
    isDark: globalThemeManager.isDark,
    userHasManuallyChanged: globalThemeManager.userHasManuallyChanged,
    toggleTheme: () => globalThemeManager!.toggleTheme(),
    setTheme: (theme: 'light' | 'dark', isUserAction = false) =>
      globalThemeManager!.setTheme(theme, isUserAction),
    initTheme: (defaultTheme: 'light' | 'dark') =>
      globalThemeManager!.initTheme(defaultTheme),
    resetUserPreference: () => globalThemeManager!.resetUserPreference()
  };
}

/**
 * 全局设置 XMarkdown 主题（建议在应用启动时调用）
 * 使用此方法可以避免在每个组件上设置 defaultThemeMode
 */
export function setGlobalXMarkdownTheme(theme: 'light' | 'dark'): void {
  GlobalThemeManager.setGlobalTheme(theme);
}

export { GlobalThemeManager };
