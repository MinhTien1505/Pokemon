<script setup lang="ts"></script>

<template>
  <div class="progress">
    <div
      class="progress-bar progress-bar-success progress-bar-striped active"
      style="width: 100%"
    ></div>
  </div>
</template>

<style scoped lang="scss">
@-webkit-keyframes f {
  0% {
    background-position: 100px 0;
  }

  to {
    background-position: 0 0;
  }
}

@keyframes f {
  0% {
    background-position: 350px 0;
  }

  to {
    background-position: 0 0;
  }
}

.progress {
  width: calc(100vw - 48px);
  overflow: hidden;
  height: 4px;
  border-radius: 4px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.progress-bar {
  height: 100%;
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.15);
}

.progress-bar-striped,
.progress-striped .progress-bar {
  background-image: linear-gradient(
    45deg,
    hsla(0, 0%, 95%, 0.8) 25%,
    transparent 0,
    transparent 50%,
    hsla(0, 0%, 95%, 0.8) 0,
    hsla(0, 0%, 95%, 0.8) 75%,
    transparent 0,
    transparent
  );
  background-size: 40px 40px;
}

.progress-bar.active,
.progress.active .progress-bar {
  -webkit-animation: f 2s linear infinite;
  animation: f 2s linear infinite;
}

.progress-bar-success {
  background-color: #4871ec;
}

.progress-striped .progress-bar-success {
  background-image: linear-gradient(
    45deg,
    hsla(0, 0%, 100%, 0.15) 25%,
    transparent 0,
    transparent 50%,
    hsla(0, 0%, 100%, 0.15) 0,
    hsla(0, 0%, 100%, 0.15) 75%,
    transparent 0,
    transparent
  );
}
</style>
