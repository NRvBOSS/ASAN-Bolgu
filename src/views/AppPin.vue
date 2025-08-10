<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4"
  >
    <div class="w-full max-w-md bg-white p-8 rounded-xl shadow-sm space-y-10">
      <h1 class="text-2xl font-bold text-center text-gray-800">
        Fin kodunuzu daxil edin
      </h1>

      <div class="space-y-10">
        <input
          type="text"
          id="finCode"
          name="finCode"
          placeholder="7R4P9L2"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      <router-link
        to="/admin"
        class="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg text-center transition-colors duration-200"
      >
        Admin səhifəsinə keçid
      </router-link>
    </div>
  </div>
</template>
