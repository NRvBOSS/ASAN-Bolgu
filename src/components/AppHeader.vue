<template>
  <div class="flex flex-col w-full bg-gray-50">
    <div class="bg-blue-600 text-white py-4 shadow-md">
      <div class="container mx-auto flex justify-between items-center px-4">
        <h1 class="text-2xl font-bold">ASAN Könüllülər İdarəetmə Sistemi</h1>
        <div class="text-right p-2">
          <div class="font-bold text-xl">{{ formattedDateTime }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const formattedDateTime = ref("");
let timer = null;

const updateDateTime = () => {
  const now = new Date();

  // Format date as DD.MM.YYYY
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  // Format time as HH:MM:SS (24-hour format)
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  formattedDateTime.value = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
};

onMounted(() => {
  updateDateTime();
  timer = setInterval(updateDateTime, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>
