<template>
    <AddButton buttonText="add something to about us?" buttonLabel="Add" :handleClick="handleClick" />

    <div class="flex flex-col items-center w-full mt-2 border-t border-gray-700"></div>

    <Grid :apiData="aboutData">
        <template v-for="items in aboutData">
            <Cards v-for="item in items" :key="item.id" :item="item" :handleEdit="handleEdit"
                :handleDelete="DeleteItem" />
        </template>
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

const authstore = useAuthStore()

const router = useRouter();

const apiData = ref(false)

const aboutData = ref(null)

const getData = async () => {
    await useStore().getAbout("/")
    aboutData.value = useStore().about
    // (useStore().about)
}

getData()

const handleClick = () => {
    router.push({ name: 'DashboardUpload', params: { category: 'about' } });
};
const handleEdit = (id) => {
    router.push({ name: 'DashboardEdit', params: { category: 'about', id: id } });
}


const DeleteItem = async (id) => {
    await authstore.handleAbout_UsDelete(id)
    getData();
}
</script>
  