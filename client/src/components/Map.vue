<template>
  <div class="relative">
    <div class="p-6 pt-10">
      <h1 class="text-5xl text-center mb-2">ТОЧКА СБОРА</h1>
      <p class="text-2xl font-midflite text-center">
        Ленинградская область, киевское шоссе, 15 км, СНТ Дони, 338
      </p>
    </div>
    <yandex-map
      v-model="map"
      :settings="{
        location: {
          center: [30.204809, 59.66683],
          zoom: 10,
        },
      }"
      width="100%"
      height="500px"
    >
      <yandex-map-default-scheme-layer />
      <yandex-map-default-features-layer />
      <yandex-map-default-marker :settings="{ coordinates: [30.204809, 59.66683] }" />
    </yandex-map>
    <p class="text-5xl font-nauraz text-center py-6">23 ИЮЛЯ 2026 ГОДА</p>
    <div
      class="bg-white text-primary min-[410px]:text-9xl text-8xl text-center font-nauraz flex items-center justify-center"
    >
      <div class="border border-primary m-5 w-full h-full">
        <p class="font-skifer p-3">17:00</p>
      </div>
    </div>
    <p class="text-5xl font-nauraz text-center py-6">НАЧАЛО ВОЗНИ</p>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultMarker,
} from 'vue-yandex-maps'
import type { YMap } from '@yandex/ymaps3-types'

const map = shallowRef<null | YMap>(null)
</script>
