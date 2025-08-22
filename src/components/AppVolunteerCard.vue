<template>
  <div class="px-4 py-8">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl font-bold text-gray-800 text-center mb-2">
        Könüllülər Siyahısı
      </h2>
      <p class="text-gray-600 text-center mb-10">
        Fəaliyyətimizə dəstək olan bütün könüllülərimiz
      </p>

      <div
        v-if="volunteers.length === 0"
        class="text-center py-16 bg-white rounded-2xl shadow-lg"
      >
        <div class="text-6xl mb-4">👥</div>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">
          Hələlik heç bir könüllü yoxdur
        </h3>
        <p class="text-gray-500">İlk könüllü siz olun!</p>
      </div>

      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
          v-for="volunteer in volunteers"
          :key="volunteer.id"
          class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <!-- Üst hissə - gradient başlıq -->
          <div
            class="h-3"
            :class="
              volunteer.gender === 'kişi'
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600'
                : 'bg-gradient-to-r from-pink-500 to-rose-600'
            "
          ></div>

          <!-- Əsas məzmun -->
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="text-5xl">
                {{ volunteer.gender === "kişi" ? "👨" : "👩" }}
              </div>
              <span
                class="px-3 py-1 rounded-full text-xs font-semibold"
                :class="
                  volunteer.gender === 'kişi'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-pink-100 text-pink-800'
                "
              >
                {{ volunteer.gender === "kişi" ? "Kişi" : "Qadın" }}
              </span>
            </div>

            <h3 class="text-xl font-bold text-gray-800 mb-2">
              {{ volunteer.name }}
            </h3>

            <div class="flex items-center mb-4 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{{ getPeriodLabel(volunteer.period) }}</span>
            </div>

            <div
              class="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center"
            >
              <span class="text-xs text-gray-500"
                >ID: #{{ id++ }}</span
              >
              <span class="text-2xl">{{
                getPeriodEmoji(volunteer.period)
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistik panel -->
      <div
        v-if="volunteers.length > 0"
        class="mt-10 bg-white rounded-2xl shadow-lg p-6"
      >
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Statistika</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-blue-50 p-4 rounded-lg text-center">
            <div class="text-2xl font-bold text-blue-700">
              {{ volunteers.length }}
            </div>
            <div class="text-sm text-blue-600">Ümumi Könüllü</div>
          </div>
          <div class="bg-indigo-50 p-4 rounded-lg text-center">
            <div class="text-2xl font-bold text-indigo-700">
              {{ maleCount }}
            </div>
            <div class="text-sm text-indigo-600">Kişi</div>
          </div>
          <div class="bg-pink-50 p-4 rounded-lg text-center">
            <div class="text-2xl font-bold text-pink-700">
              {{ femaleCount }}
            </div>
            <div class="text-sm text-pink-600">Qadın</div>
          </div>
          <div class="bg-purple-50 p-4 rounded-lg text-center">
            <div class="text-2xl font-bold text-purple-700">
              {{ periodStats.mostPopular.count }}
            </div>
            <div class="text-sm text-purple-600">
              {{ periodStats.mostPopular.label }} seçilib
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const id = 1;

const props = defineProps({
  volunteers: {
    type: Array,
    default: () => [],
  },
});

// Növbə məlumatları
const periods = [
  {
    value: "1",
    label: "1-ci Növbə",
    time: "09:00-13:00",
    emoji: "🌅",
  },
  {
    value: "2",
    label: "2-ci Növbə",
    time: "11:00-15:00",
    emoji: "🌆",
  },
  {
    value: "3",
    label: "3-cü Növbə",
    time: "13:00-18:00",
    emoji: "🌙",
  },
];

// Növbə dəyərinə görə etiket almaq
const getPeriodLabel = (periodValue) => {
  const period = periods.find((p) => p.value === periodValue);
  return period ? `${period.label} (${period.time})` : periodValue;
};

// Növbə dəyərinə görə emoji almaq
const getPeriodEmoji = (periodValue) => {
  const period = periods.find((p) => p.value === periodValue);
  return period ? period.emoji : "⏱";
};

// Kişi sayını hesablayırıq
const maleCount = computed(() => {
  return props.volunteers.filter((v) => v.gender === "male").length;
});

// Qadın sayını hesablayırıq
const femaleCount = computed(() => {
  return props.volunteers.filter((v) => v.gender === "female").length;
});

// Növbə statistikalarını hesablayırıq
const periodStats = computed(() => {
  const counts = {
    1: { count: 0, label: "1-ci Növbə" },
    2: { count: 0, label: "2-ci Növbə" },
    3: { count: 0, label: "3-cü Növbə" },
  };

  props.volunteers.forEach((v) => {
    if (counts[v.period]) {
      counts[v.period].count++;
    }
  });

  // Ən populyar növbəni tapırıq
  let mostPopular = { count: 0, label: "" };
  for (const key in counts) {
    if (counts[key].count > mostPopular.count) {
      mostPopular = counts[key];
    }
  }

  return { counts, mostPopular };
});
</script>

<style scoped>
/* Əlavə stil effektləri */
.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>
