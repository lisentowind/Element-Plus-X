import JSON5 from 'json5';

// 类似于这种的格式
export const _demoStr = `
### echarts 1 自带双引号
\`\`\`echarts
 {
  "xAxis": {
    "type": "category",
  },
  "yAxis": {
    "type": "value"
  },
  "series": []
}
\`\`\`

### echarts 2 字符串格式
\`\`\`echarts
 {
  tooltip: {},
  legend: {},
  grid: {},
  xAxis: [],
  yAxis: [],
  series: []
}
\`\`\`

`;

/**
 * @description 描述 转换为echarts的options
 * @date 2025-06-27 12:55:29
 * @author tingfeng
 *
 * @export
 * @param optionStrOrObj
 * @returns object
 */
export async function parseEChartsOption(
  optionStrOrObj: string | object
): Promise<object> {
  if (typeof optionStrOrObj === 'object' && optionStrOrObj !== null) {
    return optionStrOrObj;
  }

  if (typeof optionStrOrObj === 'string') {
    try {
      const obj = JSON5.parse(optionStrOrObj);
      return obj;
    } catch (err) {
      console.error('解析 ECharts 配置失败：', err);
      return {}; // 解析失败返回空对象
    }
  }

  return {}; // 非字符串或对象时返回空对象
}
