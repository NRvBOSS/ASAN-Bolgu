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
const childCount = 5;
const assignedVolunteers = ref({
  Bağça: null,
  Sorğu: [],
  Yön2: null,
  Yön3: null,
  VAQ: null,
  Masa: [],
});

// Fəaliyyət növləri
const SITTING_ACTIVITIES = ["Bağça", "VAQ", "Masa"];
const STANDING_ACTIVITIES = ["Sorğu", "Yön2", "Yön3"];

// Son fəaliyyətin növünü yoxla
function getLastActivityType(volunteer) {
  if (!volunteer.history || volunteer.history.length === 0) return null;
  const lastActivity = volunteer.history[volunteer.history.length - 1];

  if (SITTING_ACTIVITIES.includes(lastActivity)) return "sitting";
  if (STANDING_ACTIVITIES.includes(lastActivity)) return "standing";
  return null;
}

// Könüllünün bu fəaliyyətə gedə biləcəyini yoxla
function canGoToActivity(volunteer, activity, assignedNames) {
  // Artıq təyin edilmişdirse
  if (assignedNames.has(volunteer.name)) return false;

  // Bağça yalnız qızlar üçün
  if (activity === "Bağça" && volunteer.gender !== "Qadın") return false;

  // Əsas yoxlamalar - VAQ və Bağça üçün daha yumşaq yoxlama
  if (activity !== "VAQ" && activity !== "Bağça") {
    if (!canBeAssigned(volunteer, activity, childCount)) return false;
    if (isLastStanding(volunteer)) return false;
  }

  // Fəaliyyət növü qaydası - yalnız Masa olmayan oturaqlı fəaliyyətlər üçün
  const lastType = getLastActivityType(volunteer);

  if (
    lastType === "sitting" &&
    SITTING_ACTIVITIES.includes(activity) &&
    activity !== "Masa"
  ) {
    // Bağça və VAQ üçün daha çevik qayda
    if (activity === "Bağça" || activity === "VAQ") {
      // Əgər son 2 fəaliyyətdə bu fəaliyyəti etməyibsə, icazə ver
      const lastTwo = volunteer.history.slice(-2);
      if (!lastTwo.includes(activity)) {
        console.log(
          `${volunteer.name} üçün ${activity} icazə verildi (son 2-də yoxdur)`
        );
        return true;
      }
    }
    return false; // digər oturaqlı fəaliyyətlər üçün qadağa
  }

  // Masa üçün bütün yoxlamalar keçilsin
  if (activity === "Masa") return true;

  // Son 2 dəfə eyni fəaliyyəti etməməli (Masa istisna)
  if (activity !== "Masa") {
    const lastTwo = volunteer.history.slice(-2);
    if (lastTwo.includes(activity)) return false;
  }

  // Bağça üçün son 3 dəfə yoxla - daha yumşaq
  if (activity === "Bağça") {
    const lastThree = volunteer.history.slice(-3);
    if (lastThree.includes("Bağça")) {
      console.log(
        `${volunteer.name} son 3-də Bağça etdiyi üçün qəbul edilmədi`
      );
      return false;
    }
  }

  return true;
}

function assignActivities() {
  // Sıfırla
  assignedVolunteers.value = {
    Bağça: null,
    Sorğu: [],
    Yön2: [],
    Yön3: [],
    VAQ: [],
    Masa: [],
  };

  const validVolunteers = store.volunteers.filter(
    (v) => v?.name && Array.isArray(v.history)
  );

  if (validVolunteers.length === 0) {
    alert("Əlavə edilmiş könüllü yoxdur!");
    return;
  }

  const assignedNames = new Set();

  // 1. BAĞÇA - 1 qız
  console.log("=== BAĞÇA təyinatı ===");
  const eligibleForBagca = validVolunteers.filter((v) =>
    canGoToActivity(v, "Bağça", assignedNames)
  );
  console.log(
    "Bağça üçün uyğun:",
    eligibleForBagca.map((v) => v.name)
  );

  if (eligibleForBagca.length > 0) {
    const selected = shuffle(eligibleForBagca)[0];
    store.assignActivity(selected.name, "Bağça");
    assignedVolunteers.value.Bağça = selected.name;
    assignedNames.add(selected.name);
    console.log("Bağçaya təyin edildi:", selected.name);
  }

  // 2. YÖN2 - 1 nəfər
  console.log("=== YÖN2 təyinatı ===");
  const eligibleForYon2 = validVolunteers.filter((v) =>
    canGoToActivity(v, "Yön2", assignedNames)
  );
  console.log(
    "Yön2 üçün uyğun:",
    eligibleForYon2.map((v) => v.name)
  );

  if (eligibleForYon2.length > 0) {
    const selected = shuffle(eligibleForYon2)[0];
    store.assignActivity(selected.name, "Yön2");
    assignedVolunteers.value.Yön2 = selected.name;
    assignedNames.add(selected.name);
    console.log("Yön2-yə təyin edildi:", selected.name);
  }

  // 3. YÖN3 - 1 nəfər
  console.log("=== YÖN3 təyinatı ===");
  const eligibleForYon3 = validVolunteers.filter((v) =>
    canGoToActivity(v, "Yön3", assignedNames)
  );
  console.log(
    "Yön3 üçün uyğun:",
    eligibleForYon3.map((v) => v.name)
  );

  if (eligibleForYon3.length > 0) {
    const selected = shuffle(eligibleForYon3)[0];
    store.assignActivity(selected.name, "Yön3");
    assignedVolunteers.value.Yön3 = selected.name;
    assignedNames.add(selected.name);
    console.log("Yön3-ə təyin edildi:", selected.name);
  }

  // 4. VAQ - 1 nəfər
  console.log("=== VAQ təyinatı ===");
  const eligibleForVAQ = validVolunteers.filter((v) =>
    canGoToActivity(v, "VAQ", assignedNames)
  );
  console.log(
    "VAQ üçün uyğun:",
    eligibleForVAQ.map((v) => v.name)
  );

  if (eligibleForVAQ.length > 0) {
    const selected = shuffle(eligibleForVAQ)[0];
    store.assignActivity(selected.name, "VAQ");
    assignedVolunteers.value.VAQ = selected.name;
    assignedNames.add(selected.name);
    console.log("VAQ-a təyin edildi:", selected.name);
  }

  // 5. SORĞU - 3 nəfər (uşaq sayına görə)
  console.log("=== SORĞU təyinatı ===");
  const sorguCount = 3;
  const eligibleForSorgu = validVolunteers.filter((v) => {
    if (!canGoToActivity(v, "Sorğu", assignedNames)) return false;

    // Son 2 fəaliyyətdə Sorğu etməməli
    const lastTwo = v.history.slice(-2);
    return !lastTwo.includes("Sorğu");
  });
  console.log(
    "Sorğu üçün uyğun:",
    eligibleForSorgu.map((v) => v.name)
  );

  const sorguSelections = shuffle(eligibleForSorgu).slice(0, sorguCount);
  sorguSelections.forEach((selected) => {
    store.assignActivity(selected.name, "Sorğu");
    assignedVolunteers.value.Sorğu.push(selected.name);
    assignedNames.add(selected.name);
    console.log("Sorğuya təyin edildi:", selected.name);
  });

  // 6. MASA - qalanlar
  console.log("=== MASA təyinatı ===");
  const remainingForMasa = validVolunteers.filter(
    (v) => !assignedNames.has(v.name)
  );
  console.log(
    "Masa üçün qalanlar:",
    remainingForMasa.map((v) => v.name)
  );

  remainingForMasa.forEach((selected) => {
    store.assignActivity(selected.name, "Masa");
    assignedVolunteers.value.Masa.push(selected.name);
    assignedNames.add(selected.name);
    console.log("Masaya təyin edildi:", selected.name);
  });

  console.log("=== SON NƏTİCƏ ===");
  console.log("Final assignments:", assignedVolunteers.value);
  console.log(
    "Cəmi təyin edilən:",
    assignedNames.size,
    "Cəmi könüllü:",
    validVolunteers.length
  );
}

const activities = [
  {
    title: "Bağça",
    icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4",
    color: "text-asan-blue",
    key: "Bağça",
  },
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
    title: "Sorğu",
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    color: "text-asan-blue",
    key: "Sorğu",
  },
  {
    title: "Masa",
    icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    color: "text-asan-blue",
    key: "Masa",
  },
];
</script>
