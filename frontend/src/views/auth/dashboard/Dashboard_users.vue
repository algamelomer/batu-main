<template>
    
    <AddButton buttonText="want to add user?" buttonLabel="Add" :handleClick="handleClick" />
    <div class="flex flex-col items-center w-full mt-2 border-t border-gray-700"></div>

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
                        role
                    </th>
                    <th scope="col" class="px-6 py-3">
                        id
                    </th>
                    <th scope="col" class="px-6 py-3">
                        edit user
                    </th>
                    <th scope="col" class="px-6 py-3">
                        remove user
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="items in apiData"
                    :key="items.id">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ items.name }}
                    </th>
                    <td class="px-6 py-4">
                        {{ items.email }}
                    </td>
                    <td class="px-6 py-4">
                        {{ items.role }}
                    </td>
                    <td class="px-6 py-4">
                        {{ items.id }}
                    </td>
                    <td class="px-6 py-4">
                        <button @click="handleEdit(items.id)" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-500 rounded">edit</button>
                    </td>
                    <td class="px-6 py-4">
                        <button @click="DeleteItem(items.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-500 rounded">delete</button>
                    </td>
                </tr>
            </tbody>


        </table>
    </div>
</template>
  
<script setup>
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue'
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import AddButton from '@/components/dashboard/AddButton.vue';

const authstore = useAuthStore()

const router = useRouter();

const apiData = ref(false)

const fetchData = async () => {
    try {
        const response = await axios.get('/api/users');
        apiData.value = response.data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    finally {
    }
};

onMounted(() => {
    fetchData();
});
const handleClick = () => {
    router.push({ name: 'DashboardUpload', params: { category: 'users' } });
};
const handleEdit = (id) => {
    router.push({ name: 'DashboardEdit', params: { category: 'users', id: id } });
}


const DeleteItem = async (id) => {
    await authstore.handleUsersDelete(id)
    fetchData();
}
</script>
  