<docs>
---
title: 预览 HTML 代码块
---

支持预览 HTML 代码块。
- 如果你不需要，可以通过 `need-view-code-btn` 属性，设置 `false` 来隐藏按钮。默认为 `true`。
- 你还可以使用 `secure-view-code` 属性，设置 `true` 来开启 `html` 安全模式。默认为 `false`。如果开启，则不会渲染 `script` 标签。点击加入购物车
- 你还可以通过 `viewCodeModalOptions` 属性对弹框进行配置。

```js
viewCodeModalOptions: {
  mode: 'drawer',
  customClass: '',
  dialogOptions: {
    closeOnClickModal: true,
    closeOnPressEscape: true
  },
  drawerOptions: {
    closeOnClickModal: true,
    closeOnPressEscape: true
  }
}
```

| 属性               | 值       | 说明                                                                 |
|--------------------|----------|----------------------------------------------------------------------|
| mode               | 'drawer' | 模态框展示形式为抽屉式                                               |
| customClass        | ''       | 未添加自定义样式类                                                   |
| dialogOptions      | -        | 对话框模式配置（当前未启用）                                         |
| - closeOnClickModal | true     | 点击对话框外部区域可关闭（仅dialog模式生效）                        |
| - closeOnPressEscape | true    | 按ESC键可关闭对话框（仅dialog模式生效）                              |
| drawerOptions      | -        | 抽屉模式配置（当前启用）                                             |
| - closeOnClickModal | true     | 点击抽屉外部区域可关闭                                               |
| - closeOnPressEscape | true    | 按ESC键可关闭抽屉                                                     |

:::warning

同时也可以通过自定义顶部代码块，控制顶部预览按钮的样式。

或者，完全走自定义渲染，详情请往下查看 **`自定义代码块顶部渲染`**。

:::
</docs>

<script setup lang="ts">
const markdown = `
\`\`\`html
<div class="product-card">
  <div class="badge">新品</div>
  <img src="https://picsum.photos/300/200?product" alt="产品图片">

  <div class="content">
    <h3>无线蓝牙耳机 Pro</h3>
    <p class="description">主动降噪技术，30小时续航，IPX5防水等级</p>

    <div class="rating">
      <span>★★★★☆</span>
      <span class="reviews">(124条评价)</span>
    </div>

    <div class="price-container">
      <span class="price">¥499</span>
      <span class="original-price">¥699</span>
      <span class="discount">7折</span>
    </div>

    <div class="actions">
      <button class="cart-btn" onclick="addToCart(this)">加入购物车</button>
      <button class="fav-btn">❤️</button>
    </div>

    <div class="meta">
      <span>✓ 次日达</span>
      <span>✓ 7天无理由</span>
    </div>
  </div>
</div>

\<script\>
  function addToCart(button) {
    // 防止重复点击
    if (button.disabled) return;
    
    // 禁用按钮
    button.disabled = true;
    button.innerHTML = '加入中...';
    
    // 模拟添加到购物车的API请求
    setTimeout(() => {
      // 显示成功消息
      button.innerHTML = '✓ 已加入';
      button.classList.add('success');
      
      // 3秒后恢复按钮状态
      setTimeout(() => {
        button.innerHTML = '加入购物车';
        button.disabled = false;
        button.classList.remove('success');
      }, 3000);
    }, 800);
  };
\<\/script\>

<style>
  .product-card {
  width: 280px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  background: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #ff6b6b;
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 12px;
  z-index: 2;
}

img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}

.content {
  padding: 16px;
}

h3 {
  margin: 8px 0;
  font-size: 18px;
  color: #333;
}

.description {
  color: #666;
  font-size: 14px;
  margin: 8px 0 12px;
  line-height: 1.4;
}

.rating {
  display: flex;
  align-items: center;
  margin: 10px 0;
  color: #ffb300;
}

.reviews {
  font-size: 13px;
  color: #888;
  margin-left: 8px;
}

.price-container {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 12px 0;
}

.price {
  font-size: 22px;
  font-weight: bold;
  color: #ff4757;
}

.original-price {
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
}

.discount {
  background: #fff200;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
}

.actions {
  display: flex;
  gap: 8px;
  margin: 16px 0 12px;
}

.cart-btn {
  flex: 1;
  background: #5352ed;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.cart-btn:hover {
  background: #3742fa;
}

.cart-btn.disabled {
  background: #a4b0be;
  cursor: not-allowed;
}

.cart-btn.success {
  background: #2ed573;
}

.fav-btn {
  width: 42px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s;
}

.fav-btn:hover {
  border-color: #ff6b6b;
  color: #ff6b6b;
}

.meta {
  display: flex;
  gap: 15px;
  font-size: 13px;
  color: #2ed573;
  margin-top: 8px;
}
</style>
\`\`\`
`;
const value1 = ref(true);
const value2 = ref(false);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <span>是否显示 html 预览按钮 <el-switch v-model="value1" /></span>
    <span>是否开启安全预览 <el-switch v-model="value2" /></span>
    <span
      >开启安全预览后，尝试点击加入购物车按钮，不会触发 script
      标签中的事件</span
    >
    <XMarkdown
      :markdown="markdown"
      :need-view-code-btn="value1"
      :secure-view-code="value2"
    />
  </div>
</template>

<style scoped lang="less"></style>
