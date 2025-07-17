import type { Directive, DirectiveBinding } from 'vue';

interface FogFadeOptions {
  delay?: number; // 每个元素动画延迟间隔
  threshold?: number; // Intersection 可见比例
}

const defaultOptions: Required<FogFadeOptions> = {
  delay: 10,
  threshold: 0.1
};

const allowedTags = new Set([
  'P',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'UL',
  'OL',
  'LI',
  'BLOCKQUOTE',
  'TR',
  'TD',
  'TH',
  'EM',
  'STRONG',
  'A'
]);

const vFogFade: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<FogFadeOptions>) {
    const animatedSet = new WeakSet<HTMLElement>();
    const options = { ...defaultOptions, ...(binding.value || {}) };
    const applyFogFade = (target: HTMLElement, delayIndex = 0) => {
      if (animatedSet.has(target)) return;

      const delay = `${delayIndex * options.delay}ms`;
      target.style.transitionDelay = [delay, delay, delay].join(', ');

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          target.classList.add('in-view');
          animatedSet.add(target);
        });
      });
    };

    const isTargetElement = (element: HTMLElement) => {
      return (
        (element.matches('.line span') && element.closest('code')) ||
        allowedTags.has(element.tagName)
      );
    };

    const intersectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            // 暂时不做延迟 没传递index
            applyFogFade(el);
            intersectionObserver.unobserve(el);
          }
        });
      },
      {
        threshold: options.threshold
      }
    );
    const observeIfMatch = (element: HTMLElement) => {
      if (isTargetElement(element)) {
        element.classList.add('fog-fade');
        intersectionObserver.observe(element);
      }
    };

    const processAllTargets = (container: HTMLElement) => {
      const all = container.querySelectorAll<HTMLElement>('*');
      all.forEach(observeIfMatch);
    };

    processAllTargets(el);

    const mutationObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (!(node instanceof HTMLElement)) return;

          observeIfMatch(node);
          node.querySelectorAll?.('*').forEach(child => {
            if (child instanceof HTMLElement) {
              observeIfMatch(child);
            }
          });
        });
      });
    });

    mutationObserver.observe(el, { childList: true, subtree: true });

    (el as any).__fogFadeCleanup__ = () => {
      mutationObserver.disconnect();
      intersectionObserver.disconnect();
    };
  },

  unmounted(el: HTMLElement) {
    (el as any).__fogFadeCleanup__?.();
  }
};

export default vFogFade;
