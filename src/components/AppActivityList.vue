<template>
  <div class="mx-auto p-6 mb-8">
    <div class="flex flex-col items-center mb-8">
      <h2 class="text-3xl font-bold text-center text-blue-800 mb-6">
        Günlük Fəaliyyət Cədvəli
      </h2>
      <div class="flex gap-4">
        <button
          class="cursor-pointer flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Böl
        </button>

        <router-link to="/history">
          <button
            @click="showHistory"
            class="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clip-rule="evenodd"
              />
            </svg>
            Tarixçə
          </button>
        </router-link>
      </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="(timeSlot, index) in timeSlots"
        :key="index"
        class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200"
      >
        <div
          class="bg-gradient-to-r from-blue-500 to-blue-600 p-3 text-white text-center font-bold text-2xl"
        >
          {{ timeSlot }}
        </div>
        <div v-for="act in activities" class="p-4 min-h-24 flex items-center">
          <span class="text-gray-700 font-bold text-center text-2xl">
            {{ act.name || "Fəaliyyət təyin edilməyib" }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  activities: {
    type: Array,
    required: true,
  },
});

const getDay = new Date().getDay();
console.log("Current Day Index:", getDay);
var acts;
getDay === 0 || getDay === 6 ? (acts = 10) : (acts = 13);

// Generate time slots
const timeSlots = computed(() => {
  const slots = [];
  let hours = 9;
  let minutes = 0;

  for (let i = 0; i < acts; i++) {
    const startTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}`;
    minutes += 40;
    if (minutes >= 60) {
      minutes -= 60;
      hours += 1;
    }
    const endTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}`;
    slots.push(`${startTime} - ${endTime}`);
  }
  return slots;
});

const splitActivities = () => {
  console.log("Böl button clicked");
  // Add your split logic here
};

const showHistory = () => {
  console.log("Tarixçə button clicked");
  // Add your history logic here
};
</script>

<style>
.hover\\:shadow-lg:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>
