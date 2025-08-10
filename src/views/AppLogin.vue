<template>
  <div
    class="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4"
  >
    <div class="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">
        Daxil ol
      </h1>

      <form class="space-y-6">
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">
            Emailinizi daxil edin
          </label>
          <input
            type="email"
            placeholder="nümunə@email.com"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">
            Şifrənizi daxil edin
          </label>
          <input
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <router-link to="/choose">
          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Daxil ol
          </button>
        </router-link>
      </form>
    </div>
  </div>
</template>
