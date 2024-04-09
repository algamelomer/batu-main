<template>
    <section class="bg-gray-50 dark:bg-gray-900 w-full">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white "
                        v-if="authStore.authUser">
                        Welcome to the Dashboard {{ authStore.authUser.email }}



                    </h1>
                    <p class="text-gray-600 dark:text-gray-300">
                        This is a protected page. You can only access it if you are authenticated.
                    </p>

                    <button @click="handleLogout()" :disabled="loading"
                        class="relative w-full dark:text-white text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        <span v-if="loading" class="absolute inset-0 flex items-center justify-center">
                            <svg class="animate-spin h-5 w-5 dark:text-white text-black" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                                </circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V2.5a.5.5 0 00-1 0V4a.5.5 0 00.5.5H12a.5.5 0 000-1h-.5A8 8 0 004 12h.5a.5.5 0 000-1H4zm13.034 5.66a8 8 0 01-1.41-1.41l.707-.707a.5.5 0 00-.353-.854h-1.414a.5.5 0 000 1h.663l-.375.375a.5.5 0 10.707.707l.375-.375v.663a.5.5 0 001 0v-1.414a.5.5 0 00-.854-.354l-.707.707zm-10.67-10.68a8 8 0 011.41 1.41l-.707.707a.5.5 0 00.353.854h1.414a.5.5 0 000-1h-.663l.375-.375a.5.5 0 10-.707-.707l-.375.375v-.663a.5.5 0 00-1 0v1.414a.5.5 0 00.854.354l.707-.707z">
                                </path>
                            </svg>
                        </span>
                        <span v-if="!loading">Logout</span>
                    </button>

                </div>
            </div>

        </div>

    </section>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';

const authStore = ref(false)
const fetchData = async () => {
    try {
        authStore.value = await inject('user');
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
    }
};

const loading = ref(false);

const handleLogout = async () => {
    loading.value = true;
    try {
        await authStore.value.handleLogout();
    } catch (error) {
        console.error('Login error:', error);
    } finally {
        loading.value = false;
    }
};



onMounted(() => {
    fetchData();
});

</script>