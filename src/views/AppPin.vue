<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const finCode = ref("");
const errorMessage = ref("");

// PIN göndərmək
const submitPin = async () => {
  errorMessage.value = "";

  if (!finCode.value) {
    errorMessage.value = "FIN kodu tələb olunur";
    return;
  }

  try {
    const response = await axios.post("http://localhost:4000/api/users/pin", {
      pin: finCode.value, // serverdə necə gözləyirsə o adda göndər
    });

    // Əgər uğurlu cavab gəlibsə admin-ə yönləndir
    if (response.status === 200) {
      router.push("/admin");
    }
  } catch (error) {
    // Əgər cavabda error gəlibsə
    errorMessage.value =
      error.response?.data?.error || "FIN kodu yanlışdır";
  }
};
</script>

<template>
  <div>
    <input
      v-model="finCode"
      type="text"
      placeholder="FIN kodu daxil edin"
      class="border p-2 rounded"
    />
    <button @click="submitPin" class="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
      Yoxla
    </button>

    <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
  </div>
</template>
