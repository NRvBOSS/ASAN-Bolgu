<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <!-- Başlıq və saat hissəsi -->
    <div
      class="bg-gradient-to-r from-asan-blue to-asan-dark-blue text-white py-4 shadow-md"
    >
      <div class="container mx-auto flex justify-between items-center px-6">
        <h1 class="text-2xl font-bold">ASAN Könüllülər İdarəetmə Sistemi</h1>
        <div class="font-bold text-xl">{{ currentTime }}</div>
      </div>
    </div>

    <!-- Əsas məzmun -->
    <div class="flex flex-1 container mx-auto px-6 py-8 gap-8">
      <!-- Könüllü əlavə etmə paneli -->
      <div class="w-1/2">
        <div
          class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-[500px] flex flex-col"
        >
          <h2
            class="text-xl font-bold text-asan-dark-blue mb-6 pb-2 border-b border-gray-200"
          >
            Könüllü əlavə et
          </h2>

          <div class="space-y-5 flex-grow">
            <div>
              <label class="block text-asan-dark-blue font-medium mb-2"
                >Ad Soyad</label
              >
              <input
                v-model="newVolunteer.name"
                placeholder="Ad və soyadınızı daxil edin"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-asan-blue focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-asan-dark-blue font-medium mb-2"
                >Cins</label
              >
              <div class="flex gap-6">
                <label class="inline-flex items-center">
                  <input
                    v-model="newVolunteer.gender"
                    type="radio"
                    value="Kişi"
                    class="h-4 w-4 text-asan-blue focus:ring-asan-blue border-gray-300"
                  />
                  <span class="ml-2 text-gray-700">Kişi</span>
                </label>
                <label class="inline-flex items-center">
                  <input
                    v-model="newVolunteer.gender"
                    type="radio"
                    value="Qadın"
                    class="h-4 w-4 text-asan-blue focus:ring-asan-blue border-gray-300"
                  />
                  <span class="ml-2 text-gray-700">Qadın</span>
                </label>
              </div>
            </div>

            <div class="mt-auto pt-6">
              <div class="grid grid-cols-2 gap-4">
                <button
                  @click="addVolunteer"
                  class="w-full bg-asan-blue hover:bg-asan-dark-blue text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow hover:shadow-md flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Könüllü əlavə et
                </button>

                <button
                  @click="clearAll"
                  class="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow hover:shadow-md flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2"
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
                  Hamısını təmizlə
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Könüllülər siyahısı -->
      <div class="w-1/2">
        <div
          class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-[500px] flex flex-col"
        >
          <div
            class="flex justify-between items-center mb-6 pb-2 border-b border-gray-200"
          >
            <h2 class="text-xl font-bold text-asan-dark-blue">Könüllülər</h2>
            <span
              class="bg-asan-blue text-white px-3 py-1 rounded-full text-sm font-medium"
            >
              Ümumi: {{ count }}
            </span>
          </div>

          <div
            v-if="count === 0"
            class="text-center py-8 text-gray-500 flex-grow flex items-center justify-center"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12 mx-auto text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <p class="mt-2">Əlavə edilmiş könüllü yoxdur</p>
            </div>
          </div>

          <ul v-else class="divide-y divide-gray-200 overflow-y-auto flex-grow">
            <li
              v-for="volunteer in volunteers"
              :key="volunteer.id"
              class="py-3 px-2 hover:bg-gray-50 transition-colors duration-150"
            >
              <div class="flex justify-between items-center">
                <div class="flex items-center">
                  <div class="mr-3">
                    <div
                      v-if="volunteer.gender === 'Qadın'"
                      class="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-pink-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </div>
                    <div
                      v-else
                      class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <span class="font-medium text-gray-800 block">{{
                      volunteer.name
                    }}</span>
                    <span class="text-xs text-gray-500"
                      >{{ volunteer.addedTime }} -
                      {{ formatDate(volunteer.addedAt) }}</span
                    >
                  </div>
                </div>
                <button
                  @click.stop="removeVolunteer(volunteer.id)"
                  class="text-gray-400 hover:text-red-500 transition-colors p-1"
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
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Fəaliyyət bölməsi -->
    <div class="container mx-auto px-6 pb-8">
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
const {
  addVolunteer: addVolunteerToStore,
  removeVolunteer: removeVolunteerFromStore,
  clearVolunteers,
} = volunteerStore;

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
  id: Math.floor(Math.random() * 10000),
  name: "",
  gender: "",
});

const addVolunteer = () => {
  if (!newVolunteer.value.name || !newVolunteer.value.gender) {
    alert("Zəhmət olmasa bütün məlumatları doldurun!");
    return;
  }

  const now = new Date();
  addVolunteerToStore({
    ...newVolunteer.value,
    addedAt: now,
    addedTime: currentTime.value,
  });

  // Formu təmizlə
  newVolunteer.value = {
    id: Math.floor(Math.random() * 10000),
    name: "",
    gender: "",
  };
};

const removeVolunteer = (id) => {
  if (confirm("Bu könüllünü silmək istədiyinizə əminsiniz?")) {
    removeVolunteerFromStore(id);
  }
};

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
/* ASAN rəng palitrası */
.bg-asan-blue {
  background-color: #2196f3;
}
.bg-asan-dark-blue {
  background-color: #11569a;
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
</style>
