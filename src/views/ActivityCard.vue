<template>
  <div class="border border-gray-200 rounded-xl overflow-hidden shadow-xs">
    <div
      class="bg-gray-50 p-4 flex items-center border-b border-gray-200"
      :class="{
        'bg-gradient-to-r from-asan-blue to-asan-dark-blue text-white': color === 'text-asan-blue',
        'bg-asan-green text-white': color === 'text-asan-green'
      }"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 mr-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          :d="icon"
        />
      </svg>
      <span class="font-semibold text-lg">{{ title }}</span>
    </div>
    <div class="p-4 bg-gray-50">
      <div v-if="Array.isArray(assignedNames) && assignedNames.length">
        <div v-for="(name, index) in assignedNames" :key="index" class="text-gray-700">
          {{ name }}
        </div>
      </div>
      <div v-else-if="!Array.isArray(assignedNames) && assignedNames" class="text-gray-700">
        {{ assignedNames }}
      </div>
      <div v-else class="text-gray-400">
        Heç kim təyin edilməyib
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  icon: String,
  color: String,
  assignedNames: [String, Array]
});
</script>