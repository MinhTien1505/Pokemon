<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  keySort: {
    type: String,
    required: true,
  },
  labelSort: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['emitSrot'])

const sort = ref('')

const changeSort = () => {
  if (sort.value === '') {
    sort.value = props.keySort
  } else if (sort.value === props.keySort) {
    sort.value = `-${props.keySort}`
  } else {
    sort.value = ''
  }
  emit('emitSrot', sort.value)
}
</script>

<template>
  <div class="header-sort" @click="changeSort()">
    <div>
      {{ labelSort }}
    </div>
    <div class="sort-container">
      <i
        class="fas fa-sort-up"
        :class="{ actived: sort === props.keySort }"
      ></i>
      <i
        class="fas fa-sort-down"
        :class="{ actived: sort === `-${props.keySort}` }"
      ></i>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-sort {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .sort-container {
    position: relative;
    margin-left: 4px;
    display: flex;
    i {
      position: absolute;
      top: -6px;
      opacity: 0.2;
    }
    .actived {
      opacity: 1;
    }
  }
}
</style>
