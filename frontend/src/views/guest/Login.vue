<template>
  <button @click="toggleDark()" class="h-12 w-12 rounded-full p-2 absolute top-2 right-2 hover:bg-[#18191A] dark:hover:bg-white">
          <svg class="fill-violet-700 block dark:hidden" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
          </svg>
          <svg class="fill-yellow-500 hidden dark:block" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              fill-rule="evenodd" clip-rule="evenodd"></path>
          </svg>
        </button>
  <section class="bg-gray-50 dark:bg-gray-900 w-full">
    <transition name="fade">
      <alert-component v-if="error" :alert-message="error"
        color=" bg-red-500"></alert-component>
    </transition>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">

      <div
        class="w-full bg-white rounded-lg shadow h-80 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-6 sm:p-8">
          <h1 class=" font-bold leading-tight tracking-tight text-gray-900 text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <form @submit.prevent="handleLogin(form)">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                email</label>
              <input v-model="form.email" type="email" name="email" id="email"
                class="{{ form.email === '' ? 'border-red-500' : '' }} bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="email@batu.edu.eg">
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input v-model="form.password" type="password" name="password" id="password" placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input id="remember" aria-describedby="remember" type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800">
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                </div>
              </div>
              <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot
                password?</a>
            </div>
            <button type="submit" :disabled="loading"
              class="relative w-full dark:text-white text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              <span v-if="loading" class="absolute inset-0 flex items-center justify-center">
                <svg class="animate-spin h-5 w-5 dark:text-white text-black" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V2.5a.5.5 0 00-1 0V4a.5.5 0 00.5.5H12a.5.5 0 000-1h-.5A8 8 0 004 12h.5a.5.5 0 000-1H4zm13.034 5.66a8 8 0 01-1.41-1.41l.707-.707a.5.5 0 00-.353-.854h-1.414a.5.5 0 000 1h.663l-.375.375a.5.5 0 10.707.707l.375-.375v.663a.5.5 0 001 0v-1.414a.5.5 0 00-.854-.354l-.707.707zm-10.67-10.68a8 8 0 011.41 1.41l-.707.707a.5.5 0 00.353.854h1.414a.5.5 0 000-1h-.663l.375-.375a.5.5 0 10-.707-.707l-.375.375v-.663a.5.5 0 00-1 0v1.414a.5.5 0 00.854.354l.707-.707z">
                  </path>
                </svg>
              </span>
              <span v-if="!loading">Sign in</span>
            </button>

          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from '@/store'
import AlertComponent from '@/components/Alert.vue';


import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);

const authStore = useStore();

const loading = ref(false);

const error = ref(null)

const form = ref({
  email: '',
  password: ''
});
const handleLogin = async (form) => {
  loading.value = true;
  try {
    await authStore.handleLogin(form);
    error.value = authStore.error
  } catch (error) {
    console.error('Login error:', error);
  } finally {
    loading.value = false;
  }
};

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
