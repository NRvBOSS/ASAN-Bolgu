<template>
  <div class="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-200">
    <div class="flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" :class="color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="icon" />
      </svg>
      <span class="font-medium text-gray-700">{{ title }}</span>
      <button class="ml-auto text-gray-400 hover:text-asan-blue transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: String,
  title: String,
  color: String
})
</script>