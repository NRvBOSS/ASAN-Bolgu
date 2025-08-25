<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-8 p-4"
  >
    <router-link
      to="/assignments"
      class="w-full max-w-md bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-6 px-8 rounded-xl shadow-lg transition-all duration-200 text-xl"
    >
      Günlük Fəaliyyətlər
    </router-link>

    <router-link
      to="/admin"
      class="w-full max-w-md bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-6 px-8 rounded-xl shadow-lg transition-all duration-200 text-xl"
    >
      Admin Panel
    </router-link>
  </div>
</template>
