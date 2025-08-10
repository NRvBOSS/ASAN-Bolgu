<template>
  <AppActivityList :activities="activities" />
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import AppActivityList from "../components/AppActivityList.vue";

const activities = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:4000/api/activities");
    activities.value = response.data;
  } catch (error) {
    console.error("Error fetching activities:", error);
  }
});
</script>
