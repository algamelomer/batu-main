<template>
    <AddButton buttonText="add some details?" buttonLabel="Add" :handleClick="handleClick" />

    <div class="flex flex-col items-center w-full mt-2 border-t border-gray-700"></div>

    <Grid :apiData="aboutData">
        <template v-for="items in aboutData">
            <template v-for="item in items">
                <div class="max-w-sm rounded overflow-hidden relative shadow-lg bg-gray-700 m-auto w-96 h-[30rem]">
                    <div class=" h-80">
                        <img loading="lazy"  class="w-full h-full object-cover" :src="item.logo || item.image || item.file || item.iconPath"
                            :alt="item.name || item.title">
                    </div>
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">{{ item.name || item.title }}</div>
                    </div>
                    <div class="px-6 pt-4 pb-2 flex justify-between absolute bottom-2 w-full">
                        <button @click="handleEdit(item.id)"
                            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-500 rounded">edit</button>
                        <button @click="handleDelete(item.id)"
                            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-500 rounded">delete</button>
                    </div>
                </div>
            </template>
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
    await useStore().getDetailed()
    aboutData.value = useStore().detailed.details
    // (useStore().detailed.details)
}

getData()

const handleClick = () => {
    router.push({ name: 'DashboardUpload', params: { category: 'details' } });
};
const handleEdit = (id) => {
    router.push({ name: 'DashboardEdit', params: { category: 'details', id: id } });
}


const handleDelete = async (id) => {
    await authstore.handleDetails_Delete(id)
    // (id)
    getData();
}
</script>
  