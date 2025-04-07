<script lang='ts' setup>
import type { ThoughtChainItemProps } from 'vue-element-plus-x/types/components/ThoughtChain/types'
import { CircleCloseFilled, Loading, SuccessFilled } from '@element-plus/icons-vue'

const thinkings = ref<ThoughtChainItemProps[]>([{
  id: '1',
  thinkTitle: 'content--收到问题',
  title: 'title--进行搜索文字',
  status: 'success',
  isCanExpand: true,
  isDefaultExpand: false,
  thinkContent: '进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字',
}])

const thinkingItems = ref<ThoughtChainItemProps[]>([
  {
    id: '1',
    thinkTitle: 'content--收到问题',
    title: 'title--进行搜索文字',
    status: 'success',
    isCanExpand: true,
    isDefaultExpand: true,
    thinkContent: 'expandContent--进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字',
  },
  {
    id: '2',
    thinkTitle: 'content--找到问题',
    title: 'title--思考中',
    status: 'loading',
  },
])

setTimeout(() => {
  thinkingItems.value[1] = {
    ...thinkingItems.value[1],
    status: 'error',
    title: 'title--思考失败',
  }
  thinkingItems.value.push({
    id: '3',
    thinkTitle: 'content--解决问题 title--被隐藏了  打字动画建议只给最后一个思维链接',
    title: 'title--进行搜索文字',
    hideTitle: true,
    status: 'loading',
    isCanExpand: true,
    isDefaultExpand: true,
    isMarkdown: false,
    typing: {
      step: 2,
      interval: 30,
    },
    thinkContent: 'expandContent--进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字进行搜索文字',
  })
}, 4000)
</script>

<template>
  <div class="component-container">
    <!-- 单个 -->
    <ThoughtChain
      :thinking-items="thinkings"
      :line-gradient="true"
    /> <br>
    <!-- 自定义状态的颜色 -->
    <ThoughtChain
      :thinking-items="thinkingItems" :dot-background-color="{
        loading: '#11663a',
        success: '#325c6c',
        error: '#e6a23c',
      }" :line-gradient="true"
    /> <br>
    <!-- 默认 -->
    <ThoughtChain
      :thinking-items="thinkingItems" :line-gradient="true"
    /> <br>
    <!-- 自定义节点的图标 -->
    <ThoughtChain :thinking-items="thinkingItems" @handle-expand="(id:string[]) => console.log(id)">
      <template #icon="{ item }">
        <span
          v-if="item.status === 'success'"
          class="slot-success"
        >
          <el-icon><SuccessFilled /></el-icon>
        </span>
        <span
          v-if="item.status === 'error'"
          class="slot-error"
        >
          <el-icon><CircleCloseFilled /></el-icon>
        </span>
        <span
          v-if="item.status === 'loading'"
          class="slot-loading"
        >
          <el-icon class="is-loading"><Loading /></el-icon>
        </span>
      </template>
    </ThoughtChain>
  </div>
</template>

<style lang='scss' scoped>
.component-container {
  background-color: white;
  padding: 12px;
  border-radius: 15px;
  height: calc(100vh - 230px);
  overflow-x: auto;
}
.slot-loading,
.slot-success,
.slot-error{
  font-size:20px;
  .el-icon{
    position:absolute;
    z-index:14;
    top:-2px;
    left:-5px;
    border-radius:50%;
  }
}

.slot-success{
  color: var(--el-color-success);
}
.slot-error{
  color: var(--el-color-danger);
}
</style>
