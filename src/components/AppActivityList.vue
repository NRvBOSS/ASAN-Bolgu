<template>
  <div class="mx-auto p-6 mb-8 max-w-6xl">
    <div class="flex flex-col items-center mb-8">
      <h2
        class="text-3xl font-bold text-center text-blue-800 mb-4 flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 mr-2 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        Günlük Fəaliyyət Cədvəli
      </h2>
      <div class="flex gap-4 mb-8">
        <!-- Böl düyməsi - Mavi -->
        <button
          @click="fetchAndDistributeVolunteers"
          class="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50"
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
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          Böl
        </button>

        <!-- Tarixçə düyməsi - Narıncı -->
        <router-link to="/history">
          <button
            class="flex items-center justify-center bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-400 focus:ring-opacity-50"
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Tarixçə
          </button>
        </router-link>

        <!-- Təsdiqlə düyməsi - Yaşıl -->
        <button
          @click="saveHistory"
          class="flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50"
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
              d="M5 13l4 4L19 7"
            />
          </svg>
          Təsdiqlə
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="(timeSlot, timeIndex) in timeSlots"
        :key="timeIndex"
        class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200 hover:border-blue-300"
      >
        <div
          class="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white text-center font-bold text-xl flex items-center justify-center"
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {{ timeSlot }}
        </div>

        <div class="divide-y divide-gray-100">
          <!-- Bağça -->
          <div class="p-3 hover:bg-blue-50 transition-colors">
            <div class="flex items-center">
              <div class="bg-green-100 p-2 rounded-full mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-green-600"
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
              </div>
              <div>
                <h3 class="font-semibold text-gray-800">Bağça</h3>
                <p class="text-sm text-gray-500">Könüllü: 1 nəfər</p>
              </div>
            </div>
            <div
              v-if="distributedVolunteers.bagca[timeIndex]"
              class="mt-2 ml-10"
            >
              <div class="text-sm text-gray-700">
                {{
                  distributedVolunteers.bagca[timeIndex][0]?.name ||
                  "Təyin edilməyib"
                }}
              </div>
            </div>
          </div>

          <!-- Sorğu -->
          <div class="p-3 hover:bg-blue-50 transition-colors">
            <div class="flex items-center">
              <div class="bg-purple-100 p-2 rounded-full mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-800">Sorğu</h3>
                <p class="text-sm text-gray-500">Könüllü: 3 nəfər</p>
              </div>
            </div>
            <div
              v-if="distributedVolunteers.sorgu[timeIndex]"
              class="mt-2 ml-10"
            >
              <div
                v-for="(volunteer, idx) in distributedVolunteers.sorgu[
                  timeIndex
                ]"
                :key="idx"
                class="text-sm text-gray-700"
              >
                {{ volunteer?.name || "Təyin edilməyib" }}
              </div>
            </div>
          </div>

          <!-- Yön2 -->
          <div class="p-3 hover:bg-blue-50 transition-colors">
            <div class="flex items-center">
              <div class="bg-yellow-100 p-2 rounded-full mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-yellow-600"
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
              </div>
              <div>
                <h3 class="font-semibold text-gray-800">Yön2</h3>
                <p class="text-sm text-gray-500">Könüllü: 2 nəfər</p>
              </div>
            </div>
            <div
              v-if="distributedVolunteers.yon2[timeIndex]"
              class="mt-2 ml-10"
            >
              <div
                v-for="(volunteer, idx) in distributedVolunteers.yon2[
                  timeIndex
                ]"
                :key="idx"
                class="text-sm text-gray-700"
              >
                {{ volunteer?.name || "Təyin edilməyib" }}
              </div>
            </div>
          </div>

          <!-- Yön3 -->
          <div class="p-3 hover:bg-blue-50 transition-colors">
            <div class="flex items-center">
              <div class="bg-orange-100 p-2 rounded-full mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-800">Yön3</h3>
                <p class="text-sm text-gray-500">Könüllü: 2 nəfər</p>
              </div>
            </div>
            <div
              v-if="distributedVolunteers.yon3[timeIndex]"
              class="mt-2 ml-10"
            >
              <div
                v-for="(volunteer, idx) in distributedVolunteers.yon3[
                  timeIndex
                ]"
                :key="idx"
                class="text-sm text-gray-700"
              >
                {{ volunteer?.name || "Təyin edilməyib" }}
              </div>
            </div>
          </div>

          <!-- VVAQ -->
          <div class="p-3 hover:bg-blue-50 transition-colors">
            <div class="flex items-center">
              <div class="bg-red-100 p-2 rounded-full mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-800">VVAQ</h3>
                <p class="text-sm text-gray-500">Könüllü: 2 nəfər</p>
              </div>
            </div>
            <div
              v-if="distributedVolunteers.vvaq[timeIndex]"
              class="mt-2 ml-10"
            >
              <div
                v-for="(volunteer, idx) in distributedVolunteers.vvaq[
                  timeIndex
                ]"
                :key="idx"
                class="text-sm text-gray-700"
              >
                {{ volunteer?.name || "Təyin edilməyib" }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";

const distributedVolunteers = ref({
  bagca: [],
  sorgu: [],
  yon2: [],
  yon3: [],
  vvaq: [],
});

const fetchAndDistributeVolunteers = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/distribute/distVols"
    );
    const activities = response.data.activities;

    // Initialize arrays for each activity
    distributedVolunteers.value = {
      bagca: distributeSequentially(activities.bagca?.volunteers || [], 1),
      sorgu: distributeSequentially(activities.sorgu?.volunteers || [], 3),
      yon2: distributeSequentially(activities.yon2?.volunteers || [], 2),
      yon3: distributeSequentially(activities.yon3?.volunteers || [], 2),
      vvaq: distributeSequentially(activities.vvaq?.volunteers || [], 2),
    };

    console.log("Distributed volunteers:", distributedVolunteers.value);
  } catch (error) {
    console.error("Error fetching and distributing volunteers:", error);
  }
};

const distributeSequentially = (volunteers, perSlot) => {
  const slotsCount = timeSlots.value.length;
  const distributed = Array(slotsCount)
    .fill()
    .map(() => []);

  let volunteerIndex = 0;

  for (let i = 0; i < slotsCount; i++) {
    for (let j = 0; j < perSlot; j++) {
      if (volunteerIndex < volunteers.length) {
        distributed[i].push(volunteers[volunteerIndex]);
        volunteerIndex++;
      } else {
        // If we run out of volunteers, start from beginning
        volunteerIndex = 0;
        if (volunteers.length > 0) {
          distributed[i].push(volunteers[volunteerIndex]);
          volunteerIndex++;
        }
      }
    }
  }

  return distributed;
};

const getDay = new Date().getDay();
console.log("Current Day Index:", getDay);
var acts;
getDay === 0 || getDay === 6 ? (acts = 10) : (acts = 13);

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

const assignments = ref([]);
const saveHistory = async () => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/history/save",

      {
        date: new Date(), // indiki vaxt
        assignments: assignments.value,
      }
    );
    console.log("Uğurla saxlanıldı:", response.data);
    alert("Tarixçə saxlanıldı ✅");
  } catch (err) {
    console.error("Xəta oldu:", err);
    alert("Xəta baş verdi ❌");
  }
};
</script>

<style>
.hover\\:shadow-lg:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>
