import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useVolunteerStore = defineStore("volunteers", () => {
  // State
  const volunteers = ref(
    JSON.parse(localStorage.getItem("asan-volunteers")) || []
  );
  let idCounter = volunteers.value.length > 0 
    ? Math.max(...volunteers.value.map(v => v.id)) + 1 
    : 1;

  // Getters
  const count = computed(() => volunteers.value.length);

  // Actions
  const addVolunteer = (volunteer) => {
    const newVolunteer = {
      ...volunteer,
      id: idCounter++,
      addedAt: new Date(),
      history: Array.isArray(volunteer.history) ? volunteer.history : [],
    };
    volunteers.value.unshift(newVolunteer);
    syncLocalStorage();
  };

  const removeVolunteer = (id) => {
    volunteers.value = volunteers.value.filter((v) => v.id !== id);
    syncLocalStorage();
  };

  const clearVolunteers = () => {
    volunteers.value = [];
    idCounter = 1;
    syncLocalStorage();
  };

  const syncLocalStorage = () => {
    localStorage.setItem("asan-volunteers", JSON.stringify(volunteers.value));
  };

  const assignActivity = (name, activity) => {
    const v = volunteers.value.find((v) => v.name === name);
    if (v) {
      v.history = Array.isArray(v.history) ? v.history : [];
      if (v.history.length < 4) {
        v.history.push(activity);
        syncLocalStorage();
      }
    }
  };

  return {
    volunteers,
    count,
    addVolunteer,
    clearVolunteers,
    removeVolunteer,
    assignActivity,
  };
});