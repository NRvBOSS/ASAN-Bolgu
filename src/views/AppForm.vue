<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <!-- Başlıq və saat hissəsi -->
    <div class="bg-asan-blue text-white py-4 shadow-md">
      <div class="container mx-auto flex justify-between items-center px-4">
        <h1 class="text-2xl font-bold">ASAN Könüllülər İdarəetmə Sistemi</h1>
        <div class="font-bold text-xl">{{ currentTime }}</div>
      </div>
    </div>

    <!-- Əsas məzmun -->
    <div class="flex flex-1 container mx-auto px-4 py-8">
      <!-- Könüllü əlavə etmə paneli -->
      <div class="w-1/2 pr-8">
        <div
          class="bg-white p-6 rounded-lg shadow-md border border-asan-light-blue"
        >
          <h2 class="text-xl font-bold text-asan-dark-blue mb-6 border-b pb-2">
            Könüllü əlavə et
          </h2>

          <div class="space-y-4">
            <div>
              <label class="block text-asan-dark-blue font-medium mb-1"
                >Ad Soyad</label
              >
              <input
                v-model="newVolunteer.name"
                placeholder="Ad və soyadınızı daxil edin"
                type="text"
                class="w-full px-4 py-2 border border-asan-light-blue rounded focus:outline-none focus:ring-2 focus:ring-asan-blue"
              />
            </div>

            <div>
              <label class="block text-asan-dark-blue font-medium mb-1"
                >Cins</label
              >
              <div class="flex gap-6">
                <label class="inline-flex items-center">
                  <input
                    v-model="newVolunteer.gender"
                    type="radio"
                    value="Kişi"
                    class="text-asan-blue focus:ring-asan-blue"
                  />
                  <span class="ml-2">Kişi</span>
                </label>
                <label class="inline-flex items-center">
                  <input
                    v-model="newVolunteer.gender"
                    type="radio"
                    value="Qadın"
                    class="text-asan-blue focus:ring-asan-blue"
                  />
                  <span class="ml-2">Qadın</span>
                </label>
              </div>
            </div>

            <div class="flex gap-2">
              <button
                @click="addVolunteer"
                class="mt-4 w-full bg-asan-blue hover:bg-asan-dark-blue text-white font-bold py-2 px-4 rounded transition duration-200"
              >
                Könüllünü əlavə et
              </button>
              <button
                @click="clearAll"
                class="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200"
              >
                Hamısını təmizlə
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Könüllülər siyahısı -->
      <div class="w-1/2 pl-8">
        <div
          class="bg-white p-6 rounded-lg shadow-md border border-asan-light-blue h-full"
        >
          <div class="flex justify-between items-center mb-6 border-b pb-2">
            <h2 class="text-xl font-bold text-asan-dark-blue">Könüllülər</h2>
            <span
              class="bg-asan-blue text-white px-3 py-1 rounded-full text-sm"
            >
              Ümumi: {{ count }}
            </span>
          </div>

          <div v-if="count === 0" class="text-center py-8 text-gray-500">
            Əlavə edilmiş könüllü yoxdur
          </div>

          <ul v-else class="divide-y divide-asan-light-blue">
            <li
              v-for="(volunteer, index) in volunteers"
              :key="index"
              class="py-3 px-2 hover:bg-asan-light-50"
            >
              <div class="flex justify-between items-center">
                <div>
                  <span class="font-medium text-asan-dark-blue">{{
                    volunteer.name
                  }}</span>
                  <span class="ml-2 text-sm text-asan-blue"
                    >({{ volunteer.gender }})</span
                  >
                </div>
                <div class="flex items-center">
                  <span class="text-xs text-gray-500 mr-3">
                    {{ volunteer.addedTime }} -
                    {{ formatDate(volunteer.addedAt) }}
                  </span>
                  <button
                    @click.stop="removeVolunteer(volunteer.id)"
                    class="text-red-500 hover:text-red-700 transition-colors"
                    title="Sil"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div>
      <AppPeriod />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useVolunteerStore } from "../stores/counter";
import { storeToRefs } from "pinia";
import AppPeriod from "./AppPeriod.vue";

// Pinia store istifadəsi
const volunteerStore = useVolunteerStore();
const { volunteers, count } = storeToRefs(volunteerStore);
const { addVolunteer: addVolunteerToStore, removeVolunteer: removeVolunteerFromStore, clearVolunteers } = volunteerStore;

// Zamanı idarə etmə
const currentTime = ref(new Date().toLocaleTimeString());
let timer = null;

onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = new Date().toLocaleTimeString();
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timer);
});

// Könüllü məlumatları
const newVolunteer = ref({
  name: "",
  gender: "",
});

const addVolunteer = () => {
  if (!newVolunteer.value.name || !newVolunteer.value.gender) {
    alert("Zəhmət olmasa bütün məlumatları doldurun!");
    return;
  }

  addVolunteerToStore(newVolunteer.value);

  // Formu təmizlə
  newVolunteer.value = {
    name: "",
    gender: "",
  };
};

const removeVolunteer = (id) => {
  if (confirm('Bu könüllünü silmək istədiyinizə əminsiniz?')) {
    removeVolunteerFromStore(id)
  }
}

const clearAll = () => {
  if (confirm("Bütün könüllüləri silmək istədiyinizə əminsiniz?")) {
    clearVolunteers();
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleString("az-AZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
</script>

<style>
/* ASAN mavi rənglərini tətbiq et */
.bg-asan-blue {
  background-color: #2196f3;
}
.bg-asan-dark-blue {
  background-color: #1976d2;
}
.bg-asan-light-blue {
  background-color: #bbdefb;
}

.text-asan-blue {
  color: #2196f3;
}
.text-asan-dark-blue {
  color: #1976d2;
}

.border-asan-light-blue {
  border-color: #bbdefb;
}

.hover\:bg-asan-dark-blue:hover {
  background-color: #1565c0;
}
.bg-asan-light-50 {
  background-color: #f5f5f5;
}
</style>
