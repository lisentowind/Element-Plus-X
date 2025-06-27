import {
  ArrowDownBold,
  CopyDocument,
  Moon,
  Sunny
} from '@element-plus/icons-vue';
import { ElButton, ElSpace } from 'element-plus';
import { h } from 'vue';

/* ----------------------------------- 按钮组 ---------------------------------- */

/**
 * @description 描述 language标签
 * @date 2025-06-25 17:48:15
 * @author tingfeng
 *
 * @export
 * @param language
 */
export function languageEle(language: string) {
  return h(
    ElSpace,
    {
      class: `markdown-language-header-space markdown-language-header-space-start markdown-language-header-span`,
      direction: 'horizontal',
      onClick: (ev: MouseEvent) => {
        toggleExpand(ev);
      }
    },
    {
      default: () => [
        h(
          'span',
          {
            class: 'markdown-language-header-span el-card is-always-shadow'
          },
          language || ''
        ),
        h(
          ElButton,
          {
            class: 'shiki-header-button shiki-header-button-expand'
          },
          {
            default: () => [
              h(ArrowDownBold, {
                class:
                  'markdown-language-header-toggle markdown-language-header-toggle-expand '
              })
            ]
          }
        )
      ]
    }
  );
}

/**
 * @description 描述 语言头部操作按钮
 * @date 2025-06-25 17:49:04
 * @author tingfeng
 *
 * @export
 * @param codeText
 */
export function controlEle(codeText: string[], otherVNode?: VNode | VNode[]) {
  return h(
    ElSpace,
    {
      class: `markdown-language-header-space`,
      direction: 'horizontal'
    },
    {
      default: () => [toggleThemeEle(), copyBtnEle(codeText), otherVNode]
    }
  );
}

// 记录当前是否暗色模式
const isDark = ref(document.body.classList.contains('dark'));

/**
 * @description 描述 主题按钮
 * @date 2025-06-25 17:49:53
 * @author tingfeng
 *
 * @export
 */
export function toggleThemeEle() {
  return h(
    ElButton,
    {
      class: 'shiki-header-button markdown-language-header-toggle',
      onClick: () => {
        toggleTheme();
      }
    },
    {
      default: () =>
        h(!isDark.value ? Moon : Sunny, {
          class: 'markdown-language-header-toggle'
        })
    }
  );
}

/**
 * @description 描述 复制按钮
 * @date 2025-06-25 17:50:05
 * @author tingfeng
 *
 * @export
 * @param codeText
 */
export function copyBtnEle(codeText: string[]) {
  return h(
    ElButton,
    {
      class: `shiki-header-button markdown-language-header-button`,
      onClick: () => {
        copyCode(codeText);
      }
    },
    {
      default: () =>
        h(CopyDocument, {
          class: `markdown-language-header-button-text`
        })
    }
  );
}

/* ----------------------------------- 方法 ----------------------------------- */

const transitionStateMap = new WeakMap<HTMLElement, boolean>();

export function expand(elem: HTMLElement) {
  if (transitionStateMap.get(elem)) return; // 动画中，忽略重复调用

  transitionStateMap.set(elem, true);
  elem.style.height = '42px';
  elem.classList.add('is-expanded');

  requestAnimationFrame(() => {
    elem.style.height = `${elem.scrollHeight}px`;

    const afterTransition = () => {
      elem.style.height = 'auto';
      elem.removeEventListener('transitionend', afterTransition);
      transitionStateMap.set(elem, false); // 解除锁
    };

    elem.addEventListener('transitionend', afterTransition);
  });
}

export function collapse(elem: HTMLElement) {
  if (transitionStateMap.get(elem)) return; // 动画中，忽略重复调用

  transitionStateMap.set(elem, true);
  elem.style.height = `${elem.scrollHeight}px`;
  elem.classList.remove('is-expanded');

  requestAnimationFrame(() => {
    elem.style.height = '42px';

    const afterTransition = () => {
      elem.removeEventListener('transitionend', afterTransition);
      transitionStateMap.set(elem, false); // 解除锁
    };

    elem.addEventListener('transitionend', afterTransition);
  });
}

/**
 * @description 复制代码内容到剪贴板
 * @date 2025-03-28 14:03:22
 * @author tingfeng
 *
 * @async
 * @param v
 * @returns void
 */
async function copy(v: string) {
  try {
    // 现代浏览器 Clipboard API
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(v);
      ElMessage({
        message: '复制成功',
        type: 'success'
      });
      return; // 复制成功直接返回
    }

    // 兼容旧浏览器的 execCommand 方案
    const textarea = document.createElement('textarea');
    textarea.value = v.trim();
    textarea.style.position = 'fixed'; // 避免滚动到文本框位置
    document.body.appendChild(textarea);
    textarea.select();

    // 执行复制命令
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    if (success) {
      ElMessage({
        message: '复制成功',
        type: 'success'
      });
      return; // 复制成功直接返回
    }
    if (!success) {
      throw new Error('复制失败，请检查浏览器权限');
    }
  } catch (err) {
    throw new Error(
      `复制失败: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}

/**
 * @description 描述 将源代码行数转换可复制的string
 * @date 2025-06-25 17:50:42
 * @author tingfeng
 *
 * @export
 * @param lines
 */
export function extractCodeFromHtmlLines(lines: string[]): string {
  const container = document.createElement('div');
  const output: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    container.innerHTML = lines[i];
    const text = container.textContent?.trimEnd();
    if (text && text.trim() !== '') {
      output.push(text);
    }
  }

  container.remove();
  container.innerHTML = ''; // 清空引用内容
  container.textContent = null;

  return output.join('\n');
}

/**
 * @description 描述 切换展开状态
 * @date 2025-06-26 21:29:50
 * @author tingfeng
 *
 * @export
 * @param ev
 */
export function toggleExpand(ev: MouseEvent) {
  const ele = ev.currentTarget as HTMLElement;
  const divBox = ele.parentElement as HTMLElement;
  if (divBox) {
    if (divBox?.parentElement) {
      const has = divBox.parentElement.classList.contains('is-expanded');
      if (has) {
        collapse(divBox.parentElement);
      } else {
        expand(divBox.parentElement);
      }
    }
  }
}

/**
 * @description 描述 切换主题
 * @date 2025-06-26 21:58:56
 * @author tingfeng
 *
 * @export
 */
export function toggleTheme() {
  const theme = document.body.classList.contains('dark') ? 'light' : 'dark';
  isDark.value = theme === 'dark';
  if (isDark.value) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
  return isDark.value;
}

/**
 * @description 描述 复制代码
 * @date 2025-06-26 22:02:57
 * @author tingfeng
 *
 * @export
 * @param codeText
 */
export function copyCode(codeText: string[]) {
  const code = extractCodeFromHtmlLines(codeText);
  copy(code);
}
