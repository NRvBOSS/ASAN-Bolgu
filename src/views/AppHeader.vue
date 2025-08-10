<template>
  <div class="flex flex-col absolute w-full bg-gray-50">
    <!-- Başlıq və saat hissəsi -->
    <div
      class="bg-gradient-to-r from-asan-blue to-asan-dark-blue text-white py-4 shadow-md"
    >
      <div class="container mx-auto flex justify-between items-center px-6">
        <h1 class="text-2xl font-bold">ASAN Könüllülər İdarəetmə Sistemi</h1>
        <div class="font-bold text-xl">{{ currentTime }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Zamanı idarə etmə
const currentTime = ref(new Date().toLocaleTimeString());

onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = new Date().toLocaleTimeString();
  }, 1000);
});
</script>
<style>
/* ASAN rəng palitrası */
.bg-asan-blue {
  background-color: #2196f3;
}
.bg-asan-dark-blue {
  background-color: #1976d2;
}
.bg-asan-darker-blue {
  background-color: #0d47a1;
}
.text-asan-blue {
  color: #2196f3;
}
.text-asan-dark-blue {
  color: #1976d2;
}

/* Gradient effekti */
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

.from-asan-blue {
  --tw-gradient-from: #2196f3;
  --tw-gradient-stops: var(--tw-gradient-from),
    var(--tw-gradient-to, rgba(33, 150, 243, 0));
}
.to-asan-dark-blue {
  --tw-gradient-to: #1976d2;
}
.to-asan-darker-blue {
  --tw-gradient-to: #0d47a1;
}

/* Ümumi stil tənzimləmələri */
.rounded-xl {
  border-radius: 0.75rem;
}
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.border-gray-200 {
  border-color: #e5e7eb;
}
.bg-gray-50 {
  background-color: #f9fafb;
}

/* Fasilə timer üçün əlavə stillər */
.bg-asan-blue\/10 {
  background-color: rgba(33, 150, 243, 0.1);
}
.bg-asan-blue\/20 {
  background-color: rgba(33, 150, 243, 0.2);
}
</style>
