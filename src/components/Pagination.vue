<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  totalPage: {
    type: Number,
    required: true,
  },
  pageIndex: {
    type: Number,
    required: true,
  },
})
const isShowIndex = (index: number) => {
  const isAtLeast3 = Math.abs(props.pageIndex - index) < 3
  return index === 1 || index === props.totalPage || isAtLeast3
}

const pagingDatas = computed(() => {
  const result = []
  let isThreeDotBefore = false
  let isThreeDotAfter = false
  for (let i = 1; i <= props.totalPage; i++) {
    if (isShowIndex(i)) {
      result.push(i)
    } else {
      if (!isThreeDotBefore && i < props.pageIndex) {
        result.push('...')
        isThreeDotBefore = true
      } else if (!isThreeDotAfter && i > props.pageIndex) {
        result.push('...')
        isThreeDotAfter = true
      }
    }
  }
  return result
})
</script>

<template>
  <div id="container">
    <div id="pagination">
      <div
        class="blocks"
        :class="{ disabled: pageIndex === 1 }"
        @click="$emit('changePage', pageIndex - 1)"
      >
        &laquo;
      </div>
      <template v-for="index in pagingDatas" :key="index">
        <div v-if="index === '...'" class="three-dot">...</div>
        <div
          v-else
          class="blocks"
          :class="{ active: index === pageIndex }"
          @click="$emit('changePage', index)"
        >
          {{ index }}
        </div>
      </template>
      <div
        class="blocks"
        :class="{
          disabled: pageIndex === totalPage,
        }"
        @click="$emit('changePage', pageIndex + 1)"
      >
        &raquo;
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#container {
  padding-top: 12px;
}

#pagination {
  display: flex;
  justify-content: center;
  .blocks.active {
    background-color: #e3e2e2;
  }
  .blocks.disabled {
    pointer-events: none;
    opacity: 0.4;
  }
  .three-dot {
    margin: 0 12px;
    padding-top: 8px;
  }
}

.blocks {
  width: 30px;
  line-height: 30px;
  text-align: center;
  border: 1px solid #dddddd;
  display: inline-block;
  text-decoration: none;
  color: black;
  border-radius: 50%;
  cursor: pointer;
  &:not(:first-child) {
    margin-left: 5px;
  }
  &:first-child {
    border: none;
  }
  &:last-child {
    border: none;
  }
  &:hover {
    background-color: #e3e2e2;
  }
}
</style>
