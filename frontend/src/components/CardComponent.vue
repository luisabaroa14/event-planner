<template>
  <div class="card rounded-3 position-relative">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="card-inner rounded-3">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.card {
  transition: all 0.2s;
  background: rgba(255, 255, 255, 0.05);
}

.card-inner {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
}

.card:hover {
  transform: scale(1.04) rotate(1deg);
}

.circle {
  width: 100px;
  height: 100px;
  background: var(--bs-primary);
  border-radius: 50%;
  position: absolute;
  animation: move-up 2s ease-in infinite alternate-reverse;
}

.circle:nth-child(1) {
  top: -35px;
  left: -35px;
}

.circle:nth-child(2) {
  bottom: -35px;
  right: -35px;
  animation-name: move-down;
}
</style>
