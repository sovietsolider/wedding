<script setup lang="ts"></script>

<template>
  <div>
    <div class="relative">
      <div class="look-bg absolute inset-0">
        <div class="bg-black/50 absolute inset-0"></div>
      </div>
      <h1 class="text-white text-4xl z-10 relative text-center py-15">ВАШ ФЕШН ЛУК</h1>
      <div class="flex flex-col items-center justify-center relative z-10 gap-10 px-10 pb-15">
        <div class="p-5 border border-white">
          <img src="/img/look-1.png" class="object-cover" />
        </div>
        <div class="p-5 border border-white">
          <img src="/img/look-2.png" class="object-cover" />
        </div>
        <div class="p-5 border border-white">
          <img src="/img/look-3.png" class="object-cover" />
        </div>
      </div>
    </div>
    <div class="p-8 py-12 text-white font-midflite text-5xl">
      <p class="mb-5 leading-tight">Раз-раз-раз, это хардбасс!</p>
      <p class="text-3xl">
        Братва, внимание! Сегодня вы хедлайнеры, сегодня андеграунд правит баллом.
      </p>
    </div>
    <div ref="videoWrapRef" class="relative h-[500px] overflow-hidden">
      <div class="absolute inset-0 bg-black/50 z-10"></div>
      <video
        ref="videoRef"
        src="/video/slovo.mp4"
        class="w-full h-full object-cover scale-[1.4]"
        loop
        playsinline
        muted
        autoplay
      />
      <div
        class="absolute inset-0 z-10 text-5xl font-midflite p-5 border border-white m-5 flex flex-col gap-10 justify-center"
      >
        <p>ОЛИМПИЙКИ</p>
        <p>СПОРТИВНЫЕ КОСТЮМЫ</p>
        <p>БАРХАТНЫЕ ТЯГИ</p>
      </div>
    </div>
    <div class="p-8">
      <h1 class="text-5xl text-center mb-4">ЦВЕТА</h1>
      <p class="text-4xl font-midflite">
        Найдите папин олимпос и посмотрите на его цвета - все можно использовать
      </p>
    </div>
    <img src="/img/colors.png" class="w-full" />
  </div>
</template>

<style scoped>
.look-bg {
  background-image: url('/img/carpet-1.png');
  background-repeat: repeat-y;
  background-size: 100%;
  background-position: center top;
}
</style>
