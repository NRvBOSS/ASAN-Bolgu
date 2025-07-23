import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useVolunteerStore = defineStore("volunteers", () => {
  // State
  const volunteers = ref(
    JSON.parse(localStorage.getItem("asan-volunteers")) || []
  );

  // Getters
  const count = computed(() => volunteers.value.length);

  // Actions
  const addVolunteer = (volunteer) => {
    const newVolunteer = {
      ...volunteer,
      addedAt: new Date(),
      addedTime: new Date().toLocaleTimeString(),
    };
    volunteers.value.unshift(newVolunteer);
    syncLocalStorage();
  };

  const removeVolunteer = (id) => {
    volunteers.value = volunteers.value.filter((v) => v.id !== id);
  };

  const clearVolunteers = () => {
    volunteers.value = [];
    syncLocalStorage();
  };

  const syncLocalStorage = () => {
    localStorage.setItem("asan-volunteers", JSON.stringify(volunteers.value));
  };

  return {
    volunteers,
    count,
    addVolunteer,
    clearVolunteers,
    removeVolunteer,
  };
});
