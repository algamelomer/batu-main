<template>
    <AddButton buttonText="add supervisor" buttonLabel="Add" :handleClick="handleClick" />

    <div class="flex flex-col items-center w-full mt-2 border-t border-gray-700"></div>


    <Grid :apiData="apiData">
        <Cards v-for="item in apiData" :key="item.id" :item="item" :handleEdit="handleEdit" :handleDelete="DeleteItem" />
    </Grid>
</template>
  
<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth';
import { useStore } from '@/store'

import AddButton from '@/components/dashboard/AddButton.vue';
import Grid from '@/components/dashboard/Grid.vue';
import Cards from '@/components/dashboard/Cards.vue';


const props = defineProps({ id: String })

const authstore = useAuthStore()

const router = useRouter();

const apiData = ref(null)

const getData = async () => {
    if (props.id) {
        await useStore().getSupervisory(props.id)
    }
    else { await useStore().getSupervisory("/") }
    apiData.value = useStore().supervisory.data
}

getData()

const handleClick = () => {
    router.push({ name: 'DashboardUpload', params: { category: 'supervisory' } });
};
const handleEdit = (id) => {
    router.push({ name: 'DashboardEdit', params: { category: 'supervisory', id: id } });
}


const DeleteItem = async (id) => {
    await authstore.handlesupervisoryDelete(id)
    getData();
}
</script>
  