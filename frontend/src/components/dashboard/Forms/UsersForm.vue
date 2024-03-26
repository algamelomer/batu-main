<template>
    <form class="w-full" @submit.prevent="authStore.handleUsers(form)">
        <div class="relative overflow-x-auto mx-4 mt-4 w-full">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            email
                        </th>
                        <th scope="col" class="px-6 py-3">
                            password
                        </th>
                        <th scope="col" class="px-6 py-3">
                            role
                        </th>
                        <th scope="col" class="px-6 py-3">
                            id
                        </th>
                        <th scope="col" class="px-6 py-3">
                            submit
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <input type="text" v-model="form.name" class=" bg-gray-500 px-2 py-2 rounded text-white">
                        </th>
                        <td class="px-6 py-4">
                            <input type="text" v-model="form.email" class=" bg-gray-500 px-2 py-2 rounded text-white">
                        </td>
                        <td class="px-6 py-4">
                            <input type="text" v-model="form.password" class=" bg-gray-500 px-2 py-2 rounded text-white">
                        </td>
                        <td class="px-6 py-4">
                            <select v-model="form.role" class="bg-gray-500 px-2 py-2 rounded text-white">
                                <option value="admin">Admin</option>
                                <option value="superAdmin">Super Admin</option>
                                <option value="publisher">Publisher</option>
                                <option value="editor">Editor</option>
                            </select>
                        </td>
                        <td class="px-6 py-4">
                            {{ form.id }}
                        </td>
                        <td class="px-6 py-4">
                            <button
                                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-500 rounded">submit</button>
                        </td>
                    </tr>
                </tbody>


            </table>
        </div>
    </form>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useAuthStore } from '@/stores/auth';
import axios from 'axios'


const props = defineProps({
    id: String,
});

const apiData = ref()

const form = ref({
    name: '',
    email: '',
    role: null,
    user_id: '',
    id: '',
    password:'',
});

const authStore = useAuthStore();

const user = ref()

const fetchData = async () => {
    try {
        user.value = await inject('user');
        form.value.user_id = user.value.authUser.id;
        if (props.id) {
            const response = await axios.get('/api/users/' + props.id);
            apiData.value = response.data
            form.value.name = apiData.value.name;
            form.value.email = apiData.value.email;
            form.value.role = apiData.value.role;
            form.value.id = apiData.value.id;
            form.value.password = apiData.value.password;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {

    }
};



// onMounted(() => {
    fetchData();
// });
</script>