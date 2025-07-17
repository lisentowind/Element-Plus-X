<docs>
---
title: 自定义菜单交互
---

通过插槽扩展菜单内容，支持图标、文本及自定义命令，满足复杂业务逻辑。
</docs>

<script setup lang="ts">
import { Delete, Edit, EditPen, Share } from '@element-plus/icons-vue';

const menuTestItems = ref([
  {
    key: 'm1',
    label: '菜单测试项目 1 - 长文本效果演示文本长度溢出效果测试'.repeat(2)
  },
  {
    key: 'm2',
    label: '菜单测试项目 2',
    disabled: true
  },
  {
    key: 'm3',
    label: '菜单测试项目 3'
  },
  {
    key: 'm4',
    label: '菜单测试项目 4'
  },
  {
    key: 'm5',
    label: '菜单测试项目 5'
  },
  {
    key: 'm6',
    label: '菜单测试项目 6'
  },
  {
    key: 'm7',
    label: '菜单测试项目 7'
  },
  {
    key: 'm8',
    label: '菜单测试项目 8'
  },
  {
    key: 'm9',
    label: '菜单测试项目 9'
  },
  {
    key: 'm10',
    label: '菜单测试项目 10'
  },
  {
    key: 'm11',
    label: '菜单测试项目 11'
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

const conversationMenuItems = [
  {
    key: 'edit',
    label: '编辑',
    icon: Edit,
    command: {
      self_id: '1',
      self_message: '编辑',
      self_type: 'primary'
    }
  },
  {
    key: 'delete',
    label: '删除',
    icon: Delete,
    disabled: true,
    divided: true
  },
  {
    key: 'share',
    label: '分享',
    icon: Share,
    command: 'share'
  }
];

const activeKey4 = ref('m1');

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
      v-model:active="activeKey4"
      :items="menuTestItems"
      row-key="key"
      :label-max-width="200"
      :show-tooltip="true"
      show-to-top-btn
      show-built-in-menu
    >
      <template #more-filled>
        <el-icon>
          <EditPen />
        </el-icon>
      </template>

      <template #menu="{ item }">
        <div class="menu-buttons">
          <el-button
            v-for="menuItem in conversationMenuItems"
            :key="menuItem.key"
            link
            size="small"
            @click.stop="handleMenuClick(menuItem.key, item)"
          >
            <el-icon v-if="menuItem.icon">
              <component :is="menuItem.icon" />
            </el-icon>
            <span v-if="menuItem.label">{{ menuItem.label }}</span>
          </el-button>
        </div>
      </template>
    </Conversations>
  </div>
</template>

<style scoped lang="less">
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
}
</style>
