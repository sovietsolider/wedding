<template>
  <div class="relative h-dvh w-dvw overflow-hidden">
    <div class="h-full w-full absolute">
      <img src="/img/carpet-1.png" class="h-full w-full object-cover" />
      <div class="bg-black/50 h-full w-full absolute top-0 left-0"></div>
    </div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="text-white font-nauraz text-4xl font-bold mb-2 relative">
        <h1 class="mb-2">АНАСТАСИЯ</h1>
        <h1 class="text-right"><span class="text-primary font-skifer">X</span> ДАНИЛА</h1>
        <span class="star-float star-float--a absolute bottom-23 -right-5">
          <img src="/img/stars.svg" class="rotate-x-180 rotate-y-180" alt="" />
        </span>
        <span class="star-float star-float--b absolute -bottom-5 left-0">
          <img src="/img/stars.svg" alt="" />
        </span>
      </div>
      <div class="p-5 border border-white mb-4">
        <img src="/img/hero-photo.jpg" class="object-cover" />
      </div>
      <div class="text-white font-nauraz text-4xl font-bold mb-2 relative">
        <h1 class="mb-2">ДА - ДА</h1>
        <h1 class="text-right"><span class="text-primary font-skifer">X</span> ЭТО МЫ!</h1>
        <span class="star-float star-float--c absolute bottom-8 -right-8">
          <img src="/img/stars.svg" class="rotate-x-180" alt="" />
        </span>
        <span class="star-float star-float--d absolute -bottom-5 left-0">
          <img src="/img/stars.svg" alt="" />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.star-float {
  display: block;
  pointer-events: none;
  animation: star-float 3.5s ease-in-out infinite;
}

.star-float--a {
  animation-delay: 0s;
}

.star-float--b {
  animation-delay: 0.6s;
}

.star-float--c {
  animation-delay: 0.3s;
}

.star-float--d {
  animation-delay: 0.9s;
}

@keyframes star-float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-4px) rotate(2deg);
  }
}
</style>
