<template>
  <div class="flex flex-col absolute w-full bg-gray-50">
    <div
      class="bg-blue-600 text-white py-10 shadow-md"
    >
      <div class="container mx-auto flex justify-between items-center px-4">
        <h1 class="text-3xl font-bold">ASAN Könüllülər İdarəetmə Sistemi</h1>
        <div class="font-bold text-2xl">{{ currentTime }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const currentTime = ref(new Date().toLocaleTimeString());

onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = new Date().toLocaleTimeString();
  }, 1000);
});
</script>