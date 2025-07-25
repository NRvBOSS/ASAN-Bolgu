<template>
  <div
    class="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-3xl mx-auto my-8"
  >
    <div class="flex justify-between mb-6">
      <h1
        class="text-3xl font-bold text-asan-dark-blue pb-2 border-b border-gray-200"
      >
        Fəaliyyətlər
      </h1>
      <button
        @click="assignActivities"
        class="bg-blue-500 text-white px-4 py-2 rounded-3xl hover:bg-blue-800 duration-250 transition-colors w-[80px] cursor-pointer"
      >
        Böl
      </button>
    </div>

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
        <div class="p-4 bg-gray-50">
          <div v-if="assignedVolunteers.Bağça" class="text-gray-700">
            {{ assignedVolunteers.Bağça }}
          </div>
          <div v-else class="text-gray-400">Heç kim təyin edilməyib</div>
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
              <span class="ml-auto text-gray-700">
                {{ assignedVolunteers.Sorğu?.[index] || "" }}
              </span>
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
          :assignedNames="assignedVolunteers[activity.key]"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ActivityCard from "./ActivityCard.vue";
import { useVolunteerStore } from "../stores/counter";
import { canBeAssigned, isLastStanding, shuffle } from "@/utils/assignment";
import { ref } from "vue";

const store = useVolunteerStore();
const childCount = 5; // gündəlik uşaq sayı (dinamik ola bilər)
const assignedVolunteers = ref({
  Bağça: null,
  Sorğu: [],
  Yön2: [],
  Yön3: [],
  VAQ: [],
  Masa: [],
});
function assignActivities() {
  // Reset assignments
  assignedVolunteers.value = {
    Bağça: null,
    Sorğu: [],
    Yön2: [],
    Yön3: [],
    VAQ: [],
    Masa: [],
  };

  const validVolunteers = store.volunteers.filter(
    (v) => v && v.name && Array.isArray(v.history)
  );
  if (validVolunteers.length === 0) return;

  // Bağça (yalnız qadınlar)
  const girls = validVolunteers.filter(
    (v) => v.gender === "Qadın" && canBeAssigned(v, "Bağça", childCount)
  );
  const girl = shuffle(girls).find((v) => !isLastStanding(v));
  if (girl) {
    store.assignActivity(girl.name, "Bağça");
    assignedVolunteers.value.Bağça = girl.name;
  }

  // Yön2 və Yön3
  ["Yön2", "Yön3"].forEach((activity) => {
    const eligible = validVolunteers.filter(
      (v) =>
        v.name !== assignedVolunteers.value.Bağça &&
        canBeAssigned(v, activity, childCount) &&
        !isLastStanding(v)
    );
    const pick = shuffle(eligible)[0];
    if (pick) {
      store.assignActivity(pick.name, activity);
      assignedVolunteers.value[activity].push(pick.name);
    }
  });

  // Sorğu (3 nəfər)
  const sorğuLimit = childCount < 10 ? 3 : 2;
  const assignedNames = Object.values(assignedVolunteers.value)
    .flat()
    .filter(Boolean);
  const eligibleSorğu = validVolunteers.filter(
    (v) =>
      !assignedNames.includes(v.name) && canBeAssigned(v, "Sorğu", childCount)
  );
  const sorğuPicks = shuffle(eligibleSorğu).slice(0, sorğuLimit);
  sorğuPicks.forEach((v) => {
    store.assignActivity(v.name, "Sorğu");
    assignedVolunteers.value.Sorğu.push(v.name);
  });

  // VAQ (2 nəfər)
  const currentAssigned = [...assignedNames, ...assignedVolunteers.value.Sorğu];
  const eligibleVAQ = validVolunteers.filter(
    (v) =>
      !currentAssigned.includes(v.name) && canBeAssigned(v, "VAQ", childCount)
  );
  const vaqPicks = shuffle(eligibleVAQ).slice(0, 2);
  vaqPicks.forEach((v) => {
    store.assignActivity(v.name, "VAQ");
    assignedVolunteers.value.VAQ.push(v.name);
  });

  // Masa (qalanlar)
  const allAssignedNames = [
    assignedVolunteers.value.Bağça,
    ...assignedVolunteers.value.Sorğu,
    ...assignedVolunteers.value.Yön2,
    ...assignedVolunteers.value.Yön3,
    ...assignedVolunteers.value.VAQ,
  ].filter(Boolean);

  const remainingVolunteers = validVolunteers.filter(
    (v) => !allAssignedNames.includes(v.name)
  );

  remainingVolunteers.forEach((v) => {
    store.assignActivity(v.name, "Masa");
    if (!Array.isArray(assignedVolunteers.value.Masa)) {
      assignedVolunteers.value.Masa = [];
    }
    assignedVolunteers.value.Masa.push(v.name);
  });
}

const activities = [
  {
    title: "Yönləndirmə(2)",
    icon: "M9 5l7 7-7 7",
    color: "text-asan-blue",
    key: "Yön2",
  },
  {
    title: "Yönləndirmə(3)",
    icon: "M9 5l7 7-7 7",
    color: "text-asan-blue",
    key: "Yön3",
  },
  {
    title: "VVAQ",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    color: "text-asan-blue",
    key: "VAQ",
  },
  {
    title: "Masa",
    icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    color: "text-asan-blue",
    key: "Masa",
  },
];
</script>
