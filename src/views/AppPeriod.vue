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

<script></script>
