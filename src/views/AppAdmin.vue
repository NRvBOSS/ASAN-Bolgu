<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4"
  >
    <div class="max-w-md mx-auto">
      <!-- Form Kartı -->
      <div class="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-800 text-center mb-8">
          Könüllü Qeydiyyatı
        </h2>

        <form @submit.prevent="addVolunteer" class="space-y-6">
          <!-- Ad sahəsi -->
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-gray-700">
              Ad və Soyad *
            </label>
            <input
              v-model="formData.name"
              type="text"
              required
              placeholder="Adınızı və soyadınızı daxil edin"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
            />
          </div>

          <!-- Cins sahəsi -->
          <div class="space-y-3">
            <label class="block text-sm font-semibold text-gray-700">
              Cins *
            </label>
            <div class="flex gap-6">
              <label class="flex items-center cursor-pointer">
                <input
                  v-model="formData.gender"
                  type="radio"
                  value="kişi"
                  name="gender"
                  required
                  class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span class="ml-2 text-gray-700 font-bold">Kişi</span>
              </label>
              <label class="flex items-center cursor-pointer">
                <input
                  v-model="formData.gender"
                  type="radio"
                  value="qadın"
                  name="gender"
                  required
                  class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span class="ml-2 text-gray-700 font-bold"> Qadın</span>
              </label>
            </div>
          </div>

          <!-- Rol sahəsi -->
          <div class="space-y-3">
            <label class="block text-sm font-semibold text-gray-700">
              Rol *
            </label>
            <select
              v-model="formData.role"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
            >
              <option value="" disabled selected>Rol seçin</option>
              <option value="könüllü">Könüllü</option>
              <option value="sorğu rəhbəri">Sorğu Rəhbəri</option>
              <option value="qrup rəhbəri">Qrup Rəhbəri</option>
              <option value="digər">Digər</option>
            </select>
          </div>

          <!-- Növbə sahəsi -->
          <div class="space-y-3">
            <label class="block text-sm font-semibold text-gray-700">
              Növbəni seçin *
            </label>
            <div class="grid grid-cols-3 gap-3">
              <label
                v-for="period in periods"
                :key="period.value"
                class="flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200"
                :class="
                  formData.period === period.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-blue-300'
                "
              >
                <input
                  v-model="formData.period"
                  type="radio"
                  :value="period.value"
                  name="period"
                  required
                  class="sr-only"
                />
                <div class="text-center">
                  <div class="text-lg">{{ period.emoji }}</div>
                  <div class="text-sm font-medium">{{ period.label }}</div>
                  <div class="text-xs text-gray-500">{{ period.time }}</div>
                </div>
              </label>
            </div>
          </div>

          <!-- İstirahət günü sahəsi -->
          <div class="space-y-3">
            <label class="block text-sm font-semibold text-gray-700">
              İstirahət Günü
            </label>
            <select
              v-model="formData.rest"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
            >
              <option value="" selected>İstirahət günü seçin (optional)</option>
              <option value="bazar ertəsi">Bazar ertəsi</option>
              <option value="çərşənbə axşamı">Çərşənbə axşamı</option>
              <option value="çərşənbə">Çərşənbə</option>
              <option value="cümə axşamı">Cümə axşamı</option>
              <option value="cümə">Cümə</option>
              <option value="şənbə">Şənbə</option>
              <option value="bazar">Bazar</option>
            </select>
          </div>

          <!-- Submit düyməsi -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span v-if="!isLoading" class="flex items-center justify-center">
              Könüllü Əlavə Et
            </span>
            <span v-else class="flex items-center justify-center">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Əlavə edilir...
            </span>
          </button>
        </form>
      </div>

      <!-- Uğur mesajı -->
      <div
        v-if="showSuccess"
        class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-r-lg mb-4 animate-pulse"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <span class="text-green-500 text-xl">✅</span>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium">Könüllü uğurla əlavə edildi!</p>
          </div>
        </div>
      </div>

      <!-- Xəta mesajı -->
      <div
        v-if="showError"
        class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg mb-4"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <span class="text-red-500 text-xl">❌</span>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium">
              Xəta baş verdi. Yenidən cəhd edin.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Könüllülər kartı -->
    <AppVolunteerCard v-if="volunteers.length > 0" :volunteers="volunteers" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import AppVolunteerCard from "../components/AppVolunteerCard.vue";

// Reaktiv data
const volunteers = ref([]);
const isLoading = ref(false);
const showSuccess = ref(false);
const showError = ref(false);

// Form datası
const formData = reactive({
  name: "",
  gender: "",
  role: "könüllü", // Default dəyər
  period: "",
  rest: "", // İstirahət günü
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

// Komponent yüklənəndə könüllüləri yüklə
onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:4000/api/volunteers");
    volunteers.value = response.data;
  } catch (error) {
    console.error("Könüllüləri yükləmə xətası:", error);
  }
});

// Form göndərmə funksiyası
const addVolunteer = async () => {
  isLoading.value = true;
  showSuccess.value = false;
  showError.value = false;

  try {
    const response = await axios.post("http://localhost:4000/api/volunteers", {
      name: formData.name,
      gender: formData.gender,
      role: formData.role,
      period: formData.period,
      rest: formData.rest || undefined, // Boş olarsa undefined göndər
    });

    // Uğurlu əməliyyat
    volunteers.value.push(response.data);
    console.log("Uğurla əlavə edildi:", response.data);

    // Formu təmizlə
    formData.name = "";
    formData.gender = "";
    formData.role = "könüllü";
    formData.period = "";
    formData.rest = "";

    // Uğur mesajını göstər
    showSuccess.value = true;
    setTimeout(() => {
      showSuccess.value = false;
    }, 3000);
  } catch (error) {
    console.error("Xəta oldu:", error);
    showError.value = true;
    setTimeout(() => {
      showError.value = false;
    }, 5000);
  } finally {
    isLoading.value = false;
  }
};
</script>
