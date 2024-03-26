<template>
    <AddButton buttonText="add facultie" buttonLabel="Add" :handleClick="handleClick" />

    <div class="flex flex-col items-center w-full mt-2 border-t border-gray-700"></div>

   
    <Grid :apiData="apiData">
        <Cards v-for="item in apiData" :key="item.id" :item="item" :handleEdit="handleEdit" :handleDelete="DeleteItem" />
    </Grid>
</template>
  
<script setup>
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue'
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import AddButton from '@/components/dashboard/AddButton.vue';
import Grid from '@/components/dashboard/Grid.vue';
import Cards from '@/components/dashboard/Cards.vue';

const authstore = useAuthStore()

const router = useRouter();

const apiData = ref(false)

const fetchData = async () => {
    try {
        const response = await axios.get('/api/faculty');
        apiData.value = response.data.data;
        // (apiData.value)
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
    router.push({ name: 'DashboardUpload', params: { category: 'facultie' } });
};
const handleEdit = (id) => {
    router.push({ name: 'DashboardEdit', params: { category: 'facultie', id: id } });
}


const DeleteItem = async (id) => {
    await authstore.handleFacultieDelete(id)
    fetchData();
}
</script>
  