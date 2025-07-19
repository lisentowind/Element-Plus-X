interface LoadCdnOptions {
  url: string;
  attrs?: Record<string, string>;
}

export function loadCdn(options: LoadCdnOptions): Promise<void> {
  const { url, attrs = {} } = options;
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    Object.entries(attrs).forEach(([key, value]) => {
      link.setAttribute(key, value);
    });
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`加载资源失败: ${url}`));
    document.head.appendChild(link);
  });
}
