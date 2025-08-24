<template>
  <div
    class="px-6 py-8 bg-gradient-to-br from-blue-50/30 to-indigo-100/30 min-h-screen"
  >
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-10">
        <h2 class="text-4xl font-bold text-gray-800 mb-3">
          Könüllülər Siyahısı
        </h2>
        <p class="text-gray-600 text-lg max-w-2xl mx-auto">
          Fəaliyyətimizə dəstək olan bütün könüllülərimiz
        </p>
      </div>

      <div
        v-if="volunteers.length === 0"
        class="text-center py-20 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20"
      >
        <div class="text-7xl mb-5">👥</div>
        <h3 class="text-2xl font-semibold text-gray-700 mb-3">
          Hələlik heç bir könüllü yoxdur
        </h3>
        <p class="text-gray-500 text-lg">İlk könüllü siz olun!</p>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-7">
        <div
          v-for="(volunteer, index) in volunteers"
          :key="volunteer.id || index"
          class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/30 relative group"
        >
          <!-- Gradient overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-indigo-200/20 pointer-events-none group-hover:from-blue-200/30 group-hover:to-indigo-300/30 transition-all duration-500"
          ></div>

          <!-- Üst hissə - gradient başlıq -->
          <div
            class="h-2"
            :class="
              volunteer.gender === 'kişi' || volunteer.gender === 'male'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-700'
                : 'bg-gradient-to-r from-pink-500 to-rose-600'
            "
          ></div>

          <!-- Əsas məzmun -->
          <div class="p-7 relative z-10 flex">
            <!-- Şəkil/avatar hissəsi -->
            <div class="flex-shrink-0 mr-6">
              <div
                v-if="volunteer.image"
                class="w-24 h-24 rounded-full overflow-hidden border-4 shadow-lg"
                :class="
                  volunteer.gender === 'kişi' || volunteer.gender === 'male'
                    ? 'border-blue-200'
                    : 'border-pink-200'
                "
              >
                <img
                  :src="volunteer.image"
                  :alt="volunteer.name"
                  class="w-full h-full object-cover"
                />
              </div>
              <div
                v-else
                class="w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-lg"
                :class="
                  volunteer.gender === 'kişi' || volunteer.gender === 'male'
                    ? 'bg-blue-100 border-4 border-blue-200 text-blue-600'
                    : 'bg-pink-100 border-4 border-pink-200 text-pink-600'
                "
              >
                {{
                  volunteer.gender === "kişi" || volunteer.gender === "male"
                    ? "👨"
                    : "👩"
                }}
              </div>
            </div>

            <!-- Məlumat hissəsi -->
            <div class="flex-grow">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-2xl font-bold text-gray-800">
                  {{ volunteer.name }}
                </h3>
                <span
                  class="px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm bg-white/80 border border-white/40 shadow-sm"
                  :class="
                    volunteer.gender === 'kişi' || volunteer.gender === 'male'
                      ? 'text-blue-800'
                      : 'text-pink-800'
                  "
                >
                  {{
                    volunteer.gender === "kişi" || volunteer.gender === "male"
                      ? "Kişi"
                      : "Qadın"
                  }}
                </span>
              </div>

              <div class="flex items-center mb-3 text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-3"
                  :class="
                    volunteer.gender === 'kişi' || volunteer.gender === 'male'
                      ? 'text-blue-500'
                      : 'text-pink-500'
                  "
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
                <span class="text-md font-medium">{{
                  getPeriodLabel(volunteer.period)
                }}</span>
              </div>

              <!-- Rol məlumatı -->
              <div
                class="flex items-center mb-3 text-gray-700"
                v-if="volunteer.role"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-3"
                  :class="
                    volunteer.gender === 'kişi' || volunteer.gender === 'male'
                      ? 'text-blue-500'
                      : 'text-pink-500'
                  "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span class="text-md font-medium">{{
                  getRoleLabel(volunteer.role)
                }}</span>
              </div>

              <!-- İstirahət günü bölməsi -->
              <div class="mb-4 p-4 bg-gray-50/50 rounded-lg">
                <div class="flex items-center text-gray-700 mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-3"
                    :class="
                      volunteer.gender === 'kişi' || volunteer.gender === 'male'
                        ? 'text-blue-500'
                        : 'text-pink-500'
                    "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                  <span class="text-md font-medium">İstirahət günü:</span>
                </div>

                <!-- Düymələr qrupu -->
                <div class="grid grid-cols-2 gap-2">
                  <button
                    v-for="day in restDays"
                    :key="day.value"
                    @click="updateRestDay(volunteer, day.value)"
                    :disabled="isButtonDisabled(volunteer.createdAt)"
                    :class="[
                      volunteer.rest === day.value
                        ? volunteer.gender === 'kişi' ||
                          volunteer.gender === 'male'
                          ? 'bg-blue-600 text-white'
                          : 'bg-pink-600 text-white'
                        : 'bg-white/80 text-gray-700 hover:bg-gray-100',
                      'py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200',
                      isButtonDisabled(volunteer.createdAt)
                        ? 'opacity-50 cursor-not-allowed'
                        : '',
                    ]"
                  >
                    {{ day.label }}
                  </button>
                </div>

                <!-- Deaktiv mesajı -->
                <div
                  v-if="isButtonDisabled(volunteer.createdAt)"
                  class="text-xs text-gray-500 mt-2 text-center"
                >
                  İstirahət günü dəyişikliyi üçün 15 gün gözləməlisiniz
                </div>
              </div>

              <div class="flex items-center justify-between mb-4">
                <span
                  class="text-sm text-gray-500 bg-gray-100/70 px-3 py-1.5 rounded-lg"
                >
                  ID: #{{ volunteer.id || index + 1 }}
                </span>
                <span class="text-2xl">{{
                  getPeriodEmoji(volunteer.period)
                }}</span>
              </div>

              <!-- Silme düymələri -->
              <div class="flex space-x-3 pt-3 border-t border-gray-100">
                <button
                  @click="deleteVolunteer(volunteer._id, 'Xitam')"
                  class="flex-1 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 text-sm"
                >
                  Xitam
                </button>
                <button
                  @click="deleteVolunteer(volunteer._id, 'Məzun')"
                  class="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 text-sm"
                >
                  Məzun
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistik panel -->
      <div
        v-if="volunteers.length > 0"
        class="mt-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-7 border border-white/30"
      >
        <h3 class="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Statistika
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-5">
          <div
            class="bg-gradient-to-br from-blue-50 to-blue-100/70 p-5 rounded-xl text-center backdrop-blur-sm border border-blue-200/30 shadow-sm"
          >
            <div class="text-3xl font-bold text-blue-700">
              {{ volunteers.length }}
            </div>
            <div class="text-sm text-blue-600 font-medium mt-1">
              Ümumi Könüllü
            </div>
          </div>
          <div
            class="bg-gradient-to-br from-indigo-50 to-indigo-100/70 p-5 rounded-xl text-center backdrop-blur-sm border border-indigo-200/30 shadow-sm"
          >
            <div class="text-3xl font-bold text-indigo-700">
              {{ maleCount }}
            </div>
            <div class="text-sm text-indigo-600 font-medium mt-1">Kişi</div>
          </div>
          <div
            class="bg-gradient-to-br from-pink-50 to-pink-100/70 p-5 rounded-xl text-center backdrop-blur-sm border border-pink-200/30 shadow-sm"
          >
            <div class="text-3xl font-bold text-pink-700">
              {{ femaleCount }}
            </div>
            <div class="text-sm text-pink-600 font-medium mt-1">Qadın</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import axios from "axios";

const props = defineProps({
  volunteers: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["volunteer-deleted"]);

// İstirahət günləri
const restDays = [
  { value: "bazar ertəsi", label: "Bazar ertəsi" },
  { value: "çərşənbə axşamı", label: "Çərşənbə axşamı" },
  { value: "çərşənbə", label: "Çərşənbə" },
  { value: "cümə axşamı", label: "Cümə axşamı" },
  { value: "cümə", label: "Cümə" },
  { value: "şənbə", label: "Şənbə" },
  { value: "bazar", label: "Bazar" },
];

// Düymənin deaktiv olub olmamasını yoxlamaq
const isButtonDisabled = (createdAt) => {
  if (!createdAt) return false;
  
  const createdDate = new Date(createdAt);
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate - createdDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays < 15;
};

// İstirahət gününü yeniləmək
const updateRestDay = async (volunteer, newRestDay) => {
  if (isButtonDisabled(volunteer.createdAt)) {
    alert("İstirahət gününü dəyişmək üçün ən azı 15 gün gözləməlisiniz");
    return;
  }
  
  if (volunteer.rest === newRestDay) {
    return; // Eyni gün seçilibsə, heç nə etmə
  }

  try {
    const response = await axios.put(
      `http://localhost:4000/api/volunteers/${volunteer._id}`,
      { rest: newRestDay }
    );

    if (response.status === 200) {
      // Uğurlu yeniləndikdə
      emit("volunteer-updated", {
        id: volunteer._id,
        updates: { rest: newRestDay }
      });
    }
  } catch (error) {
    console.error("İstirahət günü yenilənərkən xəta baş verdi:", error);
    alert("Xəta baş verdi. Yenidən cəhd edin.");
  }
};

// Rollar
const roles = [
  { value: "könüllü", label: "Könüllü" },
  { value: "sorğu rəhbəri", label: "Sorğu Rəhbəri" },
  { value: "qrup rəhbəri", label: "Qrup Rəhbəri" },
  { value: "digər", label: "Digər" },
];

// Növbə məlumatları
const periods = [
  {
    value: "1",
    label: "1-ci Növbə",
    time: "09:00-13:00",
  },
  {
    value: "2",
    label: "2-ci Növbə",
    time: "11:00-15:00",
  },
  {
    value: "3",
    label: "3-cü Növbə",
    time: "13:00-18:00",
  },
];

// Könüllü silmə funksiyası
const deleteVolunteer = async (volunteerId, actionType) => {
  if (!volunteerId) {
    console.error("Könüllü ID-si təyin edilməyib");
    return;
  }

  if (!confirm(`${actionType} əməliyyatını təsdiqləyirsinizmi?`)) {
    return;
  }

  try {
    const response = await axios.delete(
      `http://localhost:4000/api/volunteers/${volunteerId}`
    );

    if (response.status === 200) {
      alert(`Könüllü ${actionType} edildi`);
      emit("volunteer-deleted", volunteerId);
      window.location.reload();
    }
  } catch (error) {
    console.error("Könüllü silinərkən xəta baş verdi:", error);
    alert("Xəta baş verdi. Yenidən cəhd edin.");
  }
};

// Rol dəyərinə görə etiket almaq
const getRoleLabel = (roleValue) => {
  const role = roles.find((r) => r.value === roleValue);
  return role ? role.label : roleValue;
};

// İstirahət günü dəyərinə görə etiket almaq
const getRestDayLabel = (restValue) => {
  const restDay = restDays.find((r) => r.value === restValue);
  return restDay ? restDay.label : restValue;
};

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
  return props.volunteers.filter(
    (v) => v.gender === "kişi" || v.gender === "male"
  ).length;
});

// Qadın sayını hesablayırıq
const femaleCount = computed(() => {
  return props.volunteers.filter(
    (v) => v.gender === "qadın" || v.gender === "female"
  ).length;
});

// İstirahət günü seçmiş könüllülərin sayı
const restDaySelectedCount = computed(() => {
  return props.volunteers.filter((v) => v.rest).length;
});
</script>

<style scoped>
/* Əlavə stil effektləri */
.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Şəffaf və glassmorphism effekti üçün */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

/* Kartlar üçün animasiya */
.group:hover {
  transform: translateY(-4px) scale(1.01);
}
</style>
