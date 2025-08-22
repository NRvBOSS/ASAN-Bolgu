<script setup>
import { ref } from "vue";
import Calendar from "primevue/calendar";
import axios from "axios";

const selectedDate = ref(null);
const history = ref(null);
const loading = ref(false);

const activityIcons = {
  Bağça: "🌿",
  Sorğu: "📋",
  Yön2: "↗️",
  Yön3: "↘️",
  VVAQ: "⚠️",
};

const fetchHistory = async () => {
  if (!selectedDate.value) return;

  loading.value = true;
  history.value = null;

  try {
    const formattedDate = selectedDate.value.toISOString().split("T")[0];
    console.log("Fetching history for date:", formattedDate); // Log the date being fetched

    const res = await axios.get("http://localhost:4000/api/history/get", {
      params: { date: formattedDate },
    });

    console.log("API Response:", res.data); // Log the full API response

    history.value = res.data;

    if (history.value) {
      console.log("Processed History Data:", {
        date: history.value.date,
        assignments: history.value.assignments.map((a) => ({
          activity: a.activity,
          volunteerCount: a.volunteers ? a.volunteers.length : 0,
        })),
      });
    }
  } catch (err) {
    console.error("Xəta oldu:", err);
    console.error("Error details:", {
      message: err.message,
      response: err.response?.data,
      status: err.response?.status,
    });
    history.value = null;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="p-6">
    <Calendar
      v-model="selectedDate"
      inline
      showWeek
      @update:modelValue="fetchHistory"
    />

    <div v-if="history" class="mt-6">
      <h3 class="font-bold mb-2">
        {{ new Date(history.date).toLocaleDateString() }} üçün tarixçə
      </h3>
      <ul>
        <li v-for="(item, idx) in history.assignments" :key="idx">
          {{ item.activity }} →
          <span v-for="vol in item.volunteers" :key="vol">{{ vol }}</span>
        </li>
      </ul>
    </div>

    <div v-else-if="selectedDate" class="mt-6 text-gray-500">
      Bu günə aid məlumat yoxdur
    </div>
  </div>
</template>
