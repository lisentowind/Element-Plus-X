import type VCharts from 'vue-echarts';
import { Download } from '@element-plus/icons-vue';
import { ElButton } from 'element-plus';
import { h } from 'vue';

/**
 * @description 描述 复制按钮
 * @date 2025-06-25 17:50:05
 * @author tingfeng
 *
 * @export
 */
export function downloadPngBtnEle(VChartsRef: InstanceType<typeof VCharts>) {
  return h(
    ElButton,
    {
      class: `shiki-header-button markdown-language-header-button`,
      onClick: () => {
        downloadEcharts(VChartsRef, '图片', 'png');
      }
    },
    {
      default: () =>
        h(Download, {
          class: `markdown-language-header-button-text`
        })
    }
  );
}

/* ----------------------------------- 方法 ----------------------------------- */

export function downloadEcharts(
  VChartsRef: InstanceType<typeof VCharts>,
  fileName: string,
  type: 'xlsx' | 'word' | 'pdf' | 'ppt' | 'zip' | 'png' | 'jpeg'
) {
  if (VChartsRef) {
    // 1. 创建 Image 对象并加载 SVG 或者 Canvas
    const img = new Image();
    const imgUrl = VChartsRef.getDataURL({
      type: 'png',
      pixelRatio: 2
    });
    img.src = imgUrl;
    img.onload = function () {
      // 2. 创建 Canvas 并绘制 SVG
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      // 填充白色背景
      ctx.fillStyle = document.body.classList.contains('dark')
        ? '#000'
        : '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // 绘制图表图片
      ctx.drawImage(img, 0, 0);

      // 3. 导出为 PNG
      const pngUrl = canvas.toDataURL('image/png', 1);
      downloadLocalFile(pngUrl, fileName, type);
    };
  }
}

export function downloadLocalFile(
  url: string,
  fileName: string,
  type: 'xlsx' | 'word' | 'pdf' | 'ppt' | 'zip' | 'png' | 'jpeg',
  customFileName?: string
) {
  try {
    const link = document.createElement('a');
    link.href = url;
    link.download = customFileName ?? `${fileName}.${type}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // 释放 blob URL
    URL.revokeObjectURL(url);
    ElMessage.success('文件已下载');
  } catch (error) {
    console.log('🚀 ~ error:', error);
    ElMessage.error('文件下载失败');
  }
}
