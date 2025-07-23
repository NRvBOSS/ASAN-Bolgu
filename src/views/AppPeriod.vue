<template>
  <div
    class="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-3xl mx-auto my-8"
  >
    <h1
      class="text-3xl font-bold text-asan-dark-blue mb-8 pb-2 border-b border-gray-200"
    >
      Fəaliyyətlər
    </h1>

    <div class="space-y-6">
      <!-- Bağça -->
      <div class="border border-gray-200 rounded-xl overflow-hidden shadow-xs">
        <div
          class="bg-gradient-to-r from-asan-blue to-asan-dark-blue text-white p-4 flex items-center"
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
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            />
          </svg>
          <span class="font-semibold text-lg">BAĞÇA</span>
        </div>
      </div>

      <!-- Sorğu bölməsi -->
      <div class="border border-gray-200 rounded-xl overflow-hidden shadow-xs">
        <div class="bg-gray-50 p-4 flex items-center border-b border-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-3 text-asan-blue"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <span class="font-semibold text-lg text-asan-dark-blue">SORĞU</span>
        </div>

        <div class="divide-y divide-gray-200">
          <div
            v-for="(sorgu, index) in 3"
            :key="index"
            class="p-4 hover:bg-gray-50 transition-colors duration-150 flex items-center group"
          >
            <div class="flex items-center w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-4 text-asan-blue"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span class="text-gray-700 group-hover:text-asan-dark-blue"
                >Sorğu {{ index + 1 }}</span
              >
              <button
                class="ml-auto text-gray-400 hover:text-asan-blue transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Digər fəaliyyətlər -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActivityCard
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :title="activity.title"
          :color="activity.color"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ActivityCard from "./ActivityCard.vue";

const activities = [
  {
    title: "Yönləndirmə(2)",
    icon: "M9 5l7 7-7 7",
    color: "text-asan-blue",
  },
  {
    title: "Yönləndirmə(3)",
    icon: "M9 5l7 7-7 7",
    color: "text-asan-blue",
  },
  {
    title: "VVAQ",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    color: "text-asan-green",
  },
  {
    title: "Masa",
    icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    color: "text-asan-dark-blue",
  },
];
</script>

<style>
.bg-asan-blue {
  background-color: #2196f3;
}
.bg-asan-dark-blue {
  background-color: #1976d2;
}
.text-asan-blue {
  color: #2196f3;
}
.text-asan-dark-blue {
  color: #1976d2;
}
.text-asan-green {
  color: #4caf50;
}

.border-gray-200 {
  border-color: #e5e7eb;
}
.bg-gray-50 {
  background-color: #f9fafb;
}
.shadow-xs {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.from-asan-blue {
  --tw-gradient-from: #2196f3;
  --tw-gradient-stops: var(--tw-gradient-from),
    var(--tw-gradient-to, rgba(33, 150, 243, 0));
}
.to-asan-dark-blue {
  --tw-gradient-to: #1976d2;
}
</style>
