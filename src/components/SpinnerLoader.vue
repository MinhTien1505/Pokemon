<script setup lang="ts"></script>

<template>
  <div class="loading-state">
    <div class="loading"></div>
  </div>
</template>

<style scoped lang="scss">
.loading-state {
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 10px solid #ddd;
  border-top-color: orange;
  animation: loading 1s linear infinite;
}
@keyframes loading {
  to {
    transform: rotate(360deg);
  }
}
</style>
