<docs>
---
title: 绝对自定义样式与分组标题
---

通过插槽和样式属性自定义会话项外观及分组标题图标，支持悬停、激活、菜单打开状态的样式定制。
</docs>

<script setup lang="ts">
import type { GroupableOptions } from 'vue-element-plus-x/types/Conversations';

const menuTestItems1 = ref([
  {
    key: 'm1',
    label: '菜单测试项目 1 - 长文本效果演示文本长度溢出效果测试'.repeat(2),
    group: '工作'
  },
  {
    key: 'm2',
    label: '菜单测试项目 2',
    disabled: true,
    group: '工作'
  },
  {
    key: 'm3',
    label: '菜单测试项目 3',
    group: '工作'
  },
  {
    key: 'm4',
    label: '菜单测试项目 4',
    group: '学习'
  },
  {
    key: 'm5',
    label: '菜单测试项目 5',
    group: '学习'
  },
  {
    key: 'm6',
    label: '菜单测试项目 6',
    group: '学习'
  },
  {
    key: 'm7',
    label: '菜单测试项目 7',
    group: '学习'
  },
  {
    key: 'm8',
    label: '菜单测试项目 8',
    group: '个人'
  },
  {
    key: 'm9',
    label: '菜单测试项目 9',
    group: '个人'
  },
  {
    key: 'm10',
    label: '菜单测试项目 10',
    group: '个人'
  },
  {
    key: 'm11',
    label: '菜单测试项目 11',
    group: '个人'
  },
  {
    key: 'm12',
    label: '菜单测试项目 12'
  },
  {
    key: 'm13',
    label: '菜单测试项目 13'
  },
  {
    key: 'm14',
    label: '菜单测试项目 14'
  }
]);
const conversationMenuItems1 = [
  {
    key: 'edit',
    label: '编辑',
    icon: '🍉',
    command: {
      self_id: '1',
      self_message: '编辑',
      self_type: 'primary'
    }
  },
  {
    key: 'delete',
    label: '删除',
    icon: '🍎',
    disabled: true,
    divided: true
  },
  {
    key: 'share',
    label: '分享',
    icon: '🍆',
    command: 'share'
  }
];

const activeKey5 = ref('m1');

// 自定义分组选项
const customGroupOptions: GroupableOptions = {
  // 自定义分组排序，学习 > 工作 > 个人 > 未分组
  sort: (a: any, b: any) => {
    const order: Record<string, number> = {
      学习: 0,
      工作: 1,
      个人: 2,
      未分组: 3
    };
    const orderA = order[a] !== undefined ? order[a] : 999;
    const orderB = order[b] !== undefined ? order[b] : 999;
    return orderA - orderB;
  }
};

// 处理菜单点击
function handleMenuClick(menuKey: string, item: any) {
  console.log('菜单点击', menuKey, item);

  switch (menuKey) {
    case 'edit':
      console.log(`编辑: ${item.label}`);
      ElMessage.warning(`编辑: ${item.label}`);
      break;
    case 'delete':
      console.log(`删除: ${item.label}`);
      ElMessage.error(`删除: ${item.label}`);
      break;
    case 'share':
      console.log(`分享: ${item.label}`);
      ElMessage.success(`分享: ${item.label}`);
      break;
  }
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; height: 420px">
    <Conversations
      v-model:active="activeKey5"
      :items="menuTestItems1"
      :label-max-width="200"
      :show-tooltip="true"
      tooltip-placement="right"
      :tooltip-offset="35"
      show-built-in-menu
      :groupable="customGroupOptions"
      row-key="key"
      :items-style="{
        padding: '10px 20px',
        borderRadius: '10px',
        fontSize: '16px',
        fontWeight: 'bold',
        textAlign: 'center',
        boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s',
        marginBottom: '20px',
        border: '2px dashed transparent'
      }"
      :items-hover-style="{
        background: '#FAFAD2',
        border: '2px dashed #006400'
      }"
      :items-active-style="{
        background: '#006400',
        color: '#FFFAFA',
        border: '2px dashed transparent'
      }"
      :items-menu-opened-style="{
        border: '2px dashed transparent'
      }"
      :menu-style="{
        backgroundColor: 'red',
        boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
        padding: '10px 20px',
        height: '200px'
      }"
    >
      <template #label="{ item }">
        <div class="custom-label">
          {{ item.label }}
        </div>
      </template>

      <template #groupTitle="{ group }">
        <div class="custom-group-title">
          <!-- 为不同组添加不同的前缀 -->
          <span v-if="group.title === '工作'">📊 </span>
          <span v-else-if="group.title === '学习'">📚 </span>
          <span v-else-if="group.title === '个人'">🏠 </span>
          <span v-else>📁 </span>
          {{ group.title }}
        </div>
      </template>

      <template
        #more-filled="{ item, isHovered, isActive, isMenuOpened, isDisabled }"
      >
        <span v-if="isHovered">✍️</span>
        <span v-if="isActive">✅</span>
        <span v-if="isMenuOpened">🥰</span>
        <span
          v-if="isDisabled"
          :style="{
            background: 'black',
            padding: '5px',
            borderRadius: '10px',
            color: 'white',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }"
        >
          🫥是否禁用：{{ item?.disabled }}
        </span>
      </template>

      <template #menu="{ item }">
        <div class="menu-buttons">
          <div
            v-for="menuItem in conversationMenuItems1"
            :key="menuItem.key"
            class="menu-self-button"
            @click.stop="handleMenuClick(menuItem.key, item)"
          >
            <span v-if="menuItem.icon">{{ menuItem.icon }}</span>
            <span v-if="menuItem.label">{{ menuItem.label }}</span>
          </div>
        </div>
      </template>
    </Conversations>
  </div>
</template>

<style scoped lang="less">
.custom-group-title {
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #409eff;
}

.menu-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  padding: 12px;

  // 自定义菜单按钮-el-button样式
  .el-button {
    padding: 4px 8px;
    margin-left: 0;

    .el-icon {
      margin-right: 8px;
    }
  }

  // 自定义菜单按钮-自定义样式
  .menu-self-button {
    display: flex;
    padding: 4px 8px;
    align-items: center;
    border-radius: 5px;
    margin-left: 0;
    cursor: pointer;
    gap: 8px;

    &:hover {
      background-color: #f5f7fa;
      color: #409eff;
    }
  }
}

.custom-label {
  display: flex;
  align-items: center;
  // 溢出隐藏
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}
</style>
